const db = require('../database');

// Transaction model functions
class Transaction {
  // Get all transactions
  static getAll(callback) {
    const sql = `SELECT * FROM transactions ORDER BY date DESC, created_at DESC`;
    db.all(sql, [], callback);
  }

  // Get transaction by ID
  static getById(id, callback) {
    const sql = `SELECT * FROM transactions WHERE id = ?`;
    db.get(sql, [id], callback);
  }

  // Create new transaction
  static create(transaction, callback) {
    const sql = `
      INSERT INTO transactions (amount, type, category, description, date)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      transaction.amount,
      transaction.type,
      transaction.category,
      transaction.description,
      transaction.date
    ];
    db.run(sql, values, function(err) {
      callback(err, { id: this.lastID, ...transaction });
    });
  }

  // Update transaction
  static update(id, transaction, callback) {
    const sql = `
      UPDATE transactions 
      SET amount = ?, type = ?, category = ?, description = ?, date = ?
      WHERE id = ?
    `;
    const values = [
      transaction.amount,
      transaction.type,
      transaction.category,
      transaction.description,
      transaction.date,
      id
    ];
    db.run(sql, values, function(err) {
      callback(err, this.changes);
    });
  }

  // Delete transaction
  static delete(id, callback) {
    const sql = `DELETE FROM transactions WHERE id = ?`;
    db.run(sql, [id], function(err) {
      callback(err, this.changes);
    });
  }

  // Get transactions by date range
  static getByDateRange(startDate, endDate, callback) {
    const sql = `
      SELECT * FROM transactions 
      WHERE date BETWEEN ? AND ? 
      ORDER BY date DESC
    `;
    db.all(sql, [startDate, endDate], callback);
  }

  // Get summary statistics
  static getSummary(callback) {
    const sql = `
      SELECT 
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as totalIncome,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as totalExpense,
        COUNT(*) as transactionCount
      FROM transactions
    `;
    db.get(sql, [], callback);
  }

  // Get expenses by category for charts
  static getExpensesByCategory(callback) {
    const sql = `
      SELECT category, SUM(amount) as total
      FROM transactions 
      WHERE type = 'expense'
      GROUP BY category
      ORDER BY total DESC
    `;
    db.all(sql, [], callback);
  }

  // Get monthly expenses for trend chart
  static getMonthlyExpenses(callback) {
    const sql = `
      SELECT 
        strftime('%Y-%m', date) as month,
        SUM(amount) as total
      FROM transactions 
      WHERE type = 'expense'
      GROUP BY month
      ORDER BY month
    `;
    db.all(sql, [], callback);
  }
}

module.exports = Transaction;