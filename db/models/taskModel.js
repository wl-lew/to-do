import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 3
    },
    description: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Task = mongoose.model("Task", taskSchema);

export default Task;