const mongoose = require('mongoose');
const orderSchema = new mongoose.
Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  address: { type: Schema.Types.ObjectId, ref: 'Address' },
  items: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    priceAtPurchase: Number
  }],
  status: {
    type: String,
    enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: { type: String, enum: ['online', 'cod'], default: 'online' },
  paidAt: Date,
  totalPrice: Number
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
