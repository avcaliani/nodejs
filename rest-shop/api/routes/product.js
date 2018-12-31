/**
 * @author      Anthony Vilarim Caliani
 * @contact     https://github.com/avcaliani
 * 
 * @Description
 * Product Controller.
 */
const Express = require('express');
const Router = Express.Router();

Router.get('/', (request, response, next) => {
    response.status(200).json({
        message: 'Product:get() Works!'
    });
});

Router.get('/:id', (request, response, next) => {
    response.status(200).json({
        message: 'Product:get(id) Works!',
        id: request.params.id
    });
})

Router.post('/', (request, response, next) => {
    const product = {
        id: Math.floor((Math.random() * 1000)) + 1,
        name: request.body.name,
        price: request.body.price
    };
    response.status(200).json(product);
});

Router.patch('/:id', (request, response, next) => {
    response.status(200).json({
        message: 'Product:patch(id) Works!',
        id: request.params.id
    });
});

Router.delete('/:id', (request, response, next) => {
    /**
     * You can even 'return' the response statement, but it is optional.
     * For example:
     *  return response.status(200).json({ ... });
     */
    response.status(200).json({
        message: 'Product:delete(id) Works!',
        id: request.params.id
    });
});

module.exports = Router;
