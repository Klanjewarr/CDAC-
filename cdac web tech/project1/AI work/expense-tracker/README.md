# Expense Tracker

A full-stack expense tracker application built with HTML, CSS, JavaScript, and Node.js that allows users to track their income and expenses, visualize spending patterns, and import transaction data from CSV files.

## Features

- **Transaction Management**: Add, edit, delete, and view financial transactions
- **Data Visualization**: Interactive charts showing expenses by category and monthly trends
- **CSV Import**: Upload bank statements or CSV files to import transaction data
- **Responsive Design**: Works on desktop and mobile devices
- **Category Tracking**: Organize transactions by customizable categories
- **Income/Expense Tracking**: Separate tracking for income and expenses

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla), Chart.js
- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **File Handling**: Multer for file uploads, CSV-parser for CSV processing

## Project Structure

```
expense-tracker/
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── backend/
│   ├── server.js
│   ├── database.js
│   ├── models/
│   │   └── Transaction.js
│   ├── routes/
│   │   ├── transactions.js
│   │   └── upload.js
│   └── utils/
│       └── csvParser.js
├── database/
│   └── expenses.db
├── uploads/
└── package.json
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expense-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Visit `http://localhost:3000` in your web browser

## API Endpoints

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create a new transaction
- `PUT /api/transactions/:id` - Update a transaction
- `DELETE /api/transactions/:id` - Delete a transaction
- `GET /api/transactions/summary/summary` - Get income/expense summary
- `GET /api/transactions/summary/categories` - Get expenses by category
- `GET /api/transactions/summary/monthly` - Get monthly expenses

### Upload
- `POST /api/upload` - Upload and process CSV file

## Usage

### Adding Transactions
1. Click the "Add Transaction" button
2. Fill in the date, type (income/expense), amount, category, and description
3. Click "Save Transaction"

### Viewing Transactions
- Navigate to the "Transactions" section to see all transactions
- Use pagination to navigate through large lists
- Click "Edit" to modify a transaction
- Click "Delete" to remove a transaction

### Visualizing Data
- Go to the "Dashboard" section to see:
  - Summary statistics (total income, expenses, balance)
  - Pie chart showing expenses by category
  - Line chart showing monthly spending trends

### Importing CSV Data
1. Navigate to the "Upload CSV" section
2. Drag and drop a CSV file or click to browse
3. Preview the data to ensure it's correct
4. Click "Import Transactions" to import the data

### CSV Format
The application expects CSV files with the following columns (in order):
1. Date (YYYY-MM-DD format)
2. Amount (numeric)
3. Type (income or expense)
4. Category (text)
5. Description (text, optional)

Example:
```
date,amount,type,category,description
2026-10-13,25.50,expense,food,Lunch at restaurant
2026-10-13,1500.00,income,salary,Monthly salary
```

## Future Enhancements

- User authentication and accounts
- Budget setting and alerts
- Recurring transaction support
- Multi-currency support
- Dark/light theme toggle
- Mobile app version
- Bank API integration (Plaid, etc.)
- Data export functionality (CSV, PDF)
- Tags and notes for transactions

## License

MIT License