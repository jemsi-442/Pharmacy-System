const Sale = require('../models/saleModel');
const Medicine = require('../models/medicineModel');


exports.createSale = async (req, res) => {
try {
const { medicines, cashier } = req.body; // medicines: [{ medicine, qty }]


// ensure stock & compute total
let total = 0;
for (const item of medicines) {
const med = await Medicine.findById(item.medicine);
if (!med) return res.status(400).json({ message: 'Medicine not found' });
if (med.quantity < item.qty) return res.status(400).json({ message: `Insufficient stock for ${med.name}` });
med.quantity -= item.qty;
await med.save();
total += (item.qty * med.price);
item.priceAtSale = med.price;
}


const sale = await Sale.create({ medicines, total, cashier });
res.status(201).json(sale);
} catch (err) {
res.status(500).json({ message: err.message });
}
};


exports.getSales = async (req, res) => {
try {
const sales = await Sale.find().populate('medicines.medicine').populate('cashier', 'name email');
res.json(sales);
} catch (err) {
res.status(500).json({ message: err.message });
}
};