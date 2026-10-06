const { pool } = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
const publicUser = (user) => ({ _id: user.id, name: user.name, email: user.email, role: user.role });

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
  const client = await pool.connect();
  let inTransaction = false;
  try {
    await client.query('BEGIN');
    inTransaction = true;
    // Allow public setup only for the first account, and serialize concurrent setup requests.
    await client.query('SELECT pg_advisory_xact_lock(734921)');
    const { rows: existingUsers } = await client.query('SELECT id FROM users LIMIT 1');
    if (existingUsers.length) {
      await client.query('ROLLBACK');
      inTransaction = false;
      return res.status(403).json({ success: false, message: 'Initial setup is complete. Ask an admin to create accounts.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await client.query(
      `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, 'admin')
       RETURNING id, name, email, role`, [name, email, hashedPassword]
    );
    const user = rows[0];
    await client.query('COMMIT');
    inTransaction = false;
    return res.status(201).json({ success: true, data: { token: generateToken(user.id), user: publicUser(user) } });
  } catch (error) {
    if (inTransaction) await client.query('ROLLBACK');
    const duplicate = error.code === '23505';
    return res.status(duplicate ? 409 : 400).json({ success: false, message: duplicate ? 'Email already registered' : error.message });
  } finally { client.release(); }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { rows } = await pool.query('SELECT id, name, email, role, password FROM users WHERE email = $1', [email]);
    const user = rows[0];
    if (!user || !(await bcrypt.compare(password || '', user.password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    return res.json({ success: true, data: { token: generateToken(user.id), user: publicUser(user) } });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { registerUser, loginUser };
