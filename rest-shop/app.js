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
const ResponseHandler = require('./api/handlers/response-handler');

// Controllers
const Product = require('./api/routes/product');
const Order = require('./api/routes/order');

const App = Express();

// Registering Handlers (Before Request)
App.use(Morgan('dev'));
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(ResponseHandler);

// Registering Controllers
App.use('/products', Product);
App.use('/orders', Order);

// Registering Handlers (After Request)
App.use(ErrorHandler);

module.exports = App;
