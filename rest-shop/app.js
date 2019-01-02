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
const ErrorHandler = require('./api/middlewares/error-handler');
const HttpHandler = require('./api/middlewares/http-handler');

// Controllers
const Product = require('./api/routes/product');
const Order = require('./api/routes/order');

// Database
Mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true
});

const App = Express();

// Log Handler
App.use(Morgan('dev'));

// Static Content
App.use('/uploads', Express.static(process.env.FILE_UPLOAD_FOLDER));

// Body Parser Handler
App.use(BodyParser.urlencoded({
  extended: false
}));
App.use(BodyParser.json());

// HTTP Handler
App.use(HttpHandler);

// Registering Routes
App.use('/products', Product);
App.use('/orders', Order);

// Error Handler
App.use(ErrorHandler);

module.exports = App;
