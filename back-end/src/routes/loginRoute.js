const { Router } = require('express');
const validateLogin = require('../middlewares/validateLogin');
const loginController = require('../controllers/loginController');

const loginRoute = Router();

loginRoute.post('/', validateLogin, loginController.post);

module.exports = loginRoute;
