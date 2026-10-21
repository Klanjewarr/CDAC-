// ─────────────────────────────────────────────────────────
// src/config/db.js — MySQL Connection Pool
// ─────────────────────────────────────────────────────────
// WHY a pool instead of a single connection?
//   A pool keeps several connections ready. When your app
//   needs to talk to MySQL, it borrows one from the pool,
//   uses it, and returns it. This is faster and more
//   reliable than opening/closing connections repeatedly.
// ─────────────────────────────────────────────────────────

const mysql = require('mysql2/promise');   // promise-based API
require('dotenv').config();               // loads .env variables

const pool = mysql.createPool({
    host:     process.env.DB_HOST || 'localhost',
    user:     process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'expense_tracker_db',
    port:     process.env.DB_PORT || 3306,

    // Pool settings
    waitForConnections: true,   // queue requests when all connections are busy
    connectionLimit:    10,     // max simultaneous connections
    queueLimit:         0       // unlimited queue (0 = no limit)
});

module.exports = pool;
