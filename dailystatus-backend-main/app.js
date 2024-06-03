// Third party Modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
var cors = require('cors');

// Required Routes
const userRoute = require("./routes/user");
const projectRoute = require("./routes/project");
const reportRoute = require("./routes/report");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

// Root Route
app.use("/api/v1/user", userRoute);
app.use("/api/v1/project", projectRoute);
app.use("/api/v1/report", reportRoute);

// Connect to MongoDb
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => {
        const port = 8000;
        app.listen(port);
        console.log(`Server serve with port number: ${port}`);
        console.log("mongoDB connected.....");
    })
    .catch((err) => console.log(err));