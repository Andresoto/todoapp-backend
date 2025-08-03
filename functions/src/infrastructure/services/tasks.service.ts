import { db } from "../config/firebase";
import { FieldValue } from "firebase-admin/firestore";
import { ITasksService } from "./interfaces/tasks.interface";
import { Task } from "../../domain/entities/task";

export class TasksService implements ITasksService {
  private static instance: TasksService;

  private constructor() {}

  public static getInstance(): TasksService {
    if (!TasksService.instance) {
      TasksService.instance = new TasksService();
    }
    return TasksService.instance;
  }

  async getTasks(userId: string) {
    try {
      const tasksSnapshot = await db
        .collection("tasks")
        .where("userId", "==", userId)
        .orderBy("createdAt", "desc")
        .get();
      return tasksSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw new Error("Failed to fetch tasks");
    }
  }

  async addTask(userId: string, taskData: Task) {
    try {
      const taskRef = db.collection("tasks").doc();
      const createdAt = FieldValue.serverTimestamp();
      taskData.createdAt = createdAt;
      taskData.completed = false;
      await taskRef.set({ ...taskData, userId });
      return { id: taskRef.id, ...taskData, userId };
    } catch (error) {
      console.error("Error adding task:", error);
      throw new Error("Failed to add task");
    }
  }

  async updateTask(taskId: string, taskData: Task) {
    try {
      const taskRef = db.collection("tasks").doc(taskId);
      const updateAt = FieldValue.serverTimestamp();
      taskData.updatedAt = updateAt;
      await taskRef.update(taskData as any);
      return { id: taskId, ...taskData };
    } catch (error) {
      console.error("Error updating task:", error);
      throw new Error("Failed to update task");
    }
  }

  async deleteTask(taskId: string) {
    try {
      await db.collection("tasks").doc(taskId).delete();
      return { success: true };
    } catch (error) {
      console.error("Error deleting task:", error);
      throw new Error("Failed to delete task");
    }
  }
}

