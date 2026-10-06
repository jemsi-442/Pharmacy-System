const { pool } = require('../config/db');
const bcrypt = require('bcryptjs');

exports.getUsers = async (_req, res) => {
  try { const { rows } = await pool.query('SELECT id AS "_id", name, email, role, created_at AS "createdAt" FROM users ORDER BY created_at DESC'); return res.json(rows); }
  catch (error) { return res.status(500).json({ message: error.message }); }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email, and password are required' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await pool.query('INSERT INTO users (name,email,password,role) VALUES ($1,$2,$3,COALESCE($4,\'pharmacist\')) RETURNING id AS "_id", name, email, role, created_at AS "createdAt"', [name, email, hashedPassword, role || null]);
    return res.status(201).json(rows[0]);
  } catch (error) { return res.status(error.code === '23505' ? 409 : 400).json({ message: error.code === '23505' ? 'Email already registered' : error.message }); }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    const { rows } = await pool.query(`UPDATE users SET name=COALESCE($1,name), email=COALESCE($2,email), role=COALESCE($3,role), password=COALESCE($4,password), updated_at=NOW()
      WHERE id=$5 RETURNING id AS "_id", name, email, role, created_at AS "createdAt"`, [name || null, email || null, role || null, password ? await bcrypt.hash(password, 10) : null, req.params.id]);
    if (!rows[0]) return res.status(404).json({ message: 'User not found' });
    return res.json(rows[0]);
  } catch (error) { return res.status(error.code === '23505' ? 409 : 400).json({ message: error.message }); }
};

exports.deleteUser = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM users WHERE id=$1', [req.params.id]);
    if (!result.rowCount) return res.status(404).json({ message: 'User not found' });
    return res.json({ message: 'User deleted' });
  } catch (error) { return res.status(400).json({ message: error.message }); }
};

exports.getAccessLogs = async (_req, res) => {
  try { const { rows } = await pool.query('SELECT id AS "_id", username, action, status, ip_address AS "ipAddress", created_at AS "createdAt" FROM access_logs ORDER BY created_at DESC'); return res.json(rows); }
  catch (error) { return res.status(500).json({ message: error.message }); }
};

exports.createAccessLog = async (req, res) => {
  try {
    const { username, action, status, ipAddress } = req.body;
    const { rows } = await pool.query('INSERT INTO access_logs (username, action, status, ip_address) VALUES ($1,$2,$3,$4) RETURNING id AS "_id", username, action, status, ip_address AS "ipAddress", created_at AS "createdAt"', [username, action, status, ipAddress || req.ip]);
    return res.status(201).json(rows[0]);
  } catch (error) { return res.status(400).json({ message: error.message }); }
};

exports.deleteAccessLog = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM access_logs WHERE id=$1', [req.params.id]);
    if (!result.rowCount) return res.status(404).json({ message: 'Log not found' });
    return res.json({ message: 'Log deleted' });
  } catch (error) { return res.status(400).json({ message: error.message }); }
};
