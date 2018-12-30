/**
 * @author      Anthony Vilarim Caliani
 * @contact     https://github.com/avcaliani
 * 
 * @Description
 * App JS File.
 */
const Express = require('express');
const App = Express();

// Controllers
const Product = require('./api/routes/product');
const Order = require('./api/routes/order');

// Registering Controllers
App.use('/products', Product);
App.use('/orders', Order);

module.exports = App;
