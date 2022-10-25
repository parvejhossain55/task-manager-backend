const { decodeToken } = require("../helpers/authHelper");
const {
    createTaskService,
    getAllTaskService,
    updateTaskService,
    deleteTaskService,
    selectTaskByStatusService,
    TaskStatusCountService,
} = require("../services/TaskService");

exports.createTask = async (req, res) => {
    try {
        const task = await createTaskService(req.body);
        if (task) {
            res.status(200).json({
                status: "Success",
                message: "Task Successfully Created",
                data: task,
            });
        } else {
            res.status(400).json({
                status: "Failed",
                message: "Task is not Inserted",
                error: error.message,
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Task is not Inserted",
            error: error.message,
        });
    }
};

exports.getAllTask = async (req, res) => {
    try {
        const task = await getAllTaskService();

        if (task) {
            res.status(200).json({
                status: "Success",
                data: task,
            });
        } else {
            res.status(400).json({
                status: "Failed",
                message: "Task Not Found",
                error: error.message,
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Task Not Found",
            error: error.message,
        });
    }
};

exports.selectTaskByStatus = async (req, res) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        let id = decodeToken(token);
        let status = req.params.status;

        const task = await selectTaskByStatusService(id, status);

        if (task) {
            res.status(200).json({
                status: "Success",
                data: task,
            });
        } else {
            res.status(400).json({
                status: "Failed",
                message: "Task Not Found",
                error: error.message,
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Task Not Found",
            error: error.message,
        });
    }
};

exports.taskStatusCount = async (req, res) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        let id = decodeToken(token);

        const task = await TaskStatusCountService(id);

        if (task) {
            res.status(200).json({
                status: "Success",
                data: task,
            });
        } else {
            res.status(400).json({
                status: "Failed",
                message: "Task Not Found",
                error: error.message,
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Task Not Found",
            error: error.message,
        });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await updateTaskService(req.params.id, req.body);

        if (task) {
            res.status(200).json({
                status: "Success",
                message: "Task Successfully Updated",
                data: task,
            });
        } else {
            res.status(400).json({
                status: "Failed",
                message: "Task is not Updated",
                error: error.message,
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Task is not Updated",
            error: error.message,
        });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await deleteTaskService(req.params.id);
        if (task.deletedCount > 0) {
            res.status(200).json({
                status: "Success",
                message: "Task Successfully Deleted",
                data: task,
            });
        } else {
            res.status(404).json({
                status: "Failed",
                message: "Task is not Delete",
                data: task,
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Task is not Delete",
            error: error.message,
        });
    }
};
