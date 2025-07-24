
import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'yup';
import {loginSchema} from '../validation/loginSchema';
import {registrationSchema} from '../validation/registrationSchema';

const validate = (schema: ObjectSchema<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      // Validate the body data against the schema
      await schema.validate(req.body, { abortEarly: false }); 
      next(); 
    } catch (err: any) {

      res.status(400).json({
        message: 'Validation failed',
        errors: err.inner.map((e: { path: string; message: string }) => ({
          field: e.path,
          message: e.message,
        })),
      });
    }
  };
};

export const validateLogin = validate(loginSchema);
export const validateRegistration = validate(registrationSchema);
