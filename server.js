const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");

// middlewares
app.use(express.static("./src/uploads"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use(cors());

// route middleware
app.use("/api/v1", userRouter);
app.use("/api/v1", taskRouter);

// mongoose connection
// .connect(process.env.LOCAL_DB)
mongoose
    .connect(process.env.DATABASE)
    .then(() => {
        console.log("Database Connection Succesfull");
    })
    .catch(() => {
        console.log("Dastabase Connection Failed");
    });

app.get("/hello", (req, res) => {
    res.send("Hello World");
});

app.listen(process.env.PORT || 8080, () => {
    console.log("Server Running..." + process.env.PORT);
});

