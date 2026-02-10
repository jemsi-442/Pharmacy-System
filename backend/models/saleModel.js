const mongoose = require('mongoose');


const saleSchema = new mongoose.Schema({
medicines: [
{
medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
qty: Number,
priceAtSale: Number
}
],
total: Number,
cashier: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });


module.exports = mongoose.model('Sale', saleSchema);