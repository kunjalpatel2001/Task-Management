const express = require('express');
const Midal = require('../Middleware/login');
const SignUp = require("../controllers/signup")

const router = express.Router();

router.post('/signup', Midal.signupmidal, SignUp.signup)
router.post('/signin', SignUp.login)


module.exports = router