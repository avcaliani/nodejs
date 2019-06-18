const mongoose = require('mongoose');
const Error = require('../../commons/error');

const Order = require('./order');
const Product = require('../product/product');

/**
 * Find all Orders.
 * @return {Promise} List of Orders or Error.
 */
exports.findAll = () => {
  return new Promise((resolve, reject) => {
    Order.find()
    .select('_id product quantity') // Find only these fields
    .populate('product', '_id name price image')
    .exec()
    .then(documents => {
      const data = {
        count: documents.length,
        orders: documents.map(doc => {
          return parse(doc, { type: 'GET', url: `/orders/${doc._id}` });
        })
      };
      resolve(data);
    })
    .catch(reject);
  });
};

/**
 * Find an order by id.
 * @param {*} id Order ID.
 * @return {Promise} Order or Error.
 */
exports.find = (id) => {
  return new Promise((resolve, reject) => {
    Order.findById(id)
    .populate('product', '_id name price')
    .exec()
    .then(order => resolve(parse(order)))
    .catch(reject);
  });
};

/**
 * Save new order.
 * @param {*} order Order.
 * @return {Promise} Order or Error.
 */
exports.save = (order) => {
  return new Promise((resolve, reject) => {

    if (!order)
      return reject(new Error('Order Object is required.'));
    if (!order.productId)
      return reject(new Error('Order Product ID is required.'));
    if (!order.quantity)
      return reject(new Error('Order Quantity is required.'));

    Product.findById(order.productId)
    .then(product => {

      if (product === null)
        return reject(new Error('Product not found', 404));

      const _order = new Order({
        _id: mongoose.Types.ObjectId(),
        product: order.productId,
        quantity: order.quantity
      });
      
      _order.save()
      .then(result => resolve(parse(result)))
      .catch(reject);
    })
    .catch(reject);
  });
};

/**
 * Remove order by id.
 * @param {*} id Order ID.
 * @return {Promise} true or Error.
 */
exports.remove = (id) => {
  return new Promise((resolve, reject) => {
    Order.remove({ _id: id })
    .exec()
    .then(result => {
      if (result.n > 0)
        return resolve(true);
      reject(new Error('Order not found.', 404));
    })
    .catch(reject);
  });
};

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
    product: null
  };

  if (order.product)
    ret.product = {
      id: order.product._id,
      name: order.product.name,
      price: order.product.price,
      image: order.product.image
    };

  if (request !== null)
    ret.request = request;

  return ret;
}