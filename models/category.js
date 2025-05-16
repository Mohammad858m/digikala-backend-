const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  slug: { type: String, unique: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  icon: String
}, { timestamps: true });

 const categoryModel = mongoose.model('Category', categorySchema);

module.exports = categoryModel;

