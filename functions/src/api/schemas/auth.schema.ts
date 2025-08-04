import Joi from "joi";

const email = Joi.string().email().required();

export const mailSchema = Joi.object({
  email,
});