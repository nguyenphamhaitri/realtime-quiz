import { checkSchema } from 'express-validator';

export const SchemaCreateQuestion = checkSchema({
  text: {
    in: ['body'],
    isString: true,
    trim: true,
    isEmpty: {
      bail: true,
      options: { ignore_whitespace: true },
      errorMessage: 'text is required.',
      negated: true,
    },
  },
  answer: {
    in: ['body'],
    isString: true,
    trim: true,
    isEmpty: {
      bail: true,
      options: { ignore_whitespace: true },
      errorMessage: 'answer is required.',
      negated: true,
    },
  },
  options: {
    in: ['body'],
    isArray: {
      errorMessage: 'options should be an array',
    },
    notEmpty: {
      errorMessage: 'options is required',
      options: { ignore_whitespace: true }, // Checks for empty arrays
    },
    custom: {
      options: (value) => {
        if (value.length < 2 || value.length > 6) {
          throw new Error('options array length must be between 2 and 6');
        }
        return true;
      },
    },
    trim: true,
  },
});
