const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./src/routes/user");
const taskRouter = require("./src/routes/task");

// middlewares
app.use(express.static("./src/uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// route middleware
app.use("/api/v1", userRouter);
app.use("/api/v1", taskRouter);

// mongoose connection
mongoose
    .connect(process.env.DATABASE)
    .then(() => {
        console.log("Database Connection Succesfull");
    })
    .catch(() => {
        console.log("Dastabase Connection Failed");
    });

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(process.env.PORT || 8080, () => {
    console.log("Server Running..."+process.env.PORT);
});
