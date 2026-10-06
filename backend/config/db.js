const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool(process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL, ssl: process.env.PGSSLMODE === 'require' ? { rejectUnauthorized: false } : undefined }
  : {
      host: process.env.PGHOST || '127.0.0.1',
      port: Number(process.env.PGPORT || 5432),
      database: process.env.PGDATABASE || 'pharmacy_db',
      user: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD,
    });

const connectDB = async () => {
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  await pool.query(schema);
  await pool.query('SELECT 1');
  console.log('PostgreSQL connected and schema is ready');
};

module.exports = { pool, connectDB };
