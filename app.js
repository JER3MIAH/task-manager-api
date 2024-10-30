import express from 'express';
import mongoose from "mongoose";
import userRoutes from "./src/routes/user-routes.js";
import taskRoutes from "./src/routes/task-routes.js";
import config from './src/config/config.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(config.DATABASE_URL);

app.use('/api/user', userRoutes); 
app.use('/api/tasks', taskRoutes); 

app.get('/', (req, res) => {
    res.send('Yoooooooooooooo');
});

export default app;