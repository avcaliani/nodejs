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
    .select('_id name price') // Find only these fields
    .exec()
    .then(documents => {
      const path = `http://${request.headers.host}/products/`;
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
  Product.findById(request.params.id)
    .exec()
    .then(result => Response.ok(response, parse(result)))
    .catch(err => Response.error(response, err, 500));
})

Router.post('/', (request, response, next) => {

  const product = new Product({
    _id: new Mongoose.Types.ObjectId(),
    name: request.body.name,
    price: request.body.price
  });

  product.save()
    .then(result => Response.ok(response, parse(result), 201))
    .catch(err => Response.error(response, err));

});

Router.patch('/:id', (request, response, next) => {

  if (!Array.isArray(request.body))
    return Response.error(response, 'Invalid product body', 500);

  const data = {};
  for (const prop of request.body)
    data[prop.name] = prop.value;

  Product.update({ _id: request.params.id }, { $set: data })
    .exec()
    .then(result => {
      if (result.n > 0)
        return Response.ok(response, true);
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
      Response.error(response, 'Product not found', 404);
    })
    .catch(err => Response.error(response, err));
});

/**
 * Clean up a product object, which was returned from database.
 * Request Object is optional and would have 'type' and 'url' fields.
 * 
 * @param {*} product Product Object.
 * @param {*} request Request Object (Optional)
 */
function parse(product, request = null) {
  
  if (product === null || typeof product === 'undefined')
    return null;
  
    const prod = {
      id: product._id,
      name: product.name,
      price: product.price
    };

    if (request !== null)
      prod.request = request;

      return prod;
}

module.exports = Router;
