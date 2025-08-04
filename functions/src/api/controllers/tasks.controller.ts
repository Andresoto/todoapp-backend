import { Request, Response } from "express";
import { 
  getTasksUseCase, 
  createTaskUseCase, 
  updateTaskUseCase, 
  deleteTaskUseCase 
} from "../../infrastructure/container/dependencies";

export class TasksController {
  
  public async getTasks(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.headers["user-id"] as string;
      const tasks = await getTasksUseCase.execute(userId);
      return res.status(200).json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async addTask(req: Request, res: Response): Promise<Response> {
    try {
      const taskData = req.body;
      const userId = req.headers["user-id"] as string;
      const newTask = await createTaskUseCase.execute(userId, taskData);
      return res.status(201).json(newTask);
    } catch (error) {
      console.error("Error adding task:", error);
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async updateTask(req: Request, res: Response): Promise<Response> {
    try {
      const taskData = req.body;
      const taskId = req.params.id;
      const updatedTask = await updateTaskUseCase.execute(taskId, taskData);
      return res.status(200).json(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async deleteTask(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await deleteTaskUseCase.execute(id);
      return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error("Error deleting task:", error);
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
