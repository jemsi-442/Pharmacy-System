const mongoose = require('mongoose');

const accessLogSchema = new mongoose.Schema({
    username: { type: String, required: true },
    action: { type: String, required: true },
    status: { type: String, enum: ['success','failure'], required: true },
    ipAddress: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('AccessLog', accessLogSchema);
