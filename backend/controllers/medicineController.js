const Medicine = require('../models/medicineModel');


exports.createMedicine = async (req, res) => {
try {
const med = await Medicine.create(req.body);
res.status(201).json(med);
} catch (err) {
res.status(500).json({ message: err.message });
}
};


exports.getMedicines = async (req, res) => {
try {
const list = await Medicine.find().sort({ name: 1 });
res.json(list);
} catch (err) {
res.status(500).json({ message: err.message });
}
};


exports.getMedicine = async (req, res) => {
try {
const med = await Medicine.findById(req.params.id);
if (!med) return res.status(404).json({ message: 'Not found' });
res.json(med);
} catch (err) {
res.status(500).json({ message: err.message });
}
};


exports.updateMedicine = async (req, res) => {
try {
const med = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
res.json(med);
} catch (err) {
res.status(500).json({ message: err.message });
}
};


exports.deleteMedicine = async (req, res) => {
try {
await Medicine.findByIdAndDelete(req.params.id);
res.json({ message: 'Deleted' });
} catch (err) {
res.status(500).json({ message: err.message });
}
};