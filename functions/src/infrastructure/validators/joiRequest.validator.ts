import Joi from "joi";
import { RequestValidator } from "../../shared/interfaces/request.validator";
import { BadRequestError } from "../../shared/errors/bad-request";

export class JoiRequestValidator implements RequestValidator {
  constructor(private readonly schema: Joi.ObjectSchema) {}

  validate(data: any): any {
    const { error, value } = this.schema.validate(data, { 
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true
    });
    if (error) {
      const messages = error.details.map((err) => err.message);
      throw new BadRequestError(`Validation failed: ${messages.join(', ')}`);
    }
    return value; // Retorna los datos filtrados
  }

  async validateWithSchema(data: any): Promise<any> {
    return this.validate(data);
  }
}
