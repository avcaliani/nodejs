const Response = require('../../commons/response');
const Error = require('../../commons/error');

const service = require('./product.service');

exports.find = async function (request, response, next) {
    try {
        Response.ok(response, await service.findAll());
    } catch (ex) { next(new Error(ex)); }
}

exports.findOne = async function (request, response, next) {
    try {
        Response.ok(response, await service.find(request.params.id));
    } catch (ex) { next(new Error(ex)); }
}

exports.save = async function (request, response, next) {
    try {

        if (typeof request.file === 'undefined')
            return Response.error(response, 'Invalid file.')

        const product = {
            name: request.body.name,
            price: request.body.price,
            image: request.file.path
        };
        Response.ok(response, await service.save(product), 201);

    } catch (ex) { next(new Error(ex)); }
}

exports.update = async function (request, response, next) {
    try {

        if (!Array.isArray(request.body))
            return Response.error(response, 'Invalid product body.');

        const data = {};
        for (const prop of request.body)
            data[prop.name] = prop.value;

        Response.ok(response, await service.update(request.params.id, data), 201);
    } catch (ex) { next(new Error(ex)); }
}

exports.delete = async function (request, response, next) {
    try {
        Response.ok(response, await service.remove(request.params.id));
    } catch (ex) { next(new Error(ex)); }
}