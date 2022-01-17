const router = require('express').Router();
const BotsController = require('../controllers/bots.controller');
const $ = require('express-async-handler');

router.post('/', $(BotsController.message));
router.get('/', $(BotsController.responses));

module.exports = router;