const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  items: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number
  }]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
