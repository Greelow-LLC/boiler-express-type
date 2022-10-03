import { z } from 'zod';

export const userSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'Email should be a string',
      required_error: 'Email is required',
    })
    .min(1, { message: "Email can't be empty" }),
  firstName: z
    .string({
      invalid_type_error: 'First Name should be a string',
      required_error: 'First Name is required',
    })
    .min(1, { message: "First Name can't be empty" }),
  lastName: z
    .string({
      invalid_type_error: 'Last Name should be a string',
      required_error: 'Last Name is required',
    })
    .min(1, { message: "Last Name can't be empty" }),
  phone: z
    .string({
      invalid_type_error: 'Phone should be a string',
      required_error: 'Phone is required',
    })
    .min(1, { message: "Phone can't be empty" }),
});
