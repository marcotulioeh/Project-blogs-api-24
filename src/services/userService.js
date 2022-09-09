const { User } = require('../database/models');
const generateToken = require('./generateToken');
const { checkLogin } = require('./validations');

module.exports = {
  login: async ({ email, password }) => {
    const validation = checkLogin({ email, password });
    if (validation.code) return validation;

    const user = await User.findOne({ where: { email } });
    if (!user) return { code: 400, message: 'Invalid fields' };
    if (user.dataValues.password !== password) return { code: 400, message: 'Invalid fields' };

    const token = generateToken(email);
    return { token };
  },
};