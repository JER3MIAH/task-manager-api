import * as taskService from "../services/task-service.js";
import { trimTaskModel, isStatusValid } from "../utils/task-utils.js";


export const getAllTasks = async (req, res) => {
    const userId = req.userId;
    const { status } = req.query;
    if (status) {
        if (!isStatusValid(status)) {
            return res.status(404).json({ errorMessage: "Status has to be 'PENDING', 'IN_PROGRESS', OR 'COMPLETED'" });
        }
    }
    try {
        const userTasks = await taskService.getAllTasks(userId, status);
        const trimmedTasks = userTasks.map(trimTaskModel);
        res.json({ data: trimmedTasks, message: "User tasks fetched successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "An error occured while fetching tasks" });
    }
}

export const getTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    try {
        const userTask = await taskService.getTask(id);
        if (userId !== userTask.userId) {
            return res.status(404).json({ errorMessage: "You can't access this task" });
        }
        res.json({ data: trimTaskModel(userTask), message: "Task fetched successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "An error occured while fetching task" });
    }
}

export const createTask = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.userId;

    if (!title || !description) {
        return res.status(400).json({ errorMessage: "Title and description are required" });
    }

    const newTaskData = {
        title: title,
        description: description,
        userId: userId,
    };

    try {
        const newTask = await taskService.createTask(newTaskData);
        res.status(201).json({ data: trimTaskModel(newTask), message: "Task created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "An error occured while creating task" });
    }
}

export const editTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const userId = req.userId;

    console.log(`params ${req.params}`);

    if (!title && !description && !status) {
        return res.status(400).json({ message: "At least one of 'title', 'description' or 'status' must be provided." });
    }

    try {
        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (status) updateData.status = status;

        const updatedTask = await taskService.updateTask(id, updateData);

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found." });
        }

        if (userId !== updatedTask.userId) {
            return res.status(404).json({ errorMessage: "You can't access this task" });
        }

        if (!isStatusValid(status)) {
            return res.status(404).json({ errorMessage: "Status has to be 'PENDING', 'IN_PROGRESS', OR 'COMPLETED'" });
        }

        res.json({ data: trimTaskModel(updatedTask), message: "Task updated successfully" });
    } catch (error) {
        console.error(`Error updating task: ${error}`);
        res.status(500).json({ message: "Error updating status" });
    }
}

export const updateTaskStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.userId;


    if (!status) {
        return res.status(400).json({ message: "status is required" });
    }

    try {
        const task = await taskService.getTask(id);

        if (userId !== task.userId) {
            return res.status(404).json({ errorMessage: "You can't access this task" });
        }
        const updatedTask = await taskService.updateTaskStatus(id, status);

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found." });
        }

        if (!isStatusValid(status)) {
            return res.status(404).json({ errorMessage: "Status has to be 'PENDING', 'IN_PROGRESS', OR 'COMPLETED'" });
        }

        res.json({ data: trimTaskModel(updatedTask), message: "Task status updated successfully" });
    } catch (error) {
        console.error(`Error updating task status: ${error}`);
        res.status(500).json({ message: "Error updating task status" });
    }
}

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    if (!id) {
        return res.status(400).json({ errorMessage: "Task id is required" });
    }

    const task = await taskService.getTask(id);
    if (userId !== task.userId) {
        return res.status(404).json({ errorMessage: "You can't access this task" });
    }

    try {
        const deletedTask = await taskService.deleteTask(id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error(`Error deleting task: ${error}`);
        res.status(500).json({ errorMessage: "An error occured" });
    }
}
