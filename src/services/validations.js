const joi = require('joi');
const { BlogPost } = require('../database/models');

const ERROR_NAME = '400|"name" is required';
const ERROR_DISPLAYNAME = '400|"displayName" length must be at least 8 characters long';
const ERROR_MISSING = '400|Some required fields are missing';
const ERROR_EMAIL = '400|"email" must be a valid email';
const ERROR_PASSWORD = '400|"password" length must be at least 6 characters long';

const joiLogin = joi.object({
  email: joi.string().email().required().messages({
    'string.empty': ERROR_MISSING,
    'any.required': ERROR_MISSING,
  }),

  password: joi.string().required().messages({
    'string.empty': ERROR_MISSING,
    'any.required': ERROR_MISSING,
  }),
});

const joiCreate = joi.object({
  displayName: joi.string().min(8).required().messages({
    'string.empty': ERROR_DISPLAYNAME,
    'string.min': ERROR_DISPLAYNAME,
    'any.required': ERROR_DISPLAYNAME,
  }),
  email: joi.string().email().required().messages({
    'string.empty': ERROR_EMAIL,
    'string.email': ERROR_EMAIL,
    'any.required': ERROR_EMAIL,
  }),
  password: joi.string().min(6).required().messages({
    'string.empty': ERROR_PASSWORD,
    'string.min': ERROR_PASSWORD,
    'any.required': ERROR_PASSWORD,
  }),
});

const joiCategory = joi.object({
  name: joi.string().required().messages({
    'string.empty': ERROR_NAME,
    'any.required': ERROR_NAME,
  }),
});

const joiPost = joi.object({
  title: joi.string().required().messages({
    'string.empty': ERROR_MISSING,
    'any.required': ERROR_MISSING,
  }),
  content: joi.string().required().messages({
    'string.empty': ERROR_MISSING,
    'any.required': ERROR_MISSING,
  }),
  categoryIds: joi.array().required().messages({
    'string.empty': ERROR_MISSING,
    'any.required': ERROR_MISSING,
  }),
});

const joiUpdate = joi.object({
  title: joi.string().required().messages({
    'string.empty': ERROR_MISSING,
    'any.required': ERROR_MISSING,
  }),
  content: joi.string().required().messages({
    'string.empty': ERROR_MISSING,
    'any.required': ERROR_MISSING,
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

const checkUser = async (id, userId) => {
  const post = await BlogPost.findByPk(id);
  if (!post) return { code: 404, message: 'Post does not exist' };

  if (userId !== post.userId) return { code: 401, message: 'Unauthorized user' };

  return true;
};

const checkLogin = (object) => checkValidations(joiLogin, object);
const checkCreate = (object) => checkValidations(joiCreate, object);
const checkCategory = (object) => checkValidations(joiCategory, object);
const checkPost = (object) => checkValidations(joiPost, object);
const checkUpdate = (object) => checkValidations(joiUpdate, object);

module.exports = {
  checkLogin,
  checkCreate,
  checkCategory,
  checkPost,
  checkUpdate,
  checkUser,
};