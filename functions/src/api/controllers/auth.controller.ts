import { Request, Response } from "express";
import { loginUseCase, registerUseCase } from "../../infrastructure/container/dependencies";

export const loginController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email } = req.body;
    const user = await loginUseCase.execute(email);
    
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const registerController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email } = req.body;
    const user = await registerUseCase.execute(email);
    return res.status(201).json(user);
  } catch (error) {
    console.error("Error during registration:", error);
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};
