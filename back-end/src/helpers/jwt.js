require('dotenv').config();
const fs = require('fs');
const { sign, verify, decode } = require('jsonwebtoken');

const JWT_SECRET = fs.readFileSync('./jwt.evaluation.key', 'utf-8') || 'secret_key';

const JWT_CONFIG = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createAccessToken = (id) => {
  const token = sign({ id }, JWT_SECRET, JWT_CONFIG);
  return token;
};

const validateAccessToken = (token) => {
  verify(token, JWT_SECRET);
  const decodedPayload = decode(token);
  return decodedPayload;
};

module.exports = {
  createAccessToken,
  validateAccessToken,
}
