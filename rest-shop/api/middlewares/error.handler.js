/**
 * @author    Anthony Vilarim Caliani
 * @contact   https://github.com/avcaliani
 * 
 * @Description
 * API Error Handlers.
 */
const Express = require('express');
const Router = Express.Router();
const Response = require('../response');

Router.use((request, response, next) => {
  /**
   * If any route above couldn't resolve the resquest,
   * it will be resolved by this method.
   */
  const error = new Error('Resource Not found');
  error.status = 404;
  next(error);
});

Router.use((error, request, response, next) => {
  /**
   * This method will be called everytime that we have an error.
   */
  Response.error(response, error, error.status || 500)
});

module.exports = Router;
