import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    userId: String,
    title: String,
    description: String,
    status: {
        type: String,
        enum: ["PENDING", "IN_PROGRESS", "COMPLETED"],
        default: "PENDING",
    },
}, { timestamps: true, collection: "tasks", });

const Task = mongoose.model('Task', taskSchema);

export default Task;