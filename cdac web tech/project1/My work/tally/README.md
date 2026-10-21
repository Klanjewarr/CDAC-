# 🧾 Expense Tracker

A full-stack personal expense tracker built with HTML, CSS, vanilla JavaScript, Node.js, Express.js, and MySQL.

> *Your spending, in focus. A little clarity for every rupee you spend.*

---

## Features

- ✅ Add, edit, and delete income/expense transactions
- ✅ Dashboard with monthly totals, balance, and daily average
- ✅ Spending over time (line chart) and category breakdown (doughnut chart)
- ✅ Three transaction views: Tabular, Listed, and Graph
- ✅ Search and filter by category/type
- ✅ Data persists in MySQL — survives browser refresh and server restart
- ✅ Input validation on both frontend and backend
- ✅ RESTful API testable with Postman
- 🔜 CSV import/export, budgets, UPI import (coming soon)

---

## Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | HTML5, CSS3, Vanilla JS |
| Backend   | Node.js, Express.js     |
| Database  | MySQL 8.0               |
| Charts    | Chart.js (CDN)          |
| Testing   | Postman                 |

---

## Project Structure

```
expense-tracker/
├── public/                         # Frontend (served as static files)
│   ├── index.html                  # Single-page UI
│   ├── style.css                   # All styles
│   └── app.js                      # All frontend JavaScript
├── src/                            # Backend code
│   ├── config/db.js                # MySQL connection pool
│   ├── routes/transactionRoutes.js # Express route definitions
│   ├── controllers/transactionController.js  # Request handlers
│   └── middleware/validateTransaction.js      # Input validation
├── server.js                       # Express app entry point
├── schema.sql                      # Database creation script
├── .env.example                    # Environment variable template
├── .gitignore                      # Git exclusions
├── package.json                    # npm configuration
└── README.md                       # This file
```

---

## Setup Instructions

### Prerequisites

- **Node.js** (v18 or later): [https://nodejs.org](https://nodejs.org)
- **MySQL Server 8.0**: [https://dev.mysql.com/downloads/](https://dev.mysql.com/downloads/)
- **Postman** (optional, for API testing): [https://www.postman.com](https://www.postman.com)

### Step 1 — Clone and install dependencies

```bash
cd expense-tracker
npm install
```

### Step 2 — Create the database

Open MySQL Workbench (or the mysql CLI) and run:

```sql
source schema.sql
```

Or paste the contents of `schema.sql` directly.

### Step 3 — Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and set your MySQL password:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=expense_tracker_db
DB_PORT=3306
PORT=3000
```

### Step 4 — Start the server

```bash
npm start
```

You should see:

```
🟢 Expense Tracker server running at http://localhost:3000
```

### Step 5 — Open in browser

Visit [http://localhost:3000](http://localhost:3000)

---

## API Endpoints

| Method   | Endpoint                 | Description              |
|----------|--------------------------|--------------------------|
| `GET`    | `/api/health`            | Server + DB health check |
| `GET`    | `/api/transactions`      | List all transactions    |
| `GET`    | `/api/transactions/:id`  | Get one transaction      |
| `POST`   | `/api/transactions`      | Create a transaction     |
| `PUT`    | `/api/transactions/:id`  | Update a transaction     |
| `DELETE` | `/api/transactions/:id`  | Delete a transaction     |
| `GET`    | `/api/dashboard`         | Dashboard summary data   |

### Postman Examples

#### Create a transaction

```
POST http://localhost:3000/api/transactions
Content-Type: application/json

{
    "title": "Coffee at Blue Tokai",
    "amount": 280,
    "type": "expense",
    "category": "Food & drinks",
    "payment_method": "UPI",
    "transaction_date": "2026-10-20"
}
```

#### Update a transaction

```
PUT http://localhost:3000/api/transactions/1
Content-Type: application/json

{
    "title": "Lunch at Swiggy",
    "amount": 340,
    "type": "expense",
    "category": "Food & drinks",
    "payment_method": "UPI",
    "transaction_date": "2026-10-20"
}
```

#### Delete a transaction

```
DELETE http://localhost:3000/api/transactions/1
```

---

## How It Works (Architecture)

```
Browser (HTML/CSS/JS)
    │
    │  fetch('/api/transactions')
    ▼
Express Server (server.js)
    │
    │  Routes → Controller → SQL query
    ▼
MySQL Database (expense_tracker_db)
    │
    │  Returns rows
    ▼
Express sends JSON back to browser
    │
    ▼
JavaScript renders data in the DOM
```

1. **Browser** sends HTTP requests using `fetch()` to the Express API
2. **Express** routes the request to the correct controller function
3. **Controller** runs a parameterized SQL query against MySQL
4. **MySQL** returns the data
5. **Express** sends it back as JSON
6. **Frontend JS** updates the page (DOM) with the new data

---

## Future Enhancements

- [ ] CSV import and export
- [ ] UPI transaction import
- [ ] Bank statement parsing
- [ ] Monthly budget with alerts
- [ ] Advanced search, sorting, and pagination
- [ ] Recurring transactions
- [ ] User authentication
- [ ] Automated tests
- [ ] Deployment (Railway / Render)

---

## License

MIT — Built as a learning project.
