import { db } from "../config/firebase";
import { Task } from "../../domain/entities/task";
import { TaskDataSource } from "./task.datasource";
import { toDateSafe } from "../../shared/helpers/date.helper";
import { removeUndefinedValues } from "../../shared/helpers/firestore.helper";

export class FirebaseTaskDataSource implements TaskDataSource {

  async findByUserId(userId: string): Promise<Task[]> {
    try {
      const tasksSnapshot = await db
        .collection("tasks")
        .where("userId", "==", userId)
        .orderBy("createdAt", "desc")
        .get();

      return tasksSnapshot.docs.map((doc) => {
        const data = doc.data() ?? {};
        return {
          id: doc.id,
          userId: data.userId,
          title: data.title,
          description: data.description,
          completed: data.completed,
          createdAt: toDateSafe(data.createdAt),
          updatedAt: toDateSafe(data.updatedAt),
        };
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw new Error("Failed to fetch tasks");
    }
  }

  async create(task: Omit<Task, 'id'>): Promise<Task> {
    try {
      const taskRef = db.collection("tasks").doc();
      
      // Prepare task data with defaults and clean undefined values
      const rawTaskData = {
        userId: task.userId,
        title: task.title,
        description: task.description !== undefined ? task.description : '',
        completed: task.completed ?? false,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      };

      // Remove undefined values to avoid Firestore errors
      const taskData = removeUndefinedValues(rawTaskData);

      await taskRef.set(taskData);

      return {
        id: taskRef.id,
        userId: task.userId,
        title: task.title,
        description: task.description ?? '',
        completed: task.completed ?? false,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      };
    } catch (error) {
      console.error("Error creating task:", error);
      throw new Error("Failed to create task");
    }
  }

  async update(id: string, taskUpdate: Partial<Task>): Promise<Task> {
    try {
      const taskRef = db.collection("tasks").doc(id);
      
      // Get current task data
      const taskDoc = await taskRef.get();
      if (!taskDoc.exists) {
        throw new Error("Task not found");
      }

      const currentData = taskDoc.data()!;
      
      // Prepare update data and clean undefined values
      const rawUpdateData = {
        title: taskUpdate.title,
        description: taskUpdate.description,
        completed: taskUpdate.completed,
        updatedAt: taskUpdate.updatedAt,
      };

      const updateData = removeUndefinedValues(rawUpdateData);

      await taskRef.update(updateData);

      return {
        id,
        userId: currentData.userId,
        title: taskUpdate.title ?? currentData.title,
        description: taskUpdate.description ?? currentData.description,
        completed: taskUpdate.completed ?? currentData.completed,
        createdAt: toDateSafe(currentData.createdAt),
        updatedAt: taskUpdate.updatedAt,
      };
    } catch (error) {
      console.error("Error updating task:", error);
      throw new Error("Failed to update task");
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await db.collection("tasks").doc(id).delete();
    } catch (error) {
      console.error("Error deleting task:", error);
      throw new Error("Failed to delete task");
    }
  }

  async findById(id: string): Promise<Task | null> {
    try {
      const taskDoc = await db.collection("tasks").doc(id).get();
      
      if (!taskDoc.exists) {
        return null;
      }

      const data = taskDoc.data()!;
      return {
        id: taskDoc.id,
        userId: data.userId,
        title: data.title,
        description: data.description,
        completed: data.completed,
        createdAt: toDateSafe(data.createdAt),
        updatedAt: toDateSafe(data.updatedAt),
      };
    } catch (error) {
      console.error("Error fetching task by id:", error);
      throw new Error("Failed to fetch task");
    }
  }
}
