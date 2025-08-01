import { Request, Response } from "express";
import { TasksService } from "../../infrastructure/services/tasks.service";

export class TasksController {
  private tasksService: TasksService;

  constructor() {
    this.tasksService = TasksService.getInstance();
  }

  public async getTasks(req: Request, res: Response): Promise<Response> {
    const userId = req.headers["user-id"] as string;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    try {
      const tasks = await this.tasksService.getTasks(userId);
      return res.status(200).json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async addTask(req: Request, res: Response): Promise<Response> {
    const taskData = req.body;
    const userId = req.headers["user-id"] as string;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    try {
      const newTask = await this.tasksService.addTask(userId, taskData);
      return res.status(201).json(newTask);
    } catch (error) {
      console.error("Error adding task:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async updateTask(req: Request, res: Response): Promise<Response> {
    const taskData = req.body;
    const taskId = req.params.id;
    try {
      const updatedTask = await this.tasksService.updateTask(taskId, taskData);
      return res.status(200).json(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async deleteTask(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      await this.tasksService.deleteTask(id);
      return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error("Error deleting task:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
