import mongoose from 'mongoose';
import Address from './addressModel.js';

const orderItem = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  qty: Number,
  salePrice: Number,
});

const orderSchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderItems: {
      type: [orderItem],
      required: true,
    },
    addrShip: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    addrBill: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    orderPhone: {
      type: String,
      validate: {
        validator: (v) =>
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(v),
        msg: '{VALUE} is not a valid phone number!',
      },
    },
    subPrice: {
      type: Number,
      required: true,
      //store as cents
      set: (num) => num * 100,
      //convert to formatted price in cents to number with 2 decimal places when retrieving
      get: (num) => (num / 100).toFixed(2),
    },
    shipPrice: {
      type: Number,
      required: true,
      //store as cents
      set: (num) => num * 100,
      //convert to formatted price in cents to number with 2 decimal places when retrieving
      get: (num) => (num / 100).toFixed(2),
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0,
      //store as cents
      set: (num) => num * 100,
      //convert to formatted price in cents to number with 2 decimal places when retrieving
      get: (num) => (num / 100).toFixed(2),
    },

    totalPrice: {
      type: Number,
      required: true,
      //store as cents
      set: (num) => num * 100,
      //convert to formatted price in cents to number with 2 decimal places when retrieving
      get: (num) => (num / 100).toFixed(2),
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      payment_email: String,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidTime: Date,

    tracking: {
      trackingNumber: String,
      trackingURL: String,
      latestStatus: String,
    },

    isDelivered: Boolean,
    deliverTime: Date,
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
