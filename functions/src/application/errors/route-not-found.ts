import { HttpError } from "./http-error";

export class RouteNotFound extends HttpError {
  constructor(message: string, details: string[] = []) {
    super(message, 400, details);
  }
}