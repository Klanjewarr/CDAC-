# Expense Tracker

A web-based expense tracker built with HTML, CSS, JavaScript, and Node.js that allows users to input transactions, view them in graphical formats, and upload CSV/bank statements to display transaction records.

## Features

- ✅ Add transactions via form (date, description, amount, type)
- ✅ View transactions in a styled table with income/expense differentiation
- ✅ Visualize transaction summary in a bar chart (Chart.js)
- ✅ Upload CSV files to import multiple transactions
- ✅ Edit/delete transactions
- ✅ Persistent storage using JSON file
- ✅ Responsive design

## Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript, Chart.js
- **Storage**: JSON file-based (transactions.json)
- **File Upload**: express-fileupload, csv-parser

## Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```
   or
   ```bash
   node server.js
   ```
5. Open your browser to `http://localhost:3000`

## Usage

### Adding Transactions
1. Fill in the date, description, amount, and select type (income/expense)
2. Click "Add Transaction"
3. The transaction will appear in the table and update the chart

### Uploading CSV
1. Prepare a CSV file with columns: `date,description,amount,type`
   - Example: `2026-10-13,Coffee,5.50,expense`
2. Click "Choose File" and select your CSV
3. Click "Upload"
4. Transactions will be added and the view will update

### Managing Transactions
- **Edit**: Click "Edit" on a transaction (currently deletes and allows re-adding)
- **Delete**: Click "Delete" on a transaction to remove it

## File Structure

```
expense-tracker/
├── server.js                 # Express backend server
├── package.json             # npm configuration and dependencies
├── transactions.json        # Data storage (auto-generated)
├── public/
│   ├── index.html           # Main HTML interface
│   ├── style.css            # Styling
│   └── script.js            # Frontend logic
└── README.md                # This file
```

## API Endpoints

- `GET /api/transactions` - Retrieve all transactions
- `POST /api/transactions` - Add a new transaction
- `PUT /api/transactions/:id` - Update a transaction
- `DELETE /api/transactions/:id` - Delete a transaction
- `POST /api/upload` - Upload and process CSV file

## CSV Format

The CSV file should have the following columns:
- `date`: Transaction date (YYYY-MM-DD format)
- `description`: Transaction description
- `amount`: Transaction amount (numeric)
- `type`: Transaction type (`income` or `expense`)

Example:
```csv
date,description,amount,type
2026-10-13,Coffee,5.50,expense
2026-10-13,Salary,1000.00,income
2026-10-14,Lunch,12.75,expense
```

## Customization

### Changing Chart Type
In `public/script.js`, modify the `type` property in the Chart.js configuration:
```javascript
type: 'bar'  // Change to 'line', 'pie', 'doughnut', etc.
```

### Adjusting Storage Location
Modify the `DATA_FILE` constant in `server.js` to change where transactions.json is stored.

## Development

To modify this application:

1. **Backend Changes**: Edit `server.js`
   - API endpoints
   - File upload handling
   - Data storage logic

2. **Frontend Changes**: Edit files in `public/` directory
   - `index.html`: Structure and layout
   - `style.css`: Visual styling
   - `script.js`: Client-side logic and Chart.js configuration

3. **Dependencies**: Update `package.json` and run `npm install` as needed

## Limitations & Considerations

- **Storage**: Uses JSON file storage - suitable for personal/single-user use. For multi-user or production applications, consider replacing with a database (SQLite, MongoDB, PostgreSQL).
- **Concurrent Access**: File-based storage may have issues with concurrent writes in high-traffic scenarios.
- **Security**: This implementation lacks authentication and authorization - intended for personal/local use only.
- **File Size**: Large CSV uploads may be limited by server memory.

## Future Enhancements

- [ ] User authentication and authorization
- [ ] Database integration (SQLite/PostgreSQL)
- [ ] Transaction categories and tagging
- [ ] Date range filtering and search
- [ ] Data export functionality (CSV/JSON)
- [ ] Budget tracking and goal setting
- [ ] Recurring transactions
- [ ] Improved edit functionality (pre-populate form)
- [ ] Data validation and error handling improvements

## Troubleshooting

### Server Won't Start
- Ensure Node.js is installed (`node --version`)
- Check if port 3000 is already in use
- Run `npm install` to ensure dependencies are installed

### Transactions Not Saving
- Check file permissions on the project directory
- Verify the server has write access to create `transactions.json`
- Check the browser console for API errors

### CSV Upload Fails
- Ensure the CSV has the correct column headers
- Check file size limits (adjust in server.js if needed)
- Verify the server can write to the upload directory

## License

This project is open source and available for personal and educational use.

## Acknowledgments

- Chart.js for the visualization library
- Express.js team for the web framework
- Open source community for various utility packages