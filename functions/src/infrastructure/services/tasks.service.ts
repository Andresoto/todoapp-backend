import { db } from "../config/firebase";
import { FieldValue } from "firebase-admin/firestore";

export class TasksService {
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
        .get();
      return tasksSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw new Error("Failed to fetch tasks");
    }
  }

  async addTask(userId: string, taskData: any) {
    try {
      const taskRef = db.collection("tasks").doc();
      const createAt = FieldValue.serverTimestamp();
      await taskRef.set({ userId, createAt,...taskData });
      return { id: taskRef.id, ...taskData };
    } catch (error) {
      console.error("Error adding task:", error);
      throw new Error("Failed to add task");
    }
  }

  async updateTask(taskId: string, taskData: any) {
    try {
      const taskRef = db.collection("tasks").doc(taskId);
      const updateAt = FieldValue.serverTimestamp();
      taskData.updateAt = updateAt;
      await taskRef.update(taskData);
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

