const mongoose = require('mongoose');


const addressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  province: String,
  city: String,
  postalCode: String,
  fullAddress: String,
  isDefault: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Address', addressSchema);
