// ─────────────────────────────────────────────────────────
// src/middleware/validateTransaction.js — Input Validation
// ─────────────────────────────────────────────────────────
// This middleware runs BEFORE the controller. If any field
// is invalid, it sends back a 400 error immediately.
// If everything is valid, it calls next() to proceed.
// ─────────────────────────────────────────────────────────

const VALID_TYPES = ['income', 'expense'];

const VALID_CATEGORIES = [
    'Food & drinks', 'Transport', 'Shopping', 'Rent & bills',
    'Entertainment', 'Subscriptions', 'Healthcare', 'Education',
    'Groceries', 'Salary', 'Freelance', 'Investment', 'Other'
];

const VALID_PAYMENT_METHODS = [
    'Cash', 'UPI', 'Credit card', 'Debit card', 'Bank transfer', 'Other'
];

const validateTransaction = (req, res, next) => {
    const errors = [];
    const { title, amount, type, category, payment_method, transaction_date } = req.body;

    // ── Title: required, string, max 255 chars ──
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
        errors.push('Title is required');
    } else if (title.trim().length > 255) {
        errors.push('Title must be 255 characters or less');
    }

    // ── Amount: required, positive number ──
    if (amount === undefined || amount === null || amount === '') {
        errors.push('Amount is required');
    } else if (isNaN(Number(amount)) || Number(amount) <= 0) {
        errors.push('Amount must be a positive number');
    } else if (Number(amount) > 9999999999.99) {
        errors.push('Amount is too large');
    }

    // ── Type: must be "income" or "expense" ──
    if (!type || !VALID_TYPES.includes(type)) {
        errors.push('Type must be "income" or "expense"');
    }

    // ── Category: optional, default "Other" ──
    if (category && typeof category !== 'string') {
        errors.push('Category must be a string');
    }

    // ── Payment method: optional, default "Cash" ──
    if (payment_method && typeof payment_method !== 'string') {
        errors.push('Payment method must be a string');
    }

    // ── Transaction date: required, valid date ──
    if (!transaction_date) {
        errors.push('Transaction date is required');
    } else {
        const date = new Date(transaction_date);
        if (isNaN(date.getTime())) {
            errors.push('Transaction date must be a valid date (YYYY-MM-DD)');
        }
    }

    // If there are errors, stop here
    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }

    // ── Sanitize: trim strings, set defaults ──
    req.body.title           = title.trim();
    req.body.amount          = Number(amount);
    req.body.category        = (category && category.trim()) || 'Other';
    req.body.payment_method  = (payment_method && payment_method.trim()) || 'Cash';

    next();  // Validation passed → continue to controller
};

module.exports = validateTransaction;
