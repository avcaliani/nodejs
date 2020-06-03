const router = require('express').Router();
const auth = require('../../middlewares/auth.handler');
const upload = require('../../middlewares/upload.handler');

const controller = require('./product.controller');

router.get('/', controller.find);
router.get('/:id', controller.findOne);
router.post('/', auth, upload.single('image'), controller.save);
router.patch('/:id', auth, controller.update);
router.delete('/:id', auth, controller.delete);

module.exports = router;