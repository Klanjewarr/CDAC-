# Expense Tracker Project Plan

## Goal
Build a web-based expense tracker using HTML, CSS, JavaScript, and Node.js that allows users to input transactions, view them in graphical formats (bar charts, etc.), and upload CSV/bank statements to display transaction records.

## Current Context / Assumptions
- Working directory: `C:\Users\kanch\Desktop\cdac\cdac web tech\project1`
- No existing codebase for the expense tracker; we are starting from scratch.
- Assumed technologies: Node.js (Express) for backend, vanilla HTML/CSS/JavaScript for frontend, Chart.js for graphs.
- User has Node.js and npm installed.
- We will use a simple file-based storage (JSON file) for transactions to avoid database setup complexity.
- The project will be structured with a `public` directory for static files and a `server.js` for the Node.js server.

## Architecture / Proposed Approach
- Backend: Node.js with Express to serve static files and handle API endpoints for transactions (CRUD operations) and file uploads.
- Frontend: Single HTML page with embedded JavaScript to interact with the backend API, display transaction forms, and render charts using Chart.js.
- Data storage: In-memory array persisted to a JSON file (`transactions.json`) for simplicity.
- File upload: Use `express-fileupload` middleware to handle CSV uploads, parse CSV with `csv-parser`, and add transactions to the store.

## Step-by-Step Tasks

### 1. Initialize Node.js Project and Install Dependencies
- Create `package.json`
- Install Express, express-fileupload, csv-parser, and Chart.js (via CDN, so no install needed for frontend)
- Create basic server file

```bash
npm init -y
npm install express express-fileupload csv-parser
```

### 2. Create Project Structure
- `server.js`: Main server file
- `public/`: Static files directory
- `public/index.html`: Main HTML file
- `public/style.css`: Stylesheet
- `public/script.js`: Frontend logic
- `transactions.json`: Data storage (will be created by server)

### 3. Implement Basic Server (server.js)
Write the server to serve static files, handle JSON transactions, and file uploads.

```javascript
// server.js
const express = require('express');
const fileUpload = require('express-fileupload');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'transactions.json');

// Middleware
app.use(fileUpload());
app.use(express.static('public'));
app.use(express.json());

// Helper: read transactions from file
function readTransactions() {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
}

// Helper: write transactions to file
function writeTransactions(transactions) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(transactions, null, 2));
}

// API Routes
app.get('/api/transactions', (req, res) => {
  res.json(readTransactions());
});

app.post('/api/transactions', (req, res) => {
  const transactions = readTransactions();
  const newTransaction = req.body;
  // Assign an ID if not provided (for simplicity, use timestamp)
  if (!newTransaction.id) {
    newTransaction.id = Date.now().toString();
  }
  transactions.push(newTransaction);
  writeTransactions(transactions);
  res.status(201).json(newTransaction);
});

app.put('/api/transactions/:id', (req, res) => {
  const transactions = readTransactions();
  const index = transactions.findIndex(t => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
  transactions[index] = { ...transactions[index], ...req.body };
  writeTransactions(transactions);
  res.json(transactions[index]);
});

app.delete('/api/transactions/:id', (req, res) => {
  let transactions = readTransactions();
  transactions = transactions.filter(t => t.id !== req.params.id);
  writeTransactions(transactions);
  res.sendStatus(204);
});

// File upload endpoint
app.post('/api/upload', (req, res) => {
  if (!req.files || !req.files.csvFile) {
    return res.status(400).send('No file uploaded.');
  }

  let csvFile = req.files.csvFile;
  let uploadPath = __dirname + '/upload_' + Date.now() + '.csv';

  csvFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    const transactions = readTransactions();
    const newTransactions = [];

    fs.createReadStream(uploadPath)
      .pipe(csv())
      .on('data', (row) => {
        // Assuming CSV columns: date, description, amount, type (income/expense)
        // Adjust mapping as per actual CSV structure
        newTransactions.push({
          id: Date.now().toString() + Math.random(),
          date: row.date,
          description: row.description,
          amount: parseFloat(row.amount),
          type: row.type || (parseFloat(row.amount) >= 0 ? 'income' : 'expense')
        });
      })
      .on('end', () => {
        // Add new transactions to existing ones
        transactions.push(...newTransactions);
        writeTransactions(transactions);
        // Clean up uploaded file
        fs.unlinkSync(uploadPath);
        res.json({ message: 'File uploaded successfully', count: newTransactions.length });
      })
      .on('error', (err) => {
        res.status(500).send('Error processing CSV');
      });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 4. Create Frontend (public/index.html)
Basic structure with form for transaction input, display area, and chart container.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Expense Tracker</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="container">
        <h1>Expense Tracker</h1>
        <div class="input-section">
            <h2>Add Transaction</h2>
            <form id="transactionForm">
                <input type="date" id="date" required>
                <input type="text" id="description" placeholder="Description" required>
                <input type="number" id="amount" step="0.01" placeholder="Amount" required>
                <select id="type">
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>
                <button type="submit">Add Transaction</button>
            </form>
        </div>
        <div class="upload-section">
            <h2>Upload CSV</h2>
            <form id="uploadForm" enctype="multipart/form-data">
                <input type="file" name="csvFile" accept=".csv" required>
                <button type="submit">Upload</button>
            </form>
            <div id="uploadMessage"></div>
        </div>
        <div class="chart-section">
            <h2>Transaction Overview</h2>
            <canvas id="transactionChart"></canvas>
        </div>
        <div class="transactions-section">
            <h2>Transactions</h2>
            <table id="transactionsTable">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

### 5. Create Frontend Styles (public/style.css)
Basic styling for layout and usability.

```css
/* style.css */
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

.input-section, .upload-section, .chart-section, .transactions-section {
    margin-bottom: 30px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

form {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

input, select, button {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

button {
    background-color: #007bff;
    color: white;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

th {
    background-color: #f2f2f2;
}

.tr-expense {
    background-color: #ffebee;
}

.tr-income {
    background-color: #e8f5e8;
}

.chart-section {
    position: relative;
    height: 300px;
}
```

### 6. Create Frontend Logic (public/script.js)
Handle form submissions, fetch transactions, update UI, and render chart.

```javascript
// script.js
let chart = null;

// Fetch and display transactions on load
async function loadTransactions() {
    try {
        const response = await fetch('/api/transactions');
        const transactions = await response.json();
        displayTransactions(transactions);
        updateChart(transactions);
    } catch (error) {
        console.error('Error loading transactions:', error);
    }
}

// Display transactions in table
function displayTransactions(transactions) {
    const tbody = document.querySelector('#transactionsTable tbody');
    tbody.innerHTML = '';

    transactions.forEach(tx => {
        const tr = document.createElement('tr');
        tr.className = `tr-${tx.type}`;
        tr.innerHTML = `
            <td>${tx.date}</td>
            <td>${tx.description}</td>
            <td>${tx.amount}</td>
            <td>${tx.type}</td>
            <td>
                <button onclick="editTransaction('${tx.id}')">Edit</button>
                <button onclick="deleteTransaction('${tx.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Handle add transaction form
document.getElementById('transactionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const tx = {
        date: document.getElementById('date').value,
        description: document.getElementById('description').value,
        amount: parseFloat(document.getElementById('amount').value),
        type: document.getElementById('type').value
    };

    try {
        const response = await fetch('/api/transactions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tx)
        });
        if (response.ok) {
            document.getElementById('transactionForm').reset();
            loadTransactions();
        } else {
            alert('Failed to add transaction');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Handle upload form
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const fileInput = document.querySelector('input[name="csvFile"]');
    formData.append('csvFile', fileInput.files[0]);

    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        document.getElementById('uploadMessage').textContent = result.message;
        fileInput.value = '';
        loadTransactions();
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('uploadMessage').textContent = 'Upload failed';
    }
});

// Edit transaction (simplified: delete and refill form for now)
function editTransaction(id) {
    // For simplicity, we'll just delete and let user re-add; in a full app, you'd populate form for editing
    if (confirm('Edit transaction? This will delete and you can re-add.')) {
        deleteTransaction(id);
    }
}

// Delete transaction
async function deleteTransaction(id) {
    try {
        const response = await fetch(`/api/transactions/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            loadTransactions();
        } else {
            alert('Failed to delete transaction');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Update chart with transaction data
function updateChart(transactions) {
    const ctx = document.getElementById('transactionChart').getContext('2d');
    
    // Prepare data: group by type and sum amounts
    const summary = transactions.reduce((acc, tx) => {
        acc[tx.type] = (acc[tx.type] || 0) + tx.amount;
        return acc;
    }, {});

    const data = {
        labels: Object.keys(summary),
        datasets: [{
            label: 'Amount by Type',
            data: Object.values(summary),
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    };

    if (chart) {
        chart.destroy();
    }
    chart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Transaction Summary' }
            }
        }
    });
}

// Initial load
loadTransactions();
```

### 7. Run and Verify the Application
- Start the server: `node server.js`
- Open browser to `http://localhost:3000`
- Verify that you can add transactions, see them in the table and chart.
- Verify CSV upload works (create a sample CSV with columns: date, description, amount, type).

## Tests / Validation
Since we are in plan mode, we outline how tests would be done during implementation.

### Backend Tests (using Jest or similar)
- Test API endpoints for transactions (GET, POST, PUT, DELETE)
- Test file upload endpoint with mock CSV

### Frontend Tests
- Test form submission adds transaction
- Test chart updates with data
- Test table renders transactions

### Manual Verification Steps
1. Start server: `node server.js`
2. Open `http://localhost:3000` in browser
3. Add a transaction via form, verify it appears in table and chart.
4. Upload a sample CSV (e.g., `date,description,amount,type\n2026-10-13,Coffee,5.50,expense`), verify transactions added.
5. Edit/delete transactions via UI, verify changes persist.

## Risks, Tradeoffs, and Open Questions
- **Risks**: Using file-based storage may lead to data loss if server restarts unexpectedly; not suitable for multi-user or production without a proper database.
- **Tradeoffs**: Chose simplicity over scalability; for a personal project, file storage is acceptable. If scaling needed, replace with SQLite or MongoDB.
- **Open Questions**: 
  - Should we support updating existing transactions via a dedicated edit form (rather than delete and re-add)?
  - Should we allow filtering transactions by date range or type?
  - Should we add authentication for multiple users? (Out of scope per YAGNI)
