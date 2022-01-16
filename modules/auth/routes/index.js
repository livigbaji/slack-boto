const router = require('express').Router();
const AuthController = require('../controllers/auth.controller');
const $ = require('express-async-handler');

router.post('/callback', $(AuthController.callback));

module.exports = router;