const express = require("express");
const {
    createTask,
    getTasksByUserId,
    getTaskById,
    updateTask,
    deleteTask,
    getTasks
} = require("../controllers/userTaskController"); // Adjust the path as needed

const router = express.Router();

router.get('/',getTasks)
// Route to create a new task
router.post("/", createTask);

// Route to get all tasks for a specific user (by userid)
router.get("/:userid", getTasksByUserId);

// Route to get a single task by its ID
router.get("/:id", getTaskById);

// Route to update a task by its ID
router.put("/:id", updateTask);

// Route to delete a task by its ID
router.delete("/:id", deleteTask);

module.exports = router;
