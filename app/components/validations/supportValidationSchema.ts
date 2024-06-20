// validations/supportValidationSchema.ts

import * as yup from 'yup';

export const supportValidationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  message: yup.string().required('Message is required'),
});
