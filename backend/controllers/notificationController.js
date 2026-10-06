const { pool } = require('../config/db');

const getNotifications = async (_req, res) => {
  try { const { rows } = await pool.query('SELECT id AS "_id", title, message, read, created_at AS "createdAt", updated_at AS "updatedAt" FROM notifications ORDER BY created_at DESC'); return res.json(rows); }
  catch (error) { return res.status(500).json({ message: error.message }); }
};

const createNotification = async (req, res) => {
  try {
    const { rows } = await pool.query('INSERT INTO notifications (title, message) VALUES ($1,$2) RETURNING id AS "_id", title, message, read, created_at AS "createdAt", updated_at AS "updatedAt"', [req.body.title, req.body.message]);
    return res.status(201).json(rows[0]);
  } catch (error) { return res.status(400).json({ message: error.message }); }
};

const deleteNotification = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM notifications WHERE id=$1', [req.params.id]);
    if (!result.rowCount) return res.status(404).json({ message: 'Notification not found' });
    return res.json({ message: 'Notification deleted' });
  } catch (error) { return res.status(400).json({ message: error.message }); }
};

module.exports = { getNotifications, createNotification, deleteNotification };
