import { Application, ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { HttpError } from "../../application/errors/http-error";
import { BadRequestError } from "../../application/errors/bad-request";

function catchAll(req: Request, _res: Response, next: NextFunction): void {
  next(new BadRequestError("Route not found", ["The requested route does not exist"]));
}

export const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const details = err.details || [];

  if( err instanceof HttpError) {
    return res.status(status).json({
      message: err.message,
      details: err.details,
    });
  }

  return res.status(status).json({
    message,
    details,
  });
}

export function registerErrorHandlers(app: Application): void {
  app.use(catchAll);
  app.use(errorHandler);
}