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

// Registering Controllers
App.use('/products', Product)

module.exports = App;
