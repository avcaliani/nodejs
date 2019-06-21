const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const Error = require('../../commons/error');

const User = require('./user');

/**
 * Register a new User.
 * @param {*} user User.
 * @return {Promise} User or Error.
 */
exports.register = async function (user) {

  if (!user)
    throw new Error('User Object is required.', 406);
  if (!user.email)
    throw new Error('User E-Mail is required.', 406);
  if (!user.password)
    throw new Error('User Password is required.', 406);

  const _user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: user.email,
    password: await bcrypt.hash(user.password, 10)
  });

  return parse(await _user.save());
};

/**
 * Authenticate an User.
 * @param {*} login Login Data.
 * @return {Promise} Token or Error.
 */
exports.authenticate = async function(login) {

    if (!login)
      return reject(new Error('User Object is required.', 406));
    if (!login.email)
      return reject(new Error('User E-Mail is required.', 406));
    if (!login.password)
      return reject(new Error('User Password is required.', 406));

    const user = await User.findOne({email: login.email}).exec();
    if (!user)
      throw new Error('Auth failed.', 401);
    
    const result = await bcrypt.compare(login.password, user.password);
    if (!result)
      throw new Error('Auth failed.', 401);

    const token = JWT.sign(
      { id: user._id, email: user.email },
      process.env.JWT_KEY,
      { expiresIn: process.env.JWT_TIMEOUT }
    );
    return { token };
};

/**
 * Clean up a user object, which was returned from database.
 * @param {*} product User Object.
 */
function parse(user) {
  if (!user) return null;
  return {
    id: user._id, email: user.email, password: user.password
  };
}