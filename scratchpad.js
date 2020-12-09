import mongoose from 'mongoose';
import connectDB from './backend/config/db.js';

connectDB();
let db = mongoose.connection;

const userSchema = new mongoose.Schema({
	phone: {
		type: String,
		validate: {
			validator: function (v) {
				return /\d{3}-\d{3}-\d{4}/.test(v);
			},
			message: props => `${props.value} is not a valid phone number!`,
		},
		required: [true, 'User phone number required'],
	},
});

const User = db.model('user', userSchema);
const user = new User();
let error;

user.phone = '';
user.save();
error = user.validateSync();
assert.equal(
	error.errors['phone'].message,
	'555.0123 is not a valid phone number!'
);

user.phone = '';
error = user.validateSync();
assert.equal(error.errors['phone'].message, 'User phone number required');

user.phone = '201-555-0123';
// Validation succeeds! Phone number is defined
// and fits `DDD-DDD-DDDD`
error = user.validateSync();
assert.equal(error, null);
