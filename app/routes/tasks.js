import express from "express";
import Task from "../../db/models/taskModel.js";

const task = express.Router();

task.post('/create', async (req, res) => {
    try {
        const { title, description, status } = req.body;

        if (!title || !status) {
            return res.status(400).json({
                message: "Title and status are required!"
            });
        }

        const task = new Task({
            title, description, status
        })

        await task.save();
        res.status(201).json(task);
    }
    catch (err) {
        res.status(500).json({
            message: "Error",
            error: err.message
        });
    }
});

task.get('/show', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    }
    catch (err) {
        res.status(500).json({
            message: "Error",
            error: err.message
        });
    }
});

export default task;