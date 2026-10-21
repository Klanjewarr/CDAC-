// ─────────────────────────────────────────────────────────
// src/controllers/transactionController.js — Request Handlers
// ─────────────────────────────────────────────────────────
// Each function handles ONE type of API request.
// They receive (req, res), talk to MySQL, and send JSON.
// All SQL uses parameterized queries (? placeholders)
// to prevent SQL injection attacks.
// ─────────────────────────────────────────────────────────

const pool = require('../config/db');

// ─────────────────────────────────────────────
// GET /api/transactions
// Fetch all transactions, newest first
// ─────────────────────────────────────────────
exports.getAllTransactions = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM transactions ORDER BY transaction_date DESC, created_at DESC'
        );
        res.json({ success: true, count: rows.length, data: rows });
    } catch (error) {
        console.error('Error fetching transactions:', error.message);
        res.status(500).json({ success: false, message: 'Failed to fetch transactions' });
    }
};

// ─────────────────────────────────────────────
// GET /api/transactions/:id
// Fetch a single transaction by its ID
// ─────────────────────────────────────────────
exports.getTransactionById = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM transactions WHERE id = ?',
            [req.params.id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Transaction not found' });
        }

        res.json({ success: true, data: rows[0] });
    } catch (error) {
        console.error('Error fetching transaction:', error.message);
        res.status(500).json({ success: false, message: 'Failed to fetch transaction' });
    }
};

// ─────────────────────────────────────────────
// POST /api/transactions
// Create a new transaction
// ─────────────────────────────────────────────
exports.createTransaction = async (req, res) => {
    try {
        const { title, amount, type, category, payment_method, transaction_date } = req.body;

        const [result] = await pool.query(
            `INSERT INTO transactions (title, amount, type, category, payment_method, transaction_date)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [title, amount, type, category, payment_method, transaction_date]
        );

        // Fetch the newly created row to return it
        const [newRow] = await pool.query(
            'SELECT * FROM transactions WHERE id = ?',
            [result.insertId]
        );

        res.status(201).json({ success: true, data: newRow[0] });
    } catch (error) {
        console.error('Error creating transaction:', error.message);
        res.status(500).json({ success: false, message: 'Failed to create transaction' });
    }
};

// ─────────────────────────────────────────────
// PUT /api/transactions/:id
// Update an existing transaction
// ─────────────────────────────────────────────
exports.updateTransaction = async (req, res) => {
    try {
        // First check if transaction exists
        const [existing] = await pool.query(
            'SELECT id FROM transactions WHERE id = ?',
            [req.params.id]
        );

        if (existing.length === 0) {
            return res.status(404).json({ success: false, message: 'Transaction not found' });
        }

        const { title, amount, type, category, payment_method, transaction_date } = req.body;

        await pool.query(
            `UPDATE transactions 
             SET title = ?, amount = ?, type = ?, category = ?, payment_method = ?, transaction_date = ?
             WHERE id = ?`,
            [title, amount, type, category, payment_method, transaction_date, req.params.id]
        );

        // Fetch the updated row
        const [updated] = await pool.query(
            'SELECT * FROM transactions WHERE id = ?',
            [req.params.id]
        );

        res.json({ success: true, data: updated[0] });
    } catch (error) {
        console.error('Error updating transaction:', error.message);
        res.status(500).json({ success: false, message: 'Failed to update transaction' });
    }
};

// ─────────────────────────────────────────────
// DELETE /api/transactions/:id
// Delete a transaction permanently
// ─────────────────────────────────────────────
exports.deleteTransaction = async (req, res) => {
    try {
        const [existing] = await pool.query(
            'SELECT id FROM transactions WHERE id = ?',
            [req.params.id]
        );

        if (existing.length === 0) {
            return res.status(404).json({ success: false, message: 'Transaction not found' });
        }

        await pool.query('DELETE FROM transactions WHERE id = ?', [req.params.id]);

        res.json({ success: true, message: 'Transaction deleted successfully' });
    } catch (error) {
        console.error('Error deleting transaction:', error.message);
        res.status(500).json({ success: false, message: 'Failed to delete transaction' });
    }
};

// ─────────────────────────────────────────────
// GET /api/dashboard
// Calculate summary stats from real DB records
// ─────────────────────────────────────────────
exports.getDashboardSummary = async (req, res) => {
    try {
        const now  = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;   // JS months are 0-based

        // ── Monthly expense total ──
        const [expRows] = await pool.query(
            `SELECT COALESCE(SUM(amount), 0) AS total
             FROM transactions
             WHERE type = 'expense'
               AND YEAR(transaction_date) = ?
               AND MONTH(transaction_date) = ?`,
            [year, month]
        );

        // ── Monthly income total ──
        const [incRows] = await pool.query(
            `SELECT COALESCE(SUM(amount), 0) AS total
             FROM transactions
             WHERE type = 'income'
               AND YEAR(transaction_date) = ?
               AND MONTH(transaction_date) = ?`,
            [year, month]
        );

        // ── Category-wise expense breakdown ──
        const [catRows] = await pool.query(
            `SELECT category, SUM(amount) AS total
             FROM transactions
             WHERE type = 'expense'
               AND YEAR(transaction_date) = ?
               AND MONTH(transaction_date) = ?
             GROUP BY category
             ORDER BY total DESC`,
            [year, month]
        );

        // ── Daily spending for the chart (last 30 days) ──
        const [dailyRows] = await pool.query(
            `SELECT DATE(transaction_date) AS date, SUM(amount) AS total
             FROM transactions
             WHERE type = 'expense'
               AND transaction_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
             GROUP BY DATE(transaction_date)
             ORDER BY date`
        );

        // ── Transaction count for current month ──
        const [countRows] = await pool.query(
            `SELECT COUNT(*) AS total
             FROM transactions
             WHERE YEAR(transaction_date) = ?
               AND MONTH(transaction_date) = ?`,
            [year, month]
        );

        const totalExpense = Number(expRows[0].total);
        const totalIncome  = Number(incRows[0].total);
        const daysElapsed  = now.getDate();   // e.g. 20th → 20

        res.json({
            success: true,
            data: {
                totalExpense,
                totalIncome,
                balance:        totalIncome - totalExpense,
                dailyAverage:   daysElapsed > 0 ? Math.round(totalExpense / daysElapsed) : 0,
                transactionCount: countRows[0].total,
                categoryBreakdown: catRows.map(r => ({
                    category: r.category,
                    total:    Number(r.total)
                })),
                dailySpending: dailyRows.map(r => ({
                    date:  r.date,
                    total: Number(r.total)
                })),
                month,
                year
            }
        });
    } catch (error) {
        console.error('Error fetching dashboard:', error.message);
        res.status(500).json({ success: false, message: 'Failed to fetch dashboard data' });
    }
};
