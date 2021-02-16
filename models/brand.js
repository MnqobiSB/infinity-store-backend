const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			maxlength: 32
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Brand', brandSchema);
