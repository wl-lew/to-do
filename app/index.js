import express from "express";
import task from "./routes/tasks.js";

const router = express.Router();

router.use('/task', task);

export default router;