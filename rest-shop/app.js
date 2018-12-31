/**
 * @author      Anthony Vilarim Caliani
 * @contact     https://github.com/avcaliani
 * 
 * @Description
 * App JS File.
 */
const Express = require('express');
const Morgan = require('morgan'); // Log Handler
const BodyParser = require('body-parser');

// Handlers
const ErrorHandler = require('./api/handlers/error-handler');

// Controllers
const Product = require('./api/routes/product');
const Order = require('./api/routes/order');

const App = Express();

// Registering Log Handler
App.use(Morgan('dev'));
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());

// Registering Controllers
App.use('/products', Product);
App.use('/orders', Order);

// Registering Handlers
App.use(ErrorHandler);

module.exports = App;
