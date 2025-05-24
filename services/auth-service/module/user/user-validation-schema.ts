import joi from 'joi';
import { emailRegex, nameRegex, passwordRegex } from '../../helpers/regex';

const firstName = joi.string().required().pattern(nameRegex).messages({
  'string.base': 'First name must be a string',
  'string.empty': 'First name is required',
  'any.required': 'First name is required',
  'string.pattern.base':
    'First name must be 3-30 characters long and contain only letters, numbers, spaces, or hyphens',
});
const lastName = joi.string().required().pattern(nameRegex).messages({
  'string.base': 'Last name must be a string',
  'string.empty': 'Last name is required',
  'any.required': 'Last name is required',
  'string.pattern.base':
    'Last name must be 3-30 characters long and contain only letters, numbers, spaces, or hyphens',
});

// const userName = joi.string().required().pattern(nameRegex).messages({
//     'string.base': 'Username must be a string',
//     'string.empty': 'Username is required',
//     'any.required': 'Username is required',
//     'string.pattern.base':
//         'Username must be 3-30 characters long and contain only letters, numbers, spaces, or hyphens',
// })

const email = joi.string().required().pattern(emailRegex).messages({
  'string.empty': 'Email is required',
  'string.pattern.base': 'Please enter a valid email address',
});

const password = joi.string().required().pattern(passwordRegex).messages({
  'string.empty': 'Password is required',
  'string.pattern.base':
    'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character',
});

export const registerSchema = joi.object({
  firstName,
  lastName,
  // userName,
  email,
  password,
});
