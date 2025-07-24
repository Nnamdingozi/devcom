
import * as yup from 'yup';

export const registrationSchema = yup.object({
  id: yup
    .number()
    .integer()
    .positive()
    .notRequired(), 

  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(10, 'Username must not exceed 10 characters'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),


  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must not exceed 20 characters')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),



  createdAt: yup.date().default(() => new Date()).notRequired(), 
  updatedAt: yup.date().default(() => new Date()).notRequired(), 
});

// Infer TypeScript type from the schema
export type RegistrationSchemaType = yup.InferType<typeof registrationSchema>;
