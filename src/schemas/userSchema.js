import Joi from 'joi';

export const signUpSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)
    .required()
    .messages({
      'string.empty': 'O nome é obrigatório.',
      'string.min': 'O nome deve ter pelo menos 3 caracteres.',
      'string.pattern.base': 'Insira um nome válido',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'O e-mail é obrigatório.',
      'string.email': 'Insira um e-mail válido.',
    }),
  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'A senha é obrigatória.'
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'O e-mail é obrigatório.',
    'string.email': 'O e-mail deve ser válido.',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'A senha é obrigatória.'
  }),
});
