import { Application, ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { HttpError } from "../../shared/errors/http-error";
import { BadRequestError } from "../../shared/errors/bad-request";

function catchAll(req: Request, _res: Response, next: NextFunction): void {
  next(new BadRequestError("Route not found"));
}

export const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if( err instanceof HttpError) {
    return res.status(status).json({
      message: err.message,
    });
  }

  return res.status(status).json({
    message,
  });
}

export function registerErrorHandlers(app: Application): void {
  app.use(catchAll);
  app.use(errorHandler);
}