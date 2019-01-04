/**
 * @author    Anthony Vilarim Caliani
 * @contact   https://github.com/avcaliani
 * 
 * @Description
 * User Routes.
 */
const Express = require('express');
const Router = Express.Router();
const Response = require('../response');

const UserController = require('../controllers/user.controller');

Router.post('/sign-up', (request, response, next) => {
  UserController.register(request.body).then(
    user => Response.ok(response, user, 201),
    err => Response.error(response, err)
  );
});

Router.post('/sign-in', (request, response, next) => {
  UserController.authenticate(request.body).then(
    user => Response.ok(response, user),
    err => Response.error(response, err)
  );
});

module.exports = Router;
