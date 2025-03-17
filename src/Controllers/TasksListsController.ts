import { Request, Response } from "express";
import TodoList from "../Models/TodoList";

class TasksListController {
  static async createTodoList(req: Request, res: Response) {
    try {
      const list = new TodoList({
        name: req.body.name,
        description: req.body.description,
        // owner: req.user.id
      });
      await list.save();
      console.log("Saved new list", list);
      res.json(list);
    } catch (error) {
      res.status(500).json({
        error: "Failed to create todo list",
      });
    }
  }

  static async getTodoLists(req: Request, res: Response) {
    try {
      // TODO: implement authorization

      // const lists = await TodoList.find({
      //     $or: [{
      //         owner: req.user.id
      //     }, {
      //         collaborators: req.user.id
      //     }]
      // });

      // get all lists

      const lists = await TodoList.find();

      res.json(lists);
    } catch (error) {
      res.status(500).json({
        error: "Failed to fetch todo lists",
      });
    }
  }

  // TODO: specify better return type
  static async updateTodoList(req: Request, res: Response): Promise<any> {
    try {
      const list = await TodoList.findById(req.params.id);

      // TODO: reimplement authorization later

      // if (!list || list.owner.toString() !== req.user.id) {
      //     return res.status(403).json({
      //         error: "Unauthorized"
      //     });
      // }
      list.name = req.body.name;
      list.description = req.body.description;

      await list.save();
      res.json(list);
    } catch (error) {
      res.status(500).json({
        error: "Failed to update todo list",
      });
    }
  }

  // TODO: specify better return type
  static async deleteTodoList(req: Request, res: Response): Promise<any> {
    try {
      console.log("Deleting list with id ", req.params.id);

      const list = await TodoList.findById(req.params.id);

      if (!list) {
        return res.status(404).json({
          error: "List not found",
        });
      }

      // TODO: move to middleware
      // if (!list || list.owner.toString() !== req.user.id) {
      //     return res.status(403).json({
      //         error: "Unauthorized"
      //     });
      // }
      await list.deleteOne();
      res.json({
        message: "List deleted",
      });
    } catch (error) {
      res.status(500).json({
        error: "Failed to delete todo list",
      });
    }
  }
}

export default TasksListController;
