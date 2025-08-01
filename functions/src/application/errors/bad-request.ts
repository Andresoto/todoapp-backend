import { HttpError } from "./http-error";

export class BadRequestError extends HttpError {
  constructor(message: string, details: string[] = []) {
    super(message, 400, details);
  }
}