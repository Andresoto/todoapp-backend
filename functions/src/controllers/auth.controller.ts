import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = AuthService.getInstance();

export const loginController = (req: Request, res: Response) => {
  const { email } = req.body;
  const user = authService.login(email);
  user
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(204);
      }
    })
    .catch((error) => {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error" });
    });
};

export const registerController = (req: Request, res: Response) => {
  const { email } = req.body;
  authService
    .registerUser(email)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((error) => {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "Internal server error" });
    });
};
