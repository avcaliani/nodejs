const Response = require('../../commons/response')
const service = require('./user.service');

exports.signUp = async function (request, response, next) {
  try {
    Response.ok(response, await service.register(request.body), 201);
  } catch (err) { next(err); }
};

exports.signIn = async function (request, response, next) {
  try {
    Response.ok(response, await service.authenticate(request.body));
  } catch (err) { next(err); }
};