/**
 * @author      Anthony Vilarim Caliani
 * @contact     https://github.com/avcaliani
 * 
 * @Description
 * Order Controller.
 */
const Express = require('express');
const Router = Express.Router();

Router.get('/', (request, response, next) => {
    response.status(200).json({
        message: 'Order:get() Works!'
    });
});

Router.get('/:id', (request, response, next) => {
    response.status(200).json({
        message: 'Order:get(id) Works!',
        id: request.params.id
    });
})

Router.post('/', (request, response, next) => {
    const order = {
        id: Math.floor((Math.random() * 1000)) + 1,
        productId: request.body.productId,
        quantity: request.body.quantity
    };
    response.status(200).json(order);
});

Router.delete('/:id', (request, response, next) => {
    response.status(200).json({
        message: 'Order:delete(id) Works!',
        id: request.params.id
    });
});

module.exports = Router;
