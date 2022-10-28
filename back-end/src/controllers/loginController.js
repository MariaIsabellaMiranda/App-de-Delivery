const md5 = require('md5');

const loginService = require('../services/loginService');

const post = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const cryptPass = md5(password);
  console.log(cryptPass);
  const result = await loginService.login(email, cryptPass);
  if (result.message) return res.status(404).json(result);
  return res.status(200).json(result);
};

module.exports = { post };
