const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  phone: { 
    type: String,
    match: [/^09\d{9}$/, 'شماره موبایل باید با 09 شروع شود و 11 رقم باشد']
  },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  addresses: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
  isComplete: { type: Boolean, default: false }  
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
