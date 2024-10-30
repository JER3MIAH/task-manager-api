import Task from '../models/Task.js';
import mongoose from 'mongoose';


export const getAllTasks = async (userId, status) => {
    const query = { userId };

    // If status is provided, add it to the query
    if (status) {
        query.status = status;
    }
    return await Task.find(query);
};


export const getTask = async (taskId) => {
    const taskObjId = new mongoose.Types.ObjectId(`${taskId}`);
    return await Task.findById(taskObjId);
};

export const createTask = async (taskData) => {
    const task = new Task(taskData);
    return await task.save();
};

export const updateTaskStatus = async (taskId, newStatus) => {
    const taskObjId = new mongoose.Types.ObjectId(`${taskId}`);
    const updatedTask = await Task.findByIdAndUpdate(taskObjId, { status: newStatus }, { new: true });
    return updatedTask;
};

export const updateTask = async (taskId, newTask) => {
    const taskObjId = new mongoose.Types.ObjectId(`${taskId}`);
    const updatedTask = await Task.findByIdAndUpdate(taskObjId, newTask, { new: true });
    return updatedTask;
};

export const deleteTask = async (taskId) => {
    const taskObjId = new mongoose.Types.ObjectId(`${taskId}`);
    const deletedTask = await Task.findByIdAndDelete(taskObjId);
    return deletedTask;
};
