const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const salesCtrl = require('../controllers/salesController');


router.get('/', auth, salesCtrl.getSales);
router.post('/', auth, salesCtrl.createSale);


module.exports = router;