const Response = require('../../commons/response');
const service = require('./order.service');

exports.find = async function (request, response, next) {
  try {
    Response.ok(response, await service.findAll());
  } catch (ex) { next(ex); }
};

exports.findOne = async function (request, response, next) {
  try {
    Response.ok(response, await service.find(request.params.id));
  } catch (ex) { next(ex); }
};

exports.save = async function (request, response, next) {
  try {
    Response.ok(response, await service.save(request.body), 201);
  } catch (ex) { next(ex); }
};

exports.delete = async function (request, response, next) {
  try {
    Response.ok(response, await service.remove(request.params.id));
  } catch (ex) { next(ex); }
};