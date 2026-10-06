const { pool } = require('../config/db');

const fields = 'id AS "_id", name, brand, batch, expiry_date AS "expiryDate", quantity, price, created_at AS "createdAt", updated_at AS "updatedAt"';
const values = (body) => [body.name, body.brand || 'Generic', body.batch || null, body.expiryDate, Number(body.quantity || 0), Number(body.price)];

exports.createMedicine = async (req, res) => {
  try {
    const { rows } = await pool.query(`INSERT INTO medicines (name, brand, batch, expiry_date, quantity, price) VALUES ($1,$2,$3,$4,$5,$6) RETURNING ${fields}`, values(req.body));
    if (rows[0].quantity < 10) console.warn(`Low stock alert: ${rows[0].name} (${rows[0].quantity} left)`);
    return res.status(201).json(rows[0]);
  } catch (error) { return res.status(400).json({ message: error.message }); }
};

exports.getMedicines = async (_req, res) => {
  try { const { rows } = await pool.query(`SELECT ${fields} FROM medicines ORDER BY name ASC`); return res.json(rows); }
  catch (error) { return res.status(500).json({ message: error.message }); }
};

exports.getMedicine = async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT ${fields} FROM medicines WHERE id = $1`, [req.params.id]);
    if (!rows[0]) return res.status(404).json({ message: 'Not found' });
    return res.json(rows[0]);
  } catch (error) { return res.status(400).json({ message: error.message }); }
};

exports.updateMedicine = async (req, res) => {
  try {
    const { rows } = await pool.query(`UPDATE medicines SET name=$1, brand=$2, batch=$3, expiry_date=$4, quantity=$5, price=$6, updated_at=NOW() WHERE id=$7 RETURNING ${fields}`,
      [...values(req.body), req.params.id]);
    if (!rows[0]) return res.status(404).json({ message: 'Not found' });
    if (rows[0].quantity < 10) console.warn(`Low stock alert: ${rows[0].name} (${rows[0].quantity} left)`);
    return res.json(rows[0]);
  } catch (error) { return res.status(400).json({ message: error.message }); }
};

exports.deleteMedicine = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM medicines WHERE id = $1', [req.params.id]);
    if (!result.rowCount) return res.status(404).json({ message: 'Not found' });
    return res.json({ message: 'Deleted' });
  } catch (error) { return res.status(400).json({ message: error.message }); }
};
