export class HttpError extends Error {
  public statusCode: number;
  
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
  }
}
