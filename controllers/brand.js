const Brand = require('../models/brand');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.brandById = (req, res, next, id) => {
	Brand.findById(id).exec((err, brand) => {
		if (err || !brand) {
			return res.status(400).json({
				error: 'Brand does not exist'
			});
		}
		req.brand = brand;
		next();
	});
};

exports.create = (req, res) => {
	const brand = new Brand(req.body);
	brand.save((err, data) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler(err)
			});
		}
		res.json({ data });
	});
};

exports.read = (req, res) => {
	return res.json(req.brand);
};

exports.update = (req, res) => {
	console.log('req.body', req.body);
	console.log('brand update param', req.params.brandId);

	const brand = req.brand;
	brand.name = req.body.name;
	brand.save((err, data) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler(err)
			});
		}
		res.json(data);
	});
};

exports.remove = (req, res) => {
	const brand = req.brand;
	Product.find({ brand }).exec((err, data) => {
		if (data.length >= 1) {
			return res.status(400).json({
				message: `Sorry. You cant delete ${brand.name}. It has ${data.length} associated products.`
			});
		} else {
			brand.remove((err, data) => {
				if (err) {
					return res.status(400).json({
						error: errorHandler(err)
					});
				}
				res.json({
					message: 'Brand deleted'
				});
			});
		}
	});
};

exports.list = (req, res) => {
	Brand.find().exec((err, data) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler(err)
			});
		}
		res.json(data);
	});
};
