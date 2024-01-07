const Joi = require('joi');
const { JoiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(JoiPasswordExtendCore);

function validateSignup(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: joiPassword
      .string()
      .min(8)
      .max(20)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .onlyLatinCharacters()
      .required(),
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

module.exports = {
  validateSignup,
  validateLogin,
};
