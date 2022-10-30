const mongoose = require("mongoose");
const TaskModel = require("../models/TaskModel");
const { ObjectId } = mongoose.Types;

exports.createTaskService = async (task) => {
    return await TaskModel.create(task);
};

exports.getAllTaskService = async () => {
    return TaskModel.find({});
};

exports.selectTaskByStatusService = async (id, status) => {
    return TaskModel.aggregate([
        {
            $match: {
                user: ObjectId(id),
                taskStatus: status,
            },
        },
        {
            $project: {
                _id: 1,
                taskName: 1,
                taskDesc: 1,
                taskStatus: 1,
                createdAt: {
                    $dateToString: {
                        date: "$createdAt",
                        format: "%d-%m-%Y",
                    },
                },
            },
        },
    ]);
};

exports.TaskStatusCountService = async (id) => {
    return TaskModel.aggregate([
        {
            $match: {
                user: ObjectId(id),
            },
        },
        {
            // $group: {
            //     _id: "$taskStatus",
            //     count: { $sum: 1 },
            // },
            $group: {
                _id: "$taskStatus",
                total: { $count: {} },
            },
        },
    ]);
};

exports.updateTaskService = async (id, task) => {
    return await TaskModel.findOneAndUpdate({ _id: id }, task);
};

exports.deleteTaskService = async (id) => {
    return await TaskModel.deleteOne({ _id: id });
};
