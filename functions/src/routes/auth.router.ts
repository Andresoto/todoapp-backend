import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller";
import { validatorHandler } from "../middlewares/validator.handler";
import { mailSchema } from "../schemas/auth.schema";

const authRouter = express.Router();

authRouter.post(
  "/login",
  validatorHandler(mailSchema, "body"),
  loginController
);

authRouter.post(
  "/register",
  validatorHandler(mailSchema, "body"),
  registerController
);

export default authRouter;
