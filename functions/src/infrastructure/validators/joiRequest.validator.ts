import Joi from "joi";
import { RequestValidator } from "../../application/ports/validators/request.validator";
import { BadRequestError } from "../../application/errors/bad-request";

export class JoiRequestValidator implements RequestValidator {
  constructor(private readonly schema: Joi.ObjectSchema) {}

  async validateWithSchema(data: any): Promise<void> {
    const { error } = this.schema.validate(data, { abortEarly: false });
    if (error) {
      const messages = error.details.map((err) => err.message);
      throw new BadRequestError("Validation failed", messages);
    }
  }
}
