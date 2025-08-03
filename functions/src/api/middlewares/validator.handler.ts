import { Request, Response, NextFunction } from 'express';
import { JoiRequestValidator } from '../../infrastructure/validators/joiRequest.validator';

export function validate(schema: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validator = new JoiRequestValidator(schema);
    try {
      const validatedData = await validator.validateWithSchema(req.body);
      req.body = validatedData; // Reemplazar req.body con los datos filtrados
      next();
    } catch (error: any) {
      next(error);
    }
  };
}