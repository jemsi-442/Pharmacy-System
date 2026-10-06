const express = require('express');
const router = express.Router();
const { getUsers, createUser, updateUser, deleteUser, getAccessLogs, createAccessLog, deleteAccessLog } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');
router.use(protect, adminOnly);

// USERS
router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// ACCESS LOGS
router.get('/access-log', getAccessLogs);
router.post('/access-log', createAccessLog);
router.delete('/access-log/:id', deleteAccessLog);

module.exports = router;
