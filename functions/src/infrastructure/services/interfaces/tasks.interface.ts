export interface ITasksService {
  addTask(userId: string, taskData: any): Promise<any>;
  getTasks(userId: string): Promise<any[]>;
  updateTask(taskId: string, taskData: any): Promise<any>;
  deleteTask(taskId: string): Promise<any>;
}