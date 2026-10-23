const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Ensure transactions.json exists
const transactionsFile = path.join(__dirname, 'transactions.json');
if (!fs.existsSync(transactionsFile)) {
  fs.writeFileSync(transactionsFile, JSON.stringify([]));
}

// Helper to read transactions
function getTransactions() {
  const data = fs.readFileSync(transactionsFile);
  return JSON.parse(data);
}

// Helper to write transactions
function saveTransactions(transactions) {
  fs.writeFileSync(transactionsFile, JSON.stringify(transactions, null, 2));
}

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get all transactions
app.get('/transactions', (req, res) => {
  try {
    const transactions = getTransactions();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read transactions' });
  }
});

// Add a new transaction
app.post('/transactions', (req, res) => {
  try {
    const { date, description, amount, category, type } = req.body;
    // Basic validation
    if (!date || !description || isNaN(amount) || !category || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const transactions = getTransactions();
    const newTransaction = {
      id: Date.now().toString(), // Simple ID generation
      date,
      description,
      amount: parseFloat(amount),
      category,
      type
    };
    transactions.push(newTransaction);
    saveTransactions(transactions);
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add transaction' });
  }
});

// Update a transaction
app.put('/transactions/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { date, description, amount, category, type } = req.body;
    if (!date || !description || isNaN(amount) || !category || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    let transactions = getTransactions();
    const index = transactions.findIndex(t => t.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    const updatedTransaction = {
      id,
      date,
      description,
      amount: parseFloat(amount),
      category,
      type
    };
    transactions[index] = updatedTransaction;
    saveTransactions(transactions);
    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update transaction' });
  }
});

// Delete a transaction
app.delete('/transactions/:id', (req, res) => {
  try {
    const { id } = req.params;
    let transactions = getTransactions();
    const initialLength = transactions.length;
    transactions = transactions.filter(t => t.id !== id);
    if (transactions.length === initialLength) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    saveTransactions(transactions);
    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
});

// Upload and parse CSV
app.post('/upload', upload.single('csvFile'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const filePath = req.file.path;
    const transactions = getTransactions();
    const newTransactions = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        // Validate row
        if (row.date && row.description && !isNaN(row.amount) && row.category && row.type) {
          const transaction = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            date: row.date.trim(),
            description: row.description.trim(),
            amount: parseFloat(row.amount),
            category: row.category.trim(),
            type: row.type.trim().toLowerCase()
          };
          newTransactions.push(transaction);
        }
      })
      .on('end', () => {
        // Add new transactions to the list
        transactions.push(...newTransactions);
        saveTransactions(transactions);
        // Clean up uploaded file
        fs.unlinkSync(filePath);
        res.json({ message: `Uploaded and processed ${newTransactions.length} transactions`, transactions: newTransactions });
      })
      .on('error', (error) => {
        console.error('CSV parse error:', error);
        res.status(500).json({ error: 'Failed to parse CSV file' });
      });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
