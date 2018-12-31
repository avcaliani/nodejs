/**
 * @author    Anthony Vilarim Caliani
 * @contact   https://github.com/avcaliani
 * 
 * @Description
 * Product Controller.
 */
const Express = require('express');
const Router = Express.Router();
const Response = require('../response');
const Mongoose = require('mongoose');
const Product = require('../models/product');

Router.get('/', (request, response, next) => {
  Product.find()
    .exec()
    .then(documents => Response.ok(response, documents))
    .catch(err => Response.error(response, err, 500));
});

Router.get('/:id', (request, response, next) => {
  Product.findById(request.params.id)
    .exec()
    .then(document => Response.ok(response, document))
    .catch(err => Response.error(response, err, 500));
})

Router.post('/', (request, response, next) => {

  const product = new Product({
    _id: new Mongoose.Types.ObjectId(),
    name: request.body.name,
    price: request.body.price
  });

  product.save()
    .then(result => Response.ok(response, result, 201))
    .catch(err => Response.error(response, err));

});

Router.patch('/:id', (request, response, next) => {

  const data = {};
  for (const prop of request.body)
    data[prop.name] = prop.value;

  Product.update({ _id: request.params.id }, { $set: data })
    .exec()
    .then(result => {
      if (result.n > 0)
        Response.ok(response, true);
      else
        Response.error(response, 'Order not found', 404);
    })
    .catch(err => Response.error(response, err));
});

Router.delete('/:id', (request, response, next) => {
  Product.remove({ _id: request.params.id })
    .exec()
    .then(result => {
      if (result.n > 0)
        return Response.ok(response, true);
      Response.error(response, 'Order not found', 404);
    })
    .catch(err => Response.error(response, err));
});

module.exports = Router;
