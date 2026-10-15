const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create or connect to SQLite database
const db = new sqlite3.Database(path.join(__dirname, '../database/expenses.db'), (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    initializeDatabase();
  }
});

// Initialize database tables
function initializeDatabase() {
  const createTransactionsTable = `
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount DECIMAL(10, 2) NOT NULL,
      type VARCHAR(10) NOT NULL CHECK (type IN ('income', 'expense')),
      category VARCHAR(50) NOT NULL,
      description TEXT,
      date DATE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.run(createTransactionsTable, (err) => {
    if (err) {
      console.error('Error creating transactions table:', err.message);
    } else {
      console.log('Transactions table ready');
    }
  });
}

module.exports = db;