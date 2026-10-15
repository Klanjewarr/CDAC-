const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Get all transactions
router.get('/', (req, res) => {
  Transaction.getAll((err, transactions) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(transactions);
  });
});

// Get transaction by ID
router.get('/:id', (req, res) => {
  Transaction.getById(req.params.id, (err, transaction) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json(transaction);
  });
});

// Create new transaction
router.post('/', (req, res) => {
  const { amount, type, category, description, date } = req.body;
  
  // Basic validation
  if (!amount || !type || !category || !date) {
    return res.status(400).json({ 
      error: 'Amount, type, category, and date are required' 
    });
  }

  if (type !== 'income' && type !== 'expense') {
    return res.status(400).json({ error: 'Type must be income or expense' });
  }

  Transaction.create({ amount, type, category, description, date }, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(result);
  });
});

// Update transaction
router.put('/:id', (req, res) => {
  const { amount, type, category, description, date } = req.body;
  
  // Basic validation
  if (!amount || !type || !category || !date) {
    return res.status(400).json({ 
      error: 'Amount, type, category, and date are required' 
    });
  }

  if (type !== 'income' && type !== 'expense') {
    return res.status(400).json({ error: 'Type must be income or expense' });
  }

  Transaction.update(req.params.id, { amount, type, category, description, date }, (err, changes) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (changes === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    Transaction.getById(req.params.id, (err, transaction) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(transaction);
    });
  });
});

// Delete transaction
router.delete('/:id', (req, res) => {
  Transaction.delete(req.params.id, (err, changes) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (changes === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted successfully' });
  });
});

// Get summary statistics
router.get('/summary/summary', (req, res) => {
  Transaction.getSummary((err, summary) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(summary);
  });
});

// Get expenses by category (for pie chart)
router.get('/summary/categories', (req, res) => {
  Transaction.getExpensesByCategory((err, categories) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(categories);
  });
});

// Get monthly expenses (for line chart)
router.get('/summary/monthly', (req, res) => {
  Transaction.getMonthlyExpenses((err, monthlyData) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(monthlyData);
  });
});

module.exports = router;