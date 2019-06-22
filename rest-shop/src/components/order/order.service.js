const mongoose = require('mongoose');
const Error = require('../../commons/error');

const Order = require('./order');
const Product = require('../product/product');

/**
 * Find all Orders.
 * @return {Promise} List of Orders or Error.
 */
exports.findAll = async function() {
  const products = await Order.find()
                              .select('_id product quantity') // Find only these fields
                              .populate('product', '_id name price image')
                              .exec();
  return {
    count: products.length,
    orders: products.map(product => {
      return parse(product, { type: 'GET', url: `/orders/${product._id}` });
    })
  };
};

/**
 * Find an order by id.
 * @param {*} id Order ID.
 * @return {Promise} Order or Error.
 */
exports.find = async function(id) {
  const order = await Order.findById(id)
                          .populate('product', '_id name price')
                          .exec();
  return parse(order);
};

/**
 * Save new order.
 * @param {*} order Order.
 * @return {Promise} Order or Error.
 */
exports.save = async function(order) {

  if (!order)
    return new Error('Order Object is required.');
  if (!order.productId)
    return new Error('Order Product ID is required.');
  if (!order.quantity)
    return new Error('Order Quantity is required.');

  const product = await Product.findById(order.productId);
  if (product === null)
    return new Error('Product not found', 404);

  const _order = new Order({
    _id: mongoose.Types.ObjectId(),
    product: order.productId,
    quantity: order.quantity
  });    
  return parse(await _order.save());
};

/**
 * Remove order by id.
 * @param {*} id Order ID.
 * @return {Promise} true or Error.
 */
exports.remove = async function(id) {
  const result = await Order.deleteOne({ _id: id }).exec()
  if (result.n <= 0)
    throw new Error('Order not found.', 404);
  return true;
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