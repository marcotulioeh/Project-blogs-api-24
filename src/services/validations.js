const joi = require('joi');

const joiLogin = joi.object({
  email: joi.string().email().required().messages({
    'string.empty': '400|Some required fields are missing',
    'any.required': '400|Some required fields are missing',
  }),

  password: joi.string().required().messages({
    'string.empty': '400|Some required fields are missing',
    'any.required': '400|Some required fields are missing',
  }),
});

const joiCreate = joi.object({
  displayName: joi.string().min(8).required().messages({
    'string.empty': '400|"displayName" length must be at least 8 characters long',
    'string.min': '400|"displayName" length must be at least 8 characters long',
    'any.required': '400|"displayName" length must be at least 8 characters long',
  }),
  email: joi.string().email().required().messages({
    'string.empty': '400|"email" must be a valid email',
    'string.email': '400|"email" must be a valid email',
    'any.required': '400|"email" must be a valid email',
  }),
  password: joi.string().min(6).required().messages({
    'string.empty': '400|"password" length must be at least 6 characters long',
    'string.min': '400|"password" length must be at least 6 characters long',
    'any.required': '400|"password" length must be at least 6 characters long',
  }),
});

const joiCategory = joi.object({
  name: joi.string().required().messages({
    'string.empty': '400|"name" is required',
    'any.required': '400|"name" is required',
  }),
});

const checkValidations = (check, object) => {
  const { error } = check.validate(object);
  if (error !== undefined) {
    const [code, message] = error.message.split('|');
    return { code: Number(code), message };
  }

  return true;
};

const checkLogin = (object) => checkValidations(joiLogin, object);
const checkCreate = (object) => checkValidations(joiCreate, object);
const checkCategory = (object) => checkValidations(joiCategory, object);

module.exports = {
  checkLogin,
  checkCreate,
  checkCategory,
};