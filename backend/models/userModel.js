import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  // Will also run when updating profile, but only want to rehash if
  // the password field is being updated. Otherwise wouldn't be able to login
  // after updating something else like name.
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
