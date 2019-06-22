const mongoose = require('mongoose');
const Error = require('../../commons/error');
const Product = require('./product');

/**
 * Find all Products.
 * @return {Promise} List of Products or Error.
 */
exports.findAll = async function() {
  const products = await Product.find()
                                .select('_id name price image') // Find only these fields
                                .exec();
  return {
    count: products.length,
    products: products.map(product => {
      return parse(product, { type: 'GET', url: `/products/${product._id}` });
    })
  };
};

/**
 * Find a product by id.
 * @param {*} id Product ID.
 * @return {Promise} Product or Error.
 */
exports.find = async function (id) {
  return parse(await Product.findById(id).exec());  
};

/**
 * Save new product.
 * @param {*} product Product.
 * @return {Promise} Product or Error.
 */
exports.save = async function(product) {

  if (!product)
    return new Error('A Product Object is required.', 406);
  if (!product.name)
    return new Error('A Product Name is required.', 406);
  if (!product.price)
    return new Error('A Product Price is required.', 406);

  const _product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: product.name,
    price: product.price,
    image: product.image || null
  });

  return parse(await _product.save());
};

/**
 * Update product data.
 * @param {*} id Product ID.
 * @param {*} product Product.
 * @return {Promise} true or Error.
 */
exports.update = async function(id, product) {

  if (!id)
    return new Error('Product ID is required.', 406);
  if (!product)
    return new Error('Product Object is required.', 406);

  const prod = { };
  if (product.name) prod.name = product.name;
  if (product.price) prod.price = product.price;

  const result = await Product.updateOne({ _id: id }, { $set: prod }).exec();
  if (result.n <= 0)
    throw new Error('Product not found.', 404);

  return true;
};

/**
 * Remove product by id.
 * @param {*} id Product ID.
 * @return {Promise} true or Error.
 */
exports.remove = async function(id) {
  const result = Product.deleteOne({ _id: id }).exec();
  if (result.n <= 0)
    throw new Error('Product not found.', 404);
  return true;
};

/**
 * Clean up a product object, which was returned from database.
 * Request Object is optional and would have 'type' and 'url' fields.
 * @param {*} product Product Object.
 * @param {*} request Request Object (Optional)
 */
function parse(product, request = null) {

  if (product === null || typeof product === 'undefined')
    return null;

  const prod = {
    id: product._id,
    name: product.name,
    price: product.price,
    image: product.image
  };

  if (request !== null)
    prod.request = request;

  return prod;
}