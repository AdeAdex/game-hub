import * as Yup from 'yup';

const settingsValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First Name is required')
    .min(2, 'First Name must be at least 2 characters')
    .max(50, 'First Name cannot be longer than 50 characters'),
  lastName: Yup.string()
    .required('Last Name is required')
    .min(2, 'Last Name must be at least 2 characters')
    .max(50, 'Last Name cannot be longer than 50 characters'),
  username: Yup.string()
    .required('Username is required')
    .min(4, 'Username must be at least 4 characters')
    .max(20, 'Username cannot be longer than 20 characters')
    .matches(/^[a-zA-Z0-9_-]+$/, 'Invalid username format. Use only letters, numbers, underscore, and hyphen'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
});

export default settingsValidationSchema;
