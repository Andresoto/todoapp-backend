import Joi from "joi";
import { RequestValidator } from "../../application/ports/validators/request.validator";
import { BadRequestError } from "../../application/errors/bad-request";

export class JoiRequestValidator implements RequestValidator {
  constructor(private readonly schema: Joi.ObjectSchema) {}

  async validateWithSchema(data: any): Promise<any> {
    const { error, value } = this.schema.validate(data, { 
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true
    });
    if (error) {
      const messages = error.details.map((err) => err.message);
      throw new BadRequestError("Validation failed", messages);
    }
    return value; // Retorna los datos filtrados
  }
}
