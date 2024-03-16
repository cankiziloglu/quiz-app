const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const complexity = {
  min: 8,
  max: 20,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
};

function validateSignup(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: passwordComplexity(complexity).required(),
  });
  return schema.validate(user);
}

function validateLogin(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
}

function validateEdit(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: passwordComplexity(complexity).optional(),
    role: Joi.string().valid('USER', 'ADMIN').optional(),
  });
  return schema.validate(user);
}

module.exports = {
  validateSignup,
  validateLogin,
  validateEdit,
};
