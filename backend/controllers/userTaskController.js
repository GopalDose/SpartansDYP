const mongoose = require("mongoose");
const UserTask = require("../models/task"); // Adjust path as needed


exports.getTasks = async(req,res) => {
    try {
        
        const tasks = await UserTask.find();
        res.json(tasks).status(200)
    } catch (error) {
        res.status(500).json({ message: "Error fetching task", error });
    }
}
exports.createTask = async (req, res) => {
    try {
        const { type, summary, price, userid , quantity , companyname ,name } = req.body;

        if (!type || !summary || !price || !userid || !quantity || !companyname || !name) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newTask = new UserTask(req.body);
        await newTask.save();

        res.status(201).json({ message: "Task created successfully", task: newTask });
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error });
    }
};

exports.getTasksByUserId = async (req, res) => {
    try {
        const { userid } = req.params;

        if (!userid) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const tasks = await UserTask.find({ userid });

        if (!tasks.length) {
            return res.status(404).json({ message: "No tasks found for this user" });
        }

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Task ID is required" });
        }

        const task = await UserTask.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error fetching task", error });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!id) {
            return res.status(400).json({ message: "Task ID is required" });
        }

        const updatedTask = await UserTask.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error });
    }
};

// 5️⃣ Delete a Task by ID
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Task ID is required" });
        }

        const deletedTask = await UserTask.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    }
};
