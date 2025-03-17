import { Request, Response } from "express";
import Task from "../Models/Task";

class TaskController {
  static async createTask(req: Request, res: Response) {
    try {
      console.log("createTask req.body:");
      console.log(req.body);

      const task = new Task(req.body);
      await task.save();
      res.json(task);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Failed to create task",
      });
    }
  }

  static async getTasks(req: Request, res: Response) {
    try {
      const tasks = await Task.find({
        listId: req.params.listId,
      });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({
        error: "Failed to fetch tasks",
      });
    }
  }

  // TODO: specify better return type
  static async updateTask(req: Request, res: Response): Promise<any> {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({
          error: "Task not found",
        });
      }
      Object.assign(task, req.body);
      await task.save();
      res.json(task);
    } catch (error) {
      res.status(500).json({
        error: "Failed to update task",
      });
    }
  }

  static async deleteTask(req: Request, res: Response) {
    try {
      await Task.findByIdAndDelete(req.params.id);
      res.json({
        message: "Task deleted",
      });
    } catch (error) {
      res.status(500).json({
        error: "Failed to delete task",
      });
    }
  }
}

export default TaskController;
