const { pool } = require('../config/db');

exports.createSale = async (req, res) => {
  const items = req.body.medicines;
  if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ message: 'Add at least one medicine to the sale' });
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const cashierId = req.user.id;
    const { rows: saleRows } = await client.query('INSERT INTO sales (cashier_id) VALUES ($1) RETURNING id, created_at', [cashierId]);
    const sale = saleRows[0];
    const saleItems = [];
    let total = 0;
    for (const item of items) {
      const qty = Number(item.qty);
      if (!Number.isInteger(qty) || qty < 1) throw new Error('Quantity must be a positive whole number');
      const result = await client.query('SELECT id, name, brand, batch, expiry_date, quantity, price FROM medicines WHERE id=$1 FOR UPDATE', [item.medicine]);
      const medicine = result.rows[0];
      if (!medicine) throw new Error('Medicine not found');
      if (medicine.quantity < qty) throw new Error(`Insufficient stock for ${medicine.name}`);
      const updated = await client.query('UPDATE medicines SET quantity=quantity-$1, updated_at=NOW() WHERE id=$2 RETURNING quantity', [qty, medicine.id]);
      await client.query('INSERT INTO sale_items (sale_id, medicine_id, qty, price_at_sale) VALUES ($1,$2,$3,$4)', [sale.id, medicine.id, qty, medicine.price]);
      const medicineRecord = { _id: medicine.id, name: medicine.name, brand: medicine.brand, batch: medicine.batch, expiryDate: medicine.expiry_date, quantity: updated.rows[0].quantity, price: medicine.price };
      saleItems.push({ medicine: medicineRecord, qty, priceAtSale: Number(medicine.price) });
      total += qty * Number(medicine.price);
    }
    const updatedSale = await client.query('UPDATE sales SET total=$1 WHERE id=$2 RETURNING created_at', [total, sale.id]);
    await client.query('COMMIT');
    return res.status(201).json({ _id: sale.id, medicines: saleItems, total, cashier: { _id: req.user.id, name: req.user.name, email: req.user.email }, createdAt: updatedSale.rows[0].created_at });
  } catch (error) {
    await client.query('ROLLBACK');
    return res.status(400).json({ message: error.message });
  } finally { client.release(); }
};

exports.getSales = async (_req, res) => {
  try {
    const { rows } = await pool.query(`SELECT s.id AS sale_id, s.total, s.created_at,
      u.id AS cashier_id, u.name AS cashier_name, u.email AS cashier_email,
      si.id AS item_id, si.qty, si.price_at_sale,
      m.id AS medicine_id, m.name AS medicine_name, m.brand, m.batch, m.expiry_date, m.quantity, m.price
      FROM sales s LEFT JOIN users u ON u.id=s.cashier_id
      LEFT JOIN sale_items si ON si.sale_id=s.id LEFT JOIN medicines m ON m.id=si.medicine_id
      ORDER BY s.created_at DESC, si.id ASC`);
    const salesById = new Map();
    for (const row of rows) {
      if (!salesById.has(row.sale_id)) salesById.set(row.sale_id, {
        _id: row.sale_id, total: Number(row.total), createdAt: row.created_at,
        cashier: row.cashier_id ? { _id: row.cashier_id, name: row.cashier_name, email: row.cashier_email } : null,
        medicines: [],
      });
      if (row.item_id) salesById.get(row.sale_id).medicines.push({
        medicine: { _id: row.medicine_id, name: row.medicine_name, brand: row.brand, batch: row.batch, expiryDate: row.expiry_date, quantity: row.quantity, price: row.price },
        qty: row.qty, priceAtSale: Number(row.price_at_sale),
      });
    }
    return res.json([...salesById.values()]);
  } catch (error) { return res.status(500).json({ message: error.message }); }
};
