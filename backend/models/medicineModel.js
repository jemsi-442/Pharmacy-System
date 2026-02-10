const mongoose = require('mongoose');


const medicineSchema = new mongoose.Schema({
name: { type: String, required: true },
brand: String,
batch: String,
expiryDate: Date,
quantity: { type: Number, default: 0 },
price: { type: Number, required: true }
}, { timestamps: true });


module.exports = mongoose.model('Medicine', medicineSchema);