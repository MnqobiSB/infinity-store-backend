const Brand = require('../models/brand');
const { errorHandler } = require('../helpers/dbErrorHandler');

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
