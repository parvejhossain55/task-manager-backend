const mongoose = require("mongoose");
const validator = require("validator");

// schema design
const taskSchema = mongoose.Schema(
    {
        taskName: {
            type: String,
            required: [true, "Please provide a name for this task."],
            trim: true,
            minLength: [3, "Task name must be at least 3 characters."],
            maxLength: [100, "Task name must be less than 100 characters."],
        },
        taskDesc: {
            type: String,
            required: true,
        },
        taskStatus: {
            type: String,
            required: true,
            enum: {
                values: ["new", "progress", "complete", "cancel"],
                message: "status can't be {VALUE}",
            },
            default: "new",
        },
        taskImage: {
            type: String,
            validate: [validator.isURL, "wrong task url"],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
