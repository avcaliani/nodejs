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
const JWT = require('jsonwebtoken');

const User = require('../models/user.model');

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

Router.post('/sign-in', (request, response, next) => {
  User.findOne({ email: request.body.email })
    .exec()
    .then(user => {
      
      if (!user)
        return Response.error(response, 'Auth failed', 401);

      BCrypt.compare(request.body.password, user.password, (err, result) => {
        
        if (err || !result)
          return Response.error(response, 'Auth failed', 401);
        
        const token = JWT.sign({ id: user._id, email: user.email }, process.env.JWT_KEY, { expiresIn: '1h' });
        return Response.ok(response, { token: token });
      });
    })
    .catch(err => Response.error(response, err));
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
