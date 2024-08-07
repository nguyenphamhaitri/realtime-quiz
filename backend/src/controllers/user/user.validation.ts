import { checkSchema } from 'express-validator';

export const SchemaRegister = checkSchema({
  username: {
    in: ['body'],
    isLength: {
      bail: true,
      options: { min: 5, max: 20 },
      errorMessage: 'username must have 5-20 characters.',
    },
  },
  password: {
    in: ['body'],
    isLength: {
      bail: true,
      options: { min: 6, max: 20 },
      errorMessage: 'password must have 6-20 characters.',
    },
  },
});

export const SchemaLogin = checkSchema({
  username: {
    in: ['body'],
    isLength: {
      bail: true,
      options: { min: 5, max: 20 },
      errorMessage: 'username must have 5-20 characters.',
    },
  },
  password: {
    in: ['body'],
    isLength: {
      bail: true,
      options: { min: 6, max: 20 },
      errorMessage: 'password must have 6-20 characters.',
    },
  },
});
