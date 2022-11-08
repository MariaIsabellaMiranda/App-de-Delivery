const { Router } = require('express');
const adminController = require('../controllers/adminController');
const tokenMiddleware = require('../middlewares/tokenMiddleware');
const validateAdminRegister = require('../middlewares/validateAdminRegister');

const adminRoute = Router();

adminRoute.delete('/:id', tokenMiddleware, adminController.deleteUser);

adminRoute.get('/', tokenMiddleware, adminController.getUsers);

adminRoute.post('/register', tokenMiddleware, validateAdminRegister, adminController.createUser);

module.exports = adminRoute;
