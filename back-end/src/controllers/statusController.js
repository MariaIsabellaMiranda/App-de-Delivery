const statusService = require('../services/statusService');

const update = async (req, res) => {
  const { id: saleId, status } = req.body;
  const { id } = res.locals.user;
  const newStatus = await statusService.update(id, saleId, status);
  return res.status(201).json(newStatus);
};

module.exports = { update };
