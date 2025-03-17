import {
    Router
} from "express";
import TaskController from "../Controllers/TasksController";

const tasksRouter = Router();


tasksRouter.get("/api/tasks/:listId", TaskController.getTasks);
tasksRouter.post('/api/tasks', TaskController.createTask);
tasksRouter.put('/api/tasks/:id', TaskController.updateTask);
tasksRouter.delete('/api/tasks/:id', TaskController.deleteTask);

export default tasksRouter