/**
 * @author    Anthony Vilarim Caliani
 * @contact   https://github.com/avcaliani
 * 
 * @Description
 * App JS File.
 */
const Express = require('express');
const Morgan = require('morgan'); // Log Handler
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');

// Handlers
const ErrorHandler = require('./api/handlers/error-handler');
const HttpHandler = require('./api/handlers/http-handler');

// Controllers
const Product = require('./api/routes/product');
const Order = require('./api/routes/order');

// Database
Mongoose.connect(process.env.MONGO_ATLAS_URL, {
  useNewUrlParser: true
});

const App = Express();

// Registering Handlers (Before Request)
App.use(Morgan('dev'));
App.use(BodyParser.urlencoded({
  extended: false
}));
App.use(BodyParser.json());
App.use(HttpHandler);

// Registering Controllers
App.use('/products', Product);
App.use('/orders', Order);

// Registering Handlers (After Request)
App.use(ErrorHandler);

module.exports = App;
