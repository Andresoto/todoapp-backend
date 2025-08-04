import express from "express";
import { validate } from "../middlewares/validator.handler";
import { mailSchema } from "../schemas/auth.schema";
import { loginController, registerController } from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post(
  "/login",
  validate(mailSchema),
  loginController
);

authRouter.post(
  "/register",
  validate(mailSchema),
  registerController
);

export default authRouter;
