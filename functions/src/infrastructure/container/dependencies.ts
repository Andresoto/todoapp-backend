// Auth dependencies
import { LoginUseCase } from "../../domain/usecases/auth/login.usecase";
import { RegisterUseCase } from "../../domain/usecases/auth/register.usecase";
import { UserRepositoryImpl } from "../repositories/user.repository.impl";
import { FirebaseUserDataSource } from "../datasources/firebase-user.datasource";

// Task dependencies
import { GetTasksUseCase } from "../../domain/usecases/tasks/get-tasks.usecase";
import { CreateTaskUseCase } from "../../domain/usecases/tasks/create-task.usecase";
import { UpdateTaskUseCase } from "../../domain/usecases/tasks/update-task.usecase";
import { DeleteTaskUseCase } from "../../domain/usecases/tasks/delete-task.usecase";
import { TaskRepositoryImpl } from "../repositories/task.repository.impl";
import { FirebaseTaskDataSource } from "../datasources/firebase-task.datasource";

// Auth container
const userDataSource = new FirebaseUserDataSource();
const userRepository = new UserRepositoryImpl(userDataSource);

export const loginUseCase = new LoginUseCase(userRepository);
export const registerUseCase = new RegisterUseCase(userRepository);

// Task container
const taskDataSource = new FirebaseTaskDataSource();
const taskRepository = new TaskRepositoryImpl(taskDataSource);

export const getTasksUseCase = new GetTasksUseCase(taskRepository);
export const createTaskUseCase = new CreateTaskUseCase(taskRepository);
export const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
export const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
