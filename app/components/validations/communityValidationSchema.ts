// communityValidationSchema.ts

import * as yup from 'yup';

export const communityValidationSchema = yup.object({
  title: yup.string().required('Title is required'),
  content: yup.string().required('Content is required'),
});
