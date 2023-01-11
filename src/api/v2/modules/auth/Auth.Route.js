const express = require('express');
const { register, login, getMe, loginApp } = require('./Auth.Controller');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/login_app', loginApp);
router.get('/me', getMe);

module.exports = router;
