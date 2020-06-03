const router = require('express').Router();
const auth = require('../../middlewares/auth.handler');

const controller = require('./order.controller');

router.get('/', auth, controller.find);
router.get('/:id', auth, controller.findOne);
router.post('/', auth, controller.save);
router.delete('/:id', auth, controller.delete);

module.exports = router;