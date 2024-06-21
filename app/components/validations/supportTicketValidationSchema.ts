// validations/supportTicketValidationSchema.ts

import * as yup from 'yup';

export const supportTicketValidationSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
});
