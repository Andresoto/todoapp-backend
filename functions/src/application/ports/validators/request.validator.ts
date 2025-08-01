export interface RequestValidator<T = any> {
  validateWithSchema(data: T): void | Promise<void>;
}
