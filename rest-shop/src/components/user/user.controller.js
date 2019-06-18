const Response = require('../../commons/response');
const Error = require('../../commons/error');

const service = require('./user.service');

exports.signUp = async function (request, response, next) {
    try {
        Response.ok(response, await service.register(request.body), 201);
    } catch (ex) { next(new Error(ex)); }
}

exports.signIn = async function (request, response, next) {
    try {
        Response.ok(response, await service.authenticate(request.body), 201);
    } catch (ex) { next(new Error(ex)); }
}