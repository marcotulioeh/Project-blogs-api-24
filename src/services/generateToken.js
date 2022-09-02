require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (email) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ email }, process.env.JWT_SECRET, jwtConfig);
  return token;
};