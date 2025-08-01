import { NextFunction, Request, Response } from "express";

export const validatorHandler = (schema: any, property: 'body' | 'params') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      res.status(400).json({ error: error.details.map((err: any) => err.message) });
      return;
    }
    next();
  };
}