const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  description: String,
  images: [String],
  price: Number,
  inStock: Boolean,
  category: { type:mongoose.Schema.Types.ObjectId, ref: 'Category' },
  tags: [String],
  brand: String,
  isPublished: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
