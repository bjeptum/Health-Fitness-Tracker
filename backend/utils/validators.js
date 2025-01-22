const Joi = require('joi');

// User Validation Schema
const userValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name cannot be empty',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Email must be a valid email address',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'Password is required',
    'string.min': 'Password must be at least 6 characters long',
  }),
});

// Exercise Validation Schema
const exerciseValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Exercise name is required',
    'string.empty': 'Exercise name cannot be empty',
  }),
  type: Joi.string()
    .valid('strength', 'cardio', 'aerobics', 'flexibility', 'yoga', 'pilates', 'full body')
    .required()
    .messages({
      'any.required': 'Exercise type is required',
      'any.only': 'Exercise type must be one of strength, cardio, aerobics, flexibility, yoga, pilates, full body',
    }),
  sets: Joi.number().integer().positive().required().messages({
    'any.required': 'Number of sets is required',
    'number.base': 'Sets must be a number',
    'number.positive': 'Sets must be a positive number',
  }),
  reps: Joi.number().integer().positive().required().messages({
    'any.required': 'Number of reps is required',
    'number.base': 'Reps must be a number',
    'number.positive': 'Reps must be a positive number',
  }),
  weight: Joi.number().positive().optional().messages({
    'number.base': 'Weight must be a number',
    'number.positive': 'Weight must be a positive number',
  }),
  date: Joi.date().optional().messages({
    'date.base': 'Date must be a valid date',
  }),
});

// Goal Validation Schema
const goalValidationSchema = Joi.object({
  goalType: Joi.string().required().messages({
    'any.required': 'Goal type is required',
  }),
  targetValue: Joi.number().positive().required().messages({
    'any.required': 'Target value is required',
    'number.base': 'Target value must be a number',
    'number.positive': 'Target value must be a positive number',
  }),
  currentValue: Joi.number().positive().optional().messages({
    'number.base': 'Current value must be a number',
    'number.positive': 'Current value must be a positive number',
  }),
  deadline: Joi.date().optional().messages({
    'date.base': 'Deadline must be a valid date',
  }),
});

module.exports = {
  userValidationSchema,
  exerciseValidationSchema,
  goalValidationSchema,
};
