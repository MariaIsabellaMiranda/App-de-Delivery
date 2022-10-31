const commonService = require('../services/commonService');

const login = async (req, res) => {
  const user = await commonService.login(req.body);
  return res.status(200).json(user);
};

const register = async (req, res) => {
  const user = await commonService.register(req.body);
  return res.status(201).json(user);
};

module.exports = { login, register };
