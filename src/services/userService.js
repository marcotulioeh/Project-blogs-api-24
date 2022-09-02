const { checkLogin } = require('./validation');
const { Users } = require('../database/models');
const generateToken = require('./generateToken');

module.exports = {
  login: async ({ email, password }) => {
    const check = checkLogin({ email, password });
    if (check.code) return check;

    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return { code: 400, message: 'Invalid fields' };
    }
    if (user.dataValues.password !== password) {
      return { code: 400, message: 'Invalid fields' };
    }
    const token = generateToken(email);
    return { token };
  },
};