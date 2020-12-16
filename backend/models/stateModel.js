import mongoose from 'mongoose';

const stateSchema = mongoose.Schema({
  abbreviation: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const State = mongoose.Model('State', stateSchema);

export default State;
