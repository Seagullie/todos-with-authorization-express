import {
    Router
} from "express";
import TasksListController from "../Controllers/TasksListsController";

const taskListsRouter = Router();

taskListsRouter.post("/api/todolists", TasksListController.createTodoList);
taskListsRouter.get("/api/todolists", TasksListController.getTodoLists);
taskListsRouter.put("/api/todolists/:id", TasksListController.updateTodoList);
taskListsRouter.delete("/api/todolists/:id", TasksListController.deleteTodoList);

export default taskListsRouter