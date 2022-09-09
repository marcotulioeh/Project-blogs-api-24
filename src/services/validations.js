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

const checkLogin = (object) => {
  const { error } = joiLogin.validate(object);
  if (error !== undefined) {
    const [code, message] = error.message.split('|');
    return { code: Number(code), message };
  }

  return true;
};

module.exports = {
  checkLogin,
};