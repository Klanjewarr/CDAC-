const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('csv-parser');
const Transaction = require('../models/Transaction');
const fs = require('fs');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Accept only CSV files
    if (file.mimetype === 'text/csv' || 
        file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed'), false);
    }
  }
});

// Handle file upload
router.post('/', upload.single('csvFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = req.file.path;
  const transactions = [];
  const errors = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      // Basic validation and mapping
      // Assuming CSV has columns: date, amount, type, category, description
      const transaction = {
        date: row.date || row.Date,
        amount: parseFloat(row.amount || row.Amount),
        type: (row.type || row.Type || '').toLowerCase(),
        category: row.category || row.Category || 'Other',
        description: row.description || row.Description || ''
      };

      // Validate transaction data
      if (!transaction.date || isNaN(transaction.amount) || 
          !transaction.type || (transaction.type !== 'income' && transaction.type !== 'expense')) {
        errors.push(`Invalid data in row: ${JSON.stringify(row)}`);
        return;
      }

      transactions.push(transaction);
    })
    .on('end', () => {
      if (errors.length > 0) {
        // Clean up uploaded file
        fs.unlinkSync(filePath);
        return res.status(400).json({ 
          error: 'CSV validation failed', 
          details: errors 
        });
      }

      if (transactions.length === 0) {
        fs.unlinkSync(filePath);
        return res.status(400).json({ error: 'No valid transactions found in CSV' });
      }

      // Insert all valid transactions
      const insertPromises = transactions.map(transaction => {
        return new Promise((resolve, reject) => {
          Transaction.create(transaction, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      });

      Promise.all(insertPromises)
        .then(results => {
          // Clean up uploaded file
          fs.unlinkSync(filePath);
          res.json({ 
            message: `${results.length} transactions imported successfully`,
            count: results.length
          });
        })
        .catch(err => {
          // Clean up uploaded file
          fs.unlinkSync(filePath);
          res.status(500).json({ error: 'Error importing transactions', details: err.message });
        });
    })
    .on('error', (err) => {
      // Clean up uploaded file
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      res.status(500).json({ error: 'Error reading CSV file', details: err.message });
    });
});

// Get upload status or history (optional)
router.get('/', (req, res) => {
  res.json({ message: 'Upload endpoint ready' });
});

module.exports = router;