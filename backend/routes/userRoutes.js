const express = require('express');
const router = express.Router();
const { getUsers, createUser, deleteUser, getAccessLogs, createAccessLog, deleteAccessLog } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

// USERS
router.get('/users', protect, getUsers);
router.post('/users', protect, createUser);
router.delete('/users/:id', protect, deleteUser);

// ACCESS LOGS
router.get('/access-log', protect, getAccessLogs);
router.post('/access-log', protect, createAccessLog);
router.delete('/access-log/:id', protect, deleteAccessLog);

module.exports = router;
