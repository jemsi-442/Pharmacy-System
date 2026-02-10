const User = require('../models/userModel');
const AccessLog = require('../models/accessLogModel');
const bcrypt = require('bcryptjs');

// --- USERS ---
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.json(users);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });
        res.status(201).json(user);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err) { res.status(500).json({ message: err.message }); }
};

// --- ACCESS LOGS ---
exports.getAccessLogs = async (req, res) => {
    try {
        const logs = await AccessLog.find().sort({ createdAt: -1 });
        res.json(logs);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createAccessLog = async (req, res) => {
    try {
        const log = await AccessLog.create(req.body);
        res.status(201).json(log);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteAccessLog = async (req, res) => {
    try {
        await AccessLog.findByIdAndDelete(req.params.id);
        res.json({ message: 'Log deleted' });
    } catch (err) { res.status(500).json({ message: err.message }); }
};
