require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const { email } = jwt.verify(token, JWT_SECRET);
    const { displayName, id } = await User.findOne({
      where: { email },
    });
    req.user = { email, displayName, userId: id };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};