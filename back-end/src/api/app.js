require('express-async-errors');
const express = require('express');
const cors = require('cors');
const commonRoute = require('../routes/commonRoute');
const productsRoute = require('../routes/productsRoute');
const sellerRoute = require('../routes/sellerRoute');
const customerRoute = require('../routes/customerRoute');
const statusRoute = require('../routes/statusRoute');
const errorMiddleware = require('../middlewares/errorMiddleware');
const adminRoute = require('../routes/adminRoute');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/images', express.static(`${__dirname}/../images`));

app.use('/common', commonRoute);

app.use('/products', productsRoute);

app.use('/seller', sellerRoute);

app.use('/adm', adminRoute);

app.use('/customer', customerRoute);

app.use('/status', statusRoute);

app.use(errorMiddleware);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
