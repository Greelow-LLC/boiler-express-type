import { z } from 'zod';

export const errorSchema = z.object({
  descri: z
    .string({
      invalid_type_error: 'Description should be a string',
      required_error: 'Description is required',
    })
    .min(1, { message: "Description can't be empty" }),
  code: z.number({
    invalid_type_error: 'Code should be a number',
    required_error: 'Code is required',
  }),
  status: z.number({
    invalid_type_error: 'Status should be a number',
    required_error: 'Status is required',
  }),
});
