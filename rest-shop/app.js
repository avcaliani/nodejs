/**
 * @author      Anthony Vilarim Caliani
 * @contact     https://github.com/avcaliani
 * 
 * @Description
 * App JS File.
 */
const Express = require('express');
const Morgan = require('morgan'); // Log Handler

// Controllers
const Product = require('./api/routes/product');
const Order = require('./api/routes/order');

const App = Express();

// Registering Log Handler
App.use(Morgan('dev'));

// Registering Controllers
App.use('/products', Product);
App.use('/orders', Order);

module.exports = App;
