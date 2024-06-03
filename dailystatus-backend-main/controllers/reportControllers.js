let ObjectId = require('mongodb').ObjectID
// Required Models
const Report = require("../models/report");
const User = require("../models/user");

module.exports = {
    getReport: async (req, res, next) => {
        try {
            const checker = req.user;
            var now = new Date();
            var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

            const userId = req.query.user;
            const isParent = await User.findOne({_id: userId, parents: {$in: checker._id}});
            if(checker.userRole == "admin" || isParent != null || userId == checker._id){
                const report = await Report.find({ userId: userId, createdAt: {$gte: startOfToday} });
                return res.status(200).json(report);
            } else {
                return res.status(401).json({
                    success: false,
                    error: "You are not authorized to perform this action"
                });
            }
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    },

    addReport: async(req, res, next) => {
        try {
            const { userId } = req.user;
            const { isPlan, isStatus } = req.body;
            var now = new Date();
            var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            let report;
            if(isPlan) {      
                const { plan } = req.body;   
                report = await Report.findOneAndUpdate({ userId: userId, createdAt: {$gte: startOfToday} }, { $push: { plan: plan } }, { new: true, upsert: true });
            } else if(isStatus) {
                const { status } = req.body;
                report = await Report.findOneAndUpdate({ userId: userId, createdAt: {$gte: startOfToday} }, { $push: { status: status } }, { new: true, upsert: true });
            }
            return res.status(200).json(report);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    },

    editReport: async (req, res, next) => {
        try {
            const { userId } = req.user;
            const { isPlan, isStatus } = req.body;
            let report;
            if(isPlan) {
                const { plan } = req.body;   
                report = await Report.findOneAndUpdate(
                    { userId: userId, "plan._id": req.params.id }, 
                    { "plan.$[elem]": plan }, 
                    { arrayFilters: [{ "elem._id": req.params.id }], new: true});
            } else if(isStatus) {
                const { status } = req.body;
                report = await Report.findOneAndUpdate(
                    { userId: userId, "plan._id": req.params.id }, 
                    { "plan.$[elem]": plan }, 
                    { arrayFilters: [{ "elem._id": req.params.id }], new: true});
            }
            return res.status(200).json(report);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    },

    sendReportSlackChannel: async (req, res, next) => {
        try {
            let isWhat = req.query.iswhat;
            if(isWhat == "plan" || isWhat == "status") {
                const { userId } = req.user;
                const user = await User.findOne({_id: userId}, {slackToken: 1, slackId: 1});
                if(user.slackToken != null && user.slackId != null) {
                    const { WebClient, LogLevel } = require("@slack/web-api");
                    const client = new WebClient(user.slackToken, {
                        logLevel: LogLevel.DEBUG
                    });
                    const channelId = "C02SFB6C42Y";
                    const { userId } = req.user;
                    var now = new Date();
                    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    const dayPlanOrStatus = await Report.aggregate([
                        { $match: { userId: ObjectId(userId), createdAt: {$gte: startOfToday} } },
                        { $unwind: {path: `$${isWhat}` }},
                        { $group: {
                            _id: `$${isWhat}.projectId`,
                            taskList: { $push: `$${isWhat}.taskDetails` }
                        }}
                    ]).lookup({
                        from: "projects",
                        localField: "_id",
                        foreignField: "_id",
                        as: "project"
                    }).project({
                        _id: 0,
                        project: { "$arrayElemAt": [ "$project", 0 ] },
                        taskList: 1
                    });

                    let message = `Today's ${isWhat}`;
                    for (let i = 0; i < dayPlanOrStatus.length; i++) {
                        const projectName = dayPlanOrStatus[i].project.name;
                        const taskList = dayPlanOrStatus[i].taskList;
                        const taskListString = taskList.join("\n• ");
                        message += `\n*${projectName}*:\n• ${taskListString}`;
                    }
                    let blocks = [
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": message
                            }
                        }
                    ];
                    const result = await client.chat.postMessage({
                        channel: channelId,
                        blocks: blocks
                    });

                    if(result.ok) {
                        if(isWhat == "plan") {
                            await Report.update({ userId: userId, createdAt: {$gte: startOfToday} }, { $set: { isPlanToSlack: true } });
                        } else if(isWhat == "status") {
                            await Report.update({ userId: userId, createdAt: {$gte: startOfToday} }, { $set: { isStatusToSlack: true } });
                        }
                    }
                    return res.status(200).json(result);
                } else {
                    return res.status(200).json({
                        success: false,
                        error: "You are not authorized to perform this action, Please connect your slack account"
                    });
                }
            } else {
                return res.status(200).json({ error: "Invalid params" });
            }
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

};