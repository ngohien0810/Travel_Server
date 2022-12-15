const express = require('express');
const { register, login, getMe } = require('./Auth.Controller');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', getMe);

module.exports = router;
