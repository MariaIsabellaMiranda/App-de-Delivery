const statusService = require('../services/statusService');

const update = async (req, res) => {
  const { orderId, status } = req.body;
  const { id } = res.locals.user;
  const newStatus = await statusService.update(id, orderId, status);
  res.status(201).json(newStatus);
};

module.exports = { update };
