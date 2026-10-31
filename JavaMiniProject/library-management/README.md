# Java-MiniProject-liabary-mangement

## 📚 Library Management System

A modular, console-based Java application designed to automate day-to-day library operations for academic institutions. Built using Core Java 17, JDBC, and MySQL.

### 🚀 Key Features
- **Librarian Authentication**: Secure login mechanism.
- **Book & Member Management**: Full CRUD operations for books and members (Students & Faculty).
- **Transaction-Protected Borrowing**: ACID-compliant transactions with limit checks and stock management.
- **Book Return & Fine Calculation**: Dynamic fine calculation based on member category and overdue days.
- **Stream API Reporting**: Analytical reporting (filtering, grouping, partitioning) using Java Streams.
- **Persistent File Export**: Generates and exports comprehensive reports to file (`library_report.txt`).

### 🛠️ Tech Stack
- **Language**: Java 17+
- **Database**: MySQL
- **Driver**: MySQL Connector/J (JDBC)

### 📂 Database Setup
Import the provided schema into your MySQL instance:
```bash
mysql -u root -p < schema.sql
```

### 💻 How to Compile and Run
**Compile the project:**
```bash
javac -d bin -cp "lib/*" src/com/library/*/*.java
```

**Run the application (Windows):**
```bash
java -cp "bin;lib/*" com.library.ui.Main
```

**Run the application (Linux / macOS):**
```bash
java -cp "bin:lib/*" com.library.ui.Main
```
