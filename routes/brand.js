const express = require('express');
const router = express.Router();

const {
	create,
	brandById,
	read,
	update,
	remove,
	list
} = require('../controllers/brand');
const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/brand/:brandId', read);
router.post('/brand/create/:userId', requireSignIn, isAuth, isAdmin, create);
router.put('/brand/:brandId/:userId', requireSignIn, isAuth, isAdmin, update);
router.delete(
	'/brand/:brandId/:userId',
	requireSignIn,
	isAuth,
	isAdmin,
	remove
);
router.get('/brands', list);

router.param('brandId', brandById);
router.param('userId', userById);

module.exports = router;
