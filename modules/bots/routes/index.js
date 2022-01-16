const router = require('express').Router();
const BotsController = require('../controllers/bots.controller');
const $ = require('express-async-handler');

router.post('/', $(BotsController.bot));

module.exports = router;