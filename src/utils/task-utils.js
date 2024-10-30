import TaskStatus from "../models/task-status.js";

// Function to trim mongodb generated properties like "_id" and "__v" so its
// not part of the response payload 
export const trimTaskModel = (task) => {
    return {
        taskId: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
    };
};


export const isStatusValid = (statusToCheck) => {
    const enumValues = Object.values(TaskStatus);
    return enumValues.includes(statusToCheck);
};