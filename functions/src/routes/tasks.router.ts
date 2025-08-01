import express from "express";
import {
  getTasksController,
  addTaskController,
  deleteTaskController,
  updateTaskController,
} from "../controllers/tasks.controller";
import { validatorHandler } from "../middlewares/validator.handler";
import {
  createTaskSchema,
  deleteTaskSchema,
  getTasksSchema,
  updateTaskSchema,
} from "../schemas/task.schema";

const taskRouter = express.Router();

// Initialize AuthService

taskRouter.get("/", getTasksController);

taskRouter.post(
  "/",
  validatorHandler(createTaskSchema, "body"),
  addTaskController
);

taskRouter.patch(
  "/:id",
  validatorHandler(getTasksSchema, "params"),
  validatorHandler(updateTaskSchema, "body"),
  updateTaskController
);

taskRouter.delete(
  "/:id",
  validatorHandler(deleteTaskSchema, "params"),
  deleteTaskController
);

export default taskRouter;
