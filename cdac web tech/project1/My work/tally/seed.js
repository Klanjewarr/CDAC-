// ─────────────────────────────────────────────────────────
// seed.js — Insert dummy data into the database
// ─────────────────────────────────────────────────────────
// Run with:  node seed.js
// Make sure MySQL is running and .env is configured.
// ─────────────────────────────────────────────────────────

const mysql = require('mysql2/promise');
require('dotenv').config();

const dummyTransactions = [
    // ── Income ──────────────────────────────────────────
    { title: 'October Salary',            amount: 55000.00, type: 'income',  category: 'Salary',         payment_method: 'Bank transfer', transaction_date: '2026-10-01' },
    { title: 'Freelance logo design',     amount: 8000.00,  type: 'income',  category: 'Freelance',      payment_method: 'UPI',           transaction_date: '2026-10-05' },
    { title: 'Mutual fund dividend',      amount: 2500.00,  type: 'income',  category: 'Investment',     payment_method: 'Bank transfer', transaction_date: '2026-10-10' },
    { title: 'Freelance website project', amount: 12000.00, type: 'income',  category: 'Freelance',      payment_method: 'Bank transfer', transaction_date: '2026-10-15' },

    // ── Food & drinks ───────────────────────────────────
    { title: 'Coffee at Blue Tokai',      amount: 280.00,   type: 'expense', category: 'Food & drinks',  payment_method: 'UPI',           transaction_date: '2026-10-02' },
    { title: 'Lunch at Swiggy',           amount: 340.00,   type: 'expense', category: 'Food & drinks',  payment_method: 'UPI',           transaction_date: '2026-10-04' },
    { title: 'Dinner with friends',       amount: 1200.00,  type: 'expense', category: 'Food & drinks',  payment_method: 'Credit card',   transaction_date: '2026-10-07' },
    { title: 'Chai and samosa',           amount: 60.00,    type: 'expense', category: 'Food & drinks',  payment_method: 'Cash',          transaction_date: '2026-10-09' },
    { title: 'Zomato order - biryani',    amount: 450.00,   type: 'expense', category: 'Food & drinks',  payment_method: 'UPI',           transaction_date: '2026-10-12' },
    { title: 'Pizza party',               amount: 890.00,   type: 'expense', category: 'Food & drinks',  payment_method: 'Debit card',    transaction_date: '2026-10-18' },
    { title: 'Street food at market',     amount: 150.00,   type: 'expense', category: 'Food & drinks',  payment_method: 'Cash',          transaction_date: '2026-10-20' },

    // ── Transport ───────────────────────────────────────
    { title: 'Uber to office',            amount: 180.00,   type: 'expense', category: 'Transport',      payment_method: 'UPI',           transaction_date: '2026-10-03' },
    { title: 'Metro card recharge',       amount: 500.00,   type: 'expense', category: 'Transport',      payment_method: 'Debit card',    transaction_date: '2026-10-06' },
    { title: 'Auto rickshaw',             amount: 120.00,   type: 'expense', category: 'Transport',      payment_method: 'Cash',          transaction_date: '2026-10-11' },
    { title: 'Ola to mall',               amount: 250.00,   type: 'expense', category: 'Transport',      payment_method: 'UPI',           transaction_date: '2026-10-16' },
    { title: 'Petrol refill',             amount: 1500.00,  type: 'expense', category: 'Transport',      payment_method: 'Debit card',    transaction_date: '2026-10-19' },

    // ── Shopping ────────────────────────────────────────
    { title: 'Amazon - headphones',       amount: 2499.00,  type: 'expense', category: 'Shopping',       payment_method: 'Credit card',   transaction_date: '2026-10-04' },
    { title: 'Myntra - winter jacket',    amount: 1899.00,  type: 'expense', category: 'Shopping',       payment_method: 'Credit card',   transaction_date: '2026-10-13' },
    { title: 'Stationery from Crossword', amount: 350.00,   type: 'expense', category: 'Shopping',       payment_method: 'Cash',          transaction_date: '2026-10-17' },

    // ── Rent & bills ────────────────────────────────────
    { title: 'House rent - October',      amount: 15000.00, type: 'expense', category: 'Rent & bills',   payment_method: 'Bank transfer', transaction_date: '2026-10-01' },
    { title: 'Electricity bill',          amount: 1800.00,  type: 'expense', category: 'Rent & bills',   payment_method: 'UPI',           transaction_date: '2026-10-05' },
    { title: 'WiFi bill - Airtel',        amount: 799.00,   type: 'expense', category: 'Rent & bills',   payment_method: 'UPI',           transaction_date: '2026-10-05' },
    { title: 'Mobile recharge',           amount: 299.00,   type: 'expense', category: 'Rent & bills',   payment_method: 'UPI',           transaction_date: '2026-10-08' },

    // ── Entertainment ───────────────────────────────────
    { title: 'Movie ticket - PVR',        amount: 350.00,   type: 'expense', category: 'Entertainment',  payment_method: 'UPI',           transaction_date: '2026-10-06' },
    { title: 'Netflix subscription',      amount: 199.00,   type: 'expense', category: 'Subscriptions',  payment_method: 'Credit card',   transaction_date: '2026-10-01' },
    { title: 'Spotify Premium',           amount: 119.00,   type: 'expense', category: 'Subscriptions',  payment_method: 'Credit card',   transaction_date: '2026-10-01' },
    { title: 'BookMyShow - comedy gig',   amount: 600.00,   type: 'expense', category: 'Entertainment',  payment_method: 'UPI',           transaction_date: '2026-10-14' },

    // ── Healthcare ──────────────────────────────────────
    { title: 'Doctor consultation',       amount: 700.00,   type: 'expense', category: 'Healthcare',     payment_method: 'Cash',          transaction_date: '2026-10-08' },
    { title: 'Pharmacy - medicines',      amount: 480.00,   type: 'expense', category: 'Healthcare',     payment_method: 'UPI',           transaction_date: '2026-10-09' },
    { title: 'Gym membership - October',  amount: 1500.00,  type: 'expense', category: 'Healthcare',     payment_method: 'UPI',           transaction_date: '2026-10-02' },

    // ── Education ───────────────────────────────────────
    { title: 'Udemy course - Node.js',    amount: 449.00,   type: 'expense', category: 'Education',      payment_method: 'Credit card',   transaction_date: '2026-10-03' },
    { title: 'Books from Amazon',         amount: 650.00,   type: 'expense', category: 'Education',      payment_method: 'UPI',           transaction_date: '2026-10-10' },

    // ── Groceries ───────────────────────────────────────
    { title: 'BigBasket weekly groceries', amount: 2200.00,  type: 'expense', category: 'Groceries',     payment_method: 'UPI',           transaction_date: '2026-10-02' },
    { title: 'Vegetables from market',    amount: 350.00,   type: 'expense', category: 'Groceries',      payment_method: 'Cash',          transaction_date: '2026-10-07' },
    { title: 'D-Mart monthly supplies',   amount: 3500.00,  type: 'expense', category: 'Groceries',      payment_method: 'Debit card',    transaction_date: '2026-10-14' },
    { title: 'Fruits from vendor',        amount: 280.00,   type: 'expense', category: 'Groceries',      payment_method: 'Cash',          transaction_date: '2026-10-19' },

    // ── Investment ──────────────────────────────────────
    { title: 'SIP - HDFC Equity Fund',    amount: 5000.00,  type: 'expense', category: 'Investment',     payment_method: 'Bank transfer', transaction_date: '2026-10-05' },

    // ── Other ───────────────────────────────────────────
    { title: 'Gift for friend birthday',  amount: 800.00,   type: 'expense', category: 'Other',          payment_method: 'UPI',           transaction_date: '2026-10-11' },
    { title: 'Laundry service',           amount: 250.00,   type: 'expense', category: 'Other',          payment_method: 'Cash',          transaction_date: '2026-10-15' },
];

async function seed() {
    const dbName = process.env.DB_NAME || 'expense_tracker_db';

    // 1. Connect WITHOUT a database to create it if needed
    const initConn = await mysql.createConnection({
        host:     process.env.DB_HOST || 'localhost',
        user:     process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        port:     process.env.DB_PORT || 3306,
    });

    await initConn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    await initConn.query(`USE \`${dbName}\``);

    // 2. Create the transactions table if it doesn't exist
    await initConn.query(`
        CREATE TABLE IF NOT EXISTS transactions (
            id              INT             AUTO_INCREMENT PRIMARY KEY,
            title           VARCHAR(255)    NOT NULL,
            amount          DECIMAL(12, 2)  NOT NULL CHECK (amount > 0),
            type            ENUM('income', 'expense') NOT NULL DEFAULT 'expense',
            category        VARCHAR(100)    NOT NULL DEFAULT 'Other',
            payment_method  VARCHAR(50)     NOT NULL DEFAULT 'Cash',
            transaction_date DATE           NOT NULL,
            created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
            updated_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_type (type),
            INDEX idx_category (category),
            INDEX idx_transaction_date (transaction_date)
        )
    `);

    console.log(`\n🌱 Seeding database "${dbName}" with dummy transactions...\n`);

    let inserted = 0;

    for (const txn of dummyTransactions) {
        try {
            await initConn.query(
                `INSERT INTO transactions (title, amount, type, category, payment_method, transaction_date)
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [txn.title, txn.amount, txn.type, txn.category, txn.payment_method, txn.transaction_date]
            );
            inserted++;
            const icon = txn.type === 'income' ? '💰' : '💸';
            console.log(`  ${icon}  ${txn.title} — ₹${txn.amount}`);
        } catch (error) {
            console.error(`  ❌  Failed: ${txn.title} — ${error.message}`);
        }
    }

    console.log(`\n✅ Done! Inserted ${inserted}/${dummyTransactions.length} transactions.`);
    console.log('🚀 Start the server with: npm start\n');

    await initConn.end();
    process.exit(0);
}

seed().catch(err => {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
});
