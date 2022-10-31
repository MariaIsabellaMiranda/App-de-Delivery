const md5 = require('md5');

const loginService = require('../services/loginService');

const post = async (req, res) => {
  const user = await loginService.login(req.body);
  return res.status(200).json(user);
};

module.exports = { post };
