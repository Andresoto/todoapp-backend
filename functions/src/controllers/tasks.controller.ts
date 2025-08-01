import { Request, Response } from "express";
import { TasksService } from "../services/tasks.service";

const tasksService = TasksService.getInstance();

export const getTasksController = async (req: Request, res: Response) => {
  const userId = req.headers["user-id"] as string;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const tasks = await tasksService.getTasks(userId);
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addTaskController = async (req: Request, res: Response) => {
  const taskData = req.body;
  const userId = req.headers["user-id"] as string;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const newTask = await tasksService.addTask(userId, taskData);
    return res.status(201).json(newTask);
  } catch (error) {
    console.error("Error adding task:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTaskController = async (req: Request, res: Response) => {
  const taskData = req.body;
  const taskId = req.params.id;
  try {
    const updatedTask = await tasksService.updateTask(taskId, taskData);
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTaskController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await tasksService.deleteTask(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
