const Brand = require('../models/brand');
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
