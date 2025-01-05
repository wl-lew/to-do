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
            message: "Error"
        });
    }
});

task.get('/show-all', async (req, res) => {
    try {
        const { status } = req.query;

        const filter = status ? { status } : {};

        const tasks = await Task.find(filter);
        res.status(200).json(tasks);
    }
    catch (err) {
        res.status(500).json({
            message: "Error"
        });
    }
});

task.get('/show/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found!"
            });
        }
        res.status(200).json(task);
    }
    catch (err) {
        res.status(500).json({
            message: "Error retrieving!"
        });
    }
});

task.put('/update/:id', async (req, res) => {
    try {
        const { title, description, status } = req.body;

        const updateTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, status },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updateTask) {
            return res.status(404).json({
                message: "Task not found!"
            });
        }
        res.status(200).json(updateTask);
    }
    catch (err) {
        res.status(500).json({
            message: "Error with update!"
        });
    }
});

task.delete('/delete/:id', async (req, res) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id);

        if(!deleteTask) {
            return res.status(404).json({
                message: "Task not found!"
            });
        }

        res.status(200).json({
            message: "Task deleted successfully!",
            task: deleteTask
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Error delete task!"
        });
    }
});

task.delete('/delete-all', async (req, res) => {
    try {
        const result = await Task.deleteMany({});

        // noinspection JSUnresolvedVariable
        res.status(200).json({
            message: "All tasks have been deleted!",
            deletedCount: result.deletedCount
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Error with deleting all tasks!"
        });
    }
});

export default task;