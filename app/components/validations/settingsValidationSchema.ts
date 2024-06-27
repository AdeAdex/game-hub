import * as Yup from 'yup';

const settingsValidationSchema = (selectedOption: string) => {
  return Yup.object().shape({
    firstName: Yup.string().when([], {
      is: () => selectedOption === 'profile',
      then: (schema) => schema
        .required('First Name is required')
        .min(2, 'First Name must be at least 2 characters')
        .max(50, 'First Name cannot be longer than 50 characters'),
    }),
    lastName: Yup.string().when([], {
      is: () => selectedOption === 'profile',
      then: (schema) => schema
        .required('Last Name is required')
        .min(2, 'Last Name must be at least 2 characters')
        .max(50, 'Last Name cannot be longer than 50 characters'),
    }),
    userName: Yup.string().when([], {
      is: () => selectedOption === 'profile',
      then: (schema) => schema
        .required('User Name is required')
        .min(4, 'User Name must be at least 4 characters')
        .max(20, 'User Name cannot be longer than 20 characters')
        .matches(/^[a-zA-Z0-9_-]+$/, 'Invalid user Name format. Use only letters, numbers, underscore, and hyphen'),
    }),
    email: Yup.string().when([], {
      is: () => selectedOption === 'email',
      then: (schema) => schema
        .required('Email is required')
        .email('Invalid email format'),
    }),
    password: Yup.string().when([], {
      is: () => selectedOption === 'password',
      then: (schema) => schema
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    }),
    facebook: Yup.string().when([], {
      is: () => selectedOption === 'socialMedia',
      then: (schema) => schema
      .required('Facebook link is required')
        .url('Invalid URL format')
        .nullable(),
    }),
    linkedin: Yup.string().when([], {
      is: () => selectedOption === 'socialMedia',
      then: (schema) => schema
      .required('Linkedin link is required')
        .url('Invalid URL format')
        .nullable(),
    }),
    twitter: Yup.string().when([], {
      is: () => selectedOption === 'socialMedia',
      then: (schema) => schema
      .required('Twitter link is required')
        .url('Invalid URL format')
        .nullable(),
    }),
  });
};

export default settingsValidationSchema;
