import mongoose from 'mongoose';
import State from './State';

const addressSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    requird: true,
  },
  companyName: String,
  streetLines: {
    type: [String],
    required: true,
    validate: [streetLineLimit, `Limited to 4 {PATH}`],
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'State',
  },
});

function streetLineLimit(val) {
  return val <= 4;
}

const Address = mongoose.Model('Address', addressSchema);

export default Address;
