/**
 * @author    Anthony Vilarim Caliani
 * @contact   https://github.com/avcaliani
 * 
 * @Description
 * Order Routes.
 */
const Express = require('express');
const Router = Express.Router();
const Response = require('../response');

const AuthHandler = require('../middlewares/auth.handler')

const OrderController = require('../controllers/order.controller');

Router.get('/', AuthHandler, (request, response, next) => {
  OrderController.findAll().then(
    products => Response.ok(response, products),
    err => Response.error(response, err)
  );
});

Router.get('/:id', AuthHandler, (request, response, next) => {
  OrderController.find(request.params.id).then(
    products => Response.ok(response, products),
    err => Response.error(response, err)
  );
})

Router.post('/', AuthHandler, (request, response, next) => {
  OrderController.save(request.body).then(
    products => Response.ok(response, products),
    err => Response.error(response, err)
  );
});

Router.delete('/:id', AuthHandler, (request, response, next) => {
  OrderController.remove(request.params.id).then(
    products => Response.ok(response, products),
    err => Response.error(response, err)
  );
});

module.exports = Router;
