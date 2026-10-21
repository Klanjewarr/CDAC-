// ─────────────────────────────────────────────────────────
// server.js — Express Application Entry Point
// ─────────────────────────────────────────────────────────
// Start with:  node server.js       (or: npm start)
// Dev mode:    npm run dev          (auto-restarts on changes)
// ─────────────────────────────────────────────────────────

const express = require('express');
const cors    = require('cors');
const path    = require('path');
require('dotenv').config();

const pool              = require('./src/config/db');
const transactionRoutes = require('./src/routes/transactionRoutes');
const { getDashboardSummary } = require('./src/controllers/transactionController');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────────────
app.use(express.json());                                  // parse JSON bodies
app.use(cors());                                          // allow cross-origin requests
app.use(express.static(path.join(__dirname, 'public')));  // serve frontend files

// ── API Routes ─────────────────────────────────────────
app.get('/api/health', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS result');
        res.json({
            status:   'ok',
            message:  'Server is running and database is connected',
            database: 'connected',
            dbTest:   rows[0].result
        });
    } catch (error) {
        console.error('Health check failed:', error.message);
        res.status(500).json({
            status:   'error',
            message:  'Server is running but database connection failed',
            database: 'disconnected',
            error:    error.message
        });
    }
});

app.use('/api/transactions', transactionRoutes);   // CRUD routes
app.get('/api/dashboard', getDashboardSummary);     // Dashboard summary

// ── Start Server ───────────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n🟢 Expense Tracker server running at http://localhost:${PORT}`);
    console.log(`   Health:       http://localhost:${PORT}/api/health`);
    console.log(`   Dashboard:    http://localhost:${PORT}/api/dashboard`);
    console.log(`   Transactions: http://localhost:${PORT}/api/transactions\n`);
});
