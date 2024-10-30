import express from "express";
import * as taskController from "../controllers/task-controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = express.Router();

router.get('/get-all-tasks', authMiddleware, taskController.getAllTasks);
router.get('/get-task/:id', authMiddleware, taskController.getTask);
router.post('/create-task', authMiddleware, taskController.createTask);
router.patch('/update-status/:id', authMiddleware, taskController.updateTaskStatus);
router.patch('/edit-task/:id', authMiddleware, taskController.editTask);
router.delete('/delete-task/:id', authMiddleware, taskController.deleteTask);

export default router;