const express = require('express');
const router = express.Router();

const { create } = require('../controllers/brand');
const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.post('/brand/create/:userId', requireSignIn, isAuth, isAdmin, create);

router.param('userId', userById);

module.exports = router;
