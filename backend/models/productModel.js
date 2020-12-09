import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
			validate: {
				//review must be whole number between 1 and 5
				validator: val => val.isInteger() >= 1 && val <= 5,
				msg: `Rating must be an integer between 1 and 5`,
			},
		},
		title: {
			type: String,
			required: true,
		},
		body: String,
	},
	{ timestamps: true }
);

const productSchema = mongoose.Schema(
	{
		user: {
			//sets which admin created the product
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: {
			type: String,
			required: true,
			unique: true,
		},
		image: {
			type: String,
			required: false,
		},
		description: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
			//store as cents
			set: num => num * 100,
			//convert to formatted number to 2 decimal places when retrieving
			get: num => (num / 100).toFixed(2),
		},
		countInStock: {
			type: Number,
			required: false,
			default: 0,
		},
		isAvailable: {
			type: Boolean,
			required: true,
		},
		reviews: {
			type: [reviewSchema],
		},
	},
	{ timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
