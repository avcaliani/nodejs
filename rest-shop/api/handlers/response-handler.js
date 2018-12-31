/**
 * @author    Anthony Vilarim Caliani
 * @contact   https://github.com/avcaliani
 * 
 * @Description
 * Response Handler, which is going to prevent CORS errors.
 */
const Express = require('express');
const Router = Express.Router();

Router.use((request, response, next) => {

  response.header('Access-Control-Allow-Origin', '*');
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (request.method === 'OPTIONS') {
    response.header(
      'Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE'
    );
    return response.status(200).json({});
  }
  next();
});

module.exports = Router;
