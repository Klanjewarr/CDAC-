// ─────────────────────────────────────────────────────────
// src/routes/transactionRoutes.js — API Route Definitions
// ─────────────────────────────────────────────────────────
// This file maps HTTP methods + URL paths to controller
// functions. The validation middleware runs before
// POST and PUT to check the request body.
//
// Route map:
//   GET    /api/transactions       → list all
//   GET    /api/transactions/:id   → get one
//   POST   /api/transactions       → create
//   PUT    /api/transactions/:id   → update
//   DELETE /api/transactions/:id   → delete
// ─────────────────────────────────────────────────────────

const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/transactionController');
const validate   = require('../middleware/validateTransaction');

// List all transactions
router.get('/', controller.getAllTransactions);

// Get single transaction
router.get('/:id', controller.getTransactionById);

// Create — validate first, then create
router.post('/', validate, controller.createTransaction);

// Update — validate first, then update
router.put('/:id', validate, controller.updateTransaction);

// Delete
router.delete('/:id', controller.deleteTransaction);

module.exports = router;
