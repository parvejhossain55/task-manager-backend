const router = require("express").Router();
const {
    createTask,
    getAllTask,
    updateTask,
    deleteTask,
    selectTaskByStatus,
    taskStatusCount
} = require("../controllers/TaskController");
const { isAuthenticated } = require("../middlewares/authMiddleware");

router.post("/tasks", isAuthenticated, createTask);
router.get("/tasks", isAuthenticated, getAllTask);
router.put("/tasks/:id", isAuthenticated, updateTask);
router.delete("/tasks/:id", isAuthenticated, deleteTask);

router.get("/tasks/:status/status", isAuthenticated, selectTaskByStatus);
router.get("/tasks/count", isAuthenticated, taskStatusCount);


module.exports = router;
