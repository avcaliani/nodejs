/**
 * @author    Anthony Vilarim Caliani
 * @contact   https://github.com/avcaliani
 * 
 * @Description
 * Product Routes.
 */
const Express = require('express');
const Router = Express.Router();
const Response = require('../response');

const AuthHandler = require('../middlewares/auth.handler')
const FileHandler = require('../middlewares/file-upload.handler');

const ProductController = require('../controllers/product.controller');

Router.get('/', (request, response, next) => {
  ProductController.findAll().then(
    products => Response.ok(response, products),
    err => Response.error(response, err)
  );
});

Router.get('/:id', (request, response, next) => {
  ProductController.find(request.params.id).then(
    products => Response.ok(response, products),
    err => Response.error(response, err)
  );
})

Router.post('/', AuthHandler, FileHandler.upload.single('image'), (request, response, next) => {
  
  if (typeof request.file === 'undefined')
    return Response.error(response, 'Invalid file.')

  const product = {
    name: request.body.name,
    price: request.body.price,
    image: request.file.path
  };

  ProductController.save(product).then(
    product => Response.ok(response, product, 201),
    err => Response.error(response, err)
  );
});

Router.patch('/:id', AuthHandler, (request, response, next) => {

  if (!Array.isArray(request.body))
    return Response.error(response, 'Invalid product body.');

  const data = {};
  for (const prop of request.body)
    data[prop.name] = prop.value;

  ProductController.update(request.params.id, data).then(
    status => Response.ok(response, status),
    err => Response.error(response, err)
  );
});

Router.delete('/:id', AuthHandler, (request, response, next) => {
  ProductController.remove(request.params.id).then(
    status => Response.ok(response, status),
    err => Response.error(response, err)
  );
});

module.exports = Router;
