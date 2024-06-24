// apiValidationSchemas.ts

import * as Yup from 'yup';

export const registerFormSchema = Yup.object({
  appName: Yup.string().required('App Name is required'),
  country: Yup.string().required('Country is required'),
});
