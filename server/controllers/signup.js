const jwt = require('jsonwebtoken');
const User = require('../models/Signup/signup')
const bcrypt = require('bcrypt');



exports.signup = async(req, res) => {
    const { username, email, role, key, password } = req.body;
    if (!username || !email || !role || !key || !password) {
        return res.status(400).send({ message: 'data is null' });
    } else {
        try {
            const emailcheck = await User.find({ email })
            if (emailcheck.length !== 0) {
                return res.status(400).send({ message: "user already exists" });
            }
            const user = await User.create({
                username,
                email,
                role,
                key,
                password
            })
            const token = jwt.sign({
                user_id: user._id,
                email
            }, process.env.KEY, {
                expiresIn: "2h",
            });
            user.token = token;
            return res.status(200).send({ message: "Done", data: user });
        } catch (e) {
            return res.status(400).send({ message: "error", data: e });
        }
    }
}


exports.login = async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ message: 'data is null' });
    } else {
        try {
            const user = await User.findOne({ email });

            if (user && (await bcrypt.compare(password, user.password))) {
                const token = jwt.sign({
                    user_id: user._id,
                    email
                }, process.env.KEY, {
                    expiresIn: "2h",
                });

                user.token = token;
                return res.status(200).send({ message: 'Done', data: user });
            };
            return res.status(203).send({ message: 'Invalid Credentials' });

        } catch (err) {
            return res.status(400).send({ message: 'error' });
        }
    }
}