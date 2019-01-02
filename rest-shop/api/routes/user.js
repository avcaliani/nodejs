/**
 * @author    Anthony Vilarim Caliani
 * @contact   https://github.com/avcaliani
 * 
 * @Description
 * Order Controller.
 */
const Express = require('express');
const Router = Express.Router();
const Mongoose = require('mongoose');
const BCrypt = require('bcrypt');
const Response = require('../response');

const User = require('../models/user');

Router.post('/sign-up', (request, response, next) => {
  BCrypt.hash(request.body.password, 10, (err, hash) => {

    if (err)
      return Response.error(response, err)

    const user = new User({
      _id: new Mongoose.Types.ObjectId(),
      email: request.body.email,
      password: hash
    });

    user.save()
      .then(result => Response.ok(response, parse(result), 201))
      .catch(err => Response.error(response, err));
  })
});

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

module.exports = Router;
