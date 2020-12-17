import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      //doesn't need to be required because might not have is using OAuth
      type: String,
    },
    googleId: String,
    defaultShipAddr: mongoose.Schema.Types.ObjectId,
    defaultBillAddr: mongoose.Schema.Types.ObjectId,
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, //an existing admin has to to make another user an admin
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
