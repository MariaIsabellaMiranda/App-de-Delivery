const adminService = require('../services/adminService');

const createUser = async (req, res) => {
  const { id: adminId } = res.locals.user; 
  const user = await adminService.createUser(req.body, adminId);
  return res.status(201).json(user);
};

const deleteUser = async (req, res) => {
  const { id: adminId } = res.locals.user; 
  const { id: userId } = req.params;
  await adminService.deleteUser(userId, adminId);
  return res.status(200).end();
};

const getUsers = async (req, res) => {
  const { id: adminId } = res.locals.user; 
  const users = await adminService.getUsers(adminId);
  return res.status(200).json(users);
};

module.exports = { createUser, deleteUser, getUsers };
