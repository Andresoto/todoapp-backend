import Joi from "joi";

const id = Joi.string();
const title = Joi.string().min(3).max(100);
const description = Joi.string().max(500);
const state = Joi.boolean().default(false);
const userId = Joi.string();

export const getTasksSchema = Joi.object({
    id: id.required(),
});

export const createTaskSchema = Joi.object({
  title: title.required(),
  description: description.required(),
  state: state.optional(),
  userId: userId.required(),
});

export const updateTaskSchema = Joi.object({
  title: title.optional(),
  description: description.optional(),
  state: state.optional(),
});

export const deleteTaskSchema = Joi.object({
    id: id.required(),
});
