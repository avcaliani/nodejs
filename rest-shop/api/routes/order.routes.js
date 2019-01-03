/**
 * @author    Anthony Vilarim Caliani
 * @contact   https://github.com/avcaliani
 * 
 * @Description
 * Order Routes.
 */
const Express = require('express');
const Router = Express.Router();
const Mongoose = require('mongoose');
const Response = require('../response');

const Order = require('../models/order.model');
const Product = require('../models/product.model');

Router.get('/', (request, response, next) => {
  Order.find()
    .select('_id product quantity') // Find only these fields
    .populate('product', '_id name price image')
    .exec()
    .then(documents => {
      const path = `http://${request.headers.host}/orders/`;
      const data = {
        count: documents.length,
        products: documents.map(doc => {
          return parse(doc, { type: 'GET', url: path + doc._id });
        })
      };
      Response.ok(response, data);
    })
    .catch(err => Response.error(response, err, 500));
});

Router.get('/:id', (request, response, next) => {
  Order.findById(request.params.id)
    .populate('product', '_id name price')
    .exec()
    .then(result => Response.ok(response, parse(result)))
    .catch(err => Response.error(response, err, 500));
})

Router.post('/', (request, response, next) => {
  Product.findById(request.body.productId)
    .then(product => {

      if (product === null)
        return Response.error(response, 'Product not found', 404)

      const order = new Order({
        _id: Mongoose.Types.ObjectId(),
        product: request.body.productId,
        quantity: request.body.quantity
      });
      
      order.save()
      .then(result => Response.ok(response, parse(result), 201))
      .catch(err => Response.error(response, err));
    })
    .catch(err => Response.error(response, 'Product doesn\'t exist', 500));
});

Router.delete('/:id', (request, response, next) => {
  Order.remove({ _id: request.params.id })
  .exec()
  .then(result => {
    if (result.n > 0)
      return Response.ok(response, true);
    Response.error(response, 'Order not found', 404);
  })
  .catch(err => Response.error(response, err));
});

/**
 * Clean up a order object, which was returned from database.
 * Request Object is optional and would have 'type' and 'url' fields.
 * @param {*} order Oder Object.
 * @param {*} request Request Object (Optional)
 */
function parse(order, request = null) {

  if (order === null || typeof order === 'undefined')
    return null;

  const ret = {
    id: order._id,
    quantity: order.quantity,
    product: {
      id: order.product._id,
      name: order.product.name,
      price: order.product.price,
      image: order.product.image
    }
  };

  if (request !== null)
    ret.request = request;

  return ret;
}

module.exports = Router;
