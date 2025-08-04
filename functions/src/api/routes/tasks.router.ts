import express from "express";
import { validate } from "../middlewares/validator.handler";
import { TasksController } from "../controllers/tasks.controller";
import {
  createTaskSchema,
  updateTaskSchema,
} from "../schemas/task.schema";

const taskRouter = express.Router();

const tasksController = new TasksController();

const boundTasksController = {
  getTasks: tasksController.getTasks.bind(tasksController),
  addTask: tasksController.addTask.bind(tasksController),
  updateTask: tasksController.updateTask.bind(tasksController),
  deleteTask: tasksController.deleteTask.bind(tasksController),
};

taskRouter.get("/", boundTasksController.getTasks);

taskRouter.post("/", validate(createTaskSchema), boundTasksController.addTask);

taskRouter.patch("/", (req, res, next) => {
  return res.status(400).json({ message: "Invalid request id is required" });
});

taskRouter.patch(
  "/:id",
  validate(updateTaskSchema),
  boundTasksController.updateTask
);

taskRouter.delete("/:id", boundTasksController.deleteTask);

export default taskRouter;
