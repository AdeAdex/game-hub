// apiValidationSchemas.ts

import * as Yup from 'yup';

// Define the updated validation schema
export const registerFormSchema = Yup.object({
  appName: Yup.string().required('App Name is required'),
  country: Yup.string().required('Country is required'),
  state: Yup.string().required('State is required'),  // Added state validation
});
