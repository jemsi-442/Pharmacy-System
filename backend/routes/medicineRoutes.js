const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  getMedicines,
  createMedicine,
  getMedicine,
  updateMedicine,
  deleteMedicine
} = require('../controllers/medicineController');

// ALL ROUTES ARE PROTECTED BY JWT
router.get('/', protect, getMedicines);        // Get all medicines
router.post('/', protect, createMedicine);     // Add new medicine
router.get('/:id', protect, getMedicine);      // Get single medicine
router.put('/:id', protect, updateMedicine);   // Update medicine
router.delete('/:id', protect, deleteMedicine);// Delete medicine

module.exports = router;
