export interface RequestValidator<T = any> {
  validateWithSchema(data: T): any | Promise<any>;
}
