/**
 * @author    Anthony Vilarim Caliani
 * @contact   https://github.com/avcaliani
 * 
 * @Description
 * User Controller.
 */
const Mongoose = require('mongoose');
const BCrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const Error = require('./util/error.message');

const User = require('../models/user.model');

/**
 * Register a new User.
 * @param {*} user User.
 * @return {Promise} User or Error.
 */
exports.register = (user) => {
  return new Promise((resolve, reject) => {

    if (!user)
        return reject(new Error('User Object is required.', 406));
    if (!user.email)
      return reject(new Error('User E-Mail is required.', 406));
    if (!user.password)
      return reject(new Error('User Password is required.', 406));

    BCrypt.hash(user.password, 10, (err, hash) => {

      if (err)
        return resolve(err);
  
      const usr = new User({
        _id: new Mongoose.Types.ObjectId(),
        email: user.email,
        password: hash
      });
  
      usr.save()
        .then(usr => resolve(parse(usr)))
        .catch(reject);
    })
  });
};

/**
 * Authenticate an User.
 * @param {*} login Login Data.
 * @return {Promise} Token or Error.
 */
exports.authenticate = (login) => {
  return new Promise((resolve, reject) => {

    if (!login)
      return reject(new Error('User Object is required.', 406));
    if (!login.email)
      return reject(new Error('User E-Mail is required.', 406));
    if (!login.password)
      return reject(new Error('User Password is required.', 406));

    User.findOne({ email: login.email })
    .exec()
    .then(user => {
      if (!user)
        return reject(new Error('Auth failed.', 401));

      BCrypt.compare(login.password, user.password, (err, result) => {
        if (err || !result)
          return reject(new Error('Auth failed.', 401));
        
        const token = JWT.sign({ id: user._id, email: user.email }, process.env.JWT_KEY, { expiresIn: '1h' });
        resolve({ token: token });
      });
    })
    .catch(reject);
  });
};

/**
 * Clean up a user object, which was returned from database.
 * @param {*} product User Object.
 */
function parse(user) {

  if (user === null || typeof user === 'undefined')
    return null;

  return {
    id: user._id,
    email: user.email,
    password: user.password
  };
}
