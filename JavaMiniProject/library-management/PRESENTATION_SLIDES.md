# Library Management System - Presentation Deck (12 Slides)
**Team Size:** 3 (Team of 3)

---

### Slide 1: Title Slide
- **Title:** Library Management System
- **Bullets:**
  - Core Java Mini Project
  - Developed in Java 17
  - Uses MySQL and JDBC connectivity
  - Built by a team of three
- **What to say:**
  *"Good morning respected evaluators, today we present our Core Java and JDBC mini-project: a console-based Library Management System."*

---

### Slide 2: Problem Statement
- **Title:** Problem Statement
- **Bullets:**
  - Manual library registers cause data errors
  - Tracking overdue books is tedious
  - Calculating fines manually leads to discrepancies
  - Stock updates often become inconsistent
- **What to say:**
  *"Traditional paper-based library tracking leads to human error, missed overdue returns, and inconsistent book inventory records."*

---

### Slide 3: Project Objectives
- **Title:** Project Objectives
- **Bullets:**
  - Automate member and book management
  - Enforce borrow limits and durations
  - Calculate overdue fines automatically
  - Guarantee data consistency using transactions
- **What to say:**
  *"Our objective was to build a reliable, lightweight system that enforces library borrowing rules and maintains accurate inventory counts."*

---

### Slide 4: Key Features
- **Title:** Key System Features
- **Bullets:**
  - Secure librarian login authentication
  - Complete book and member management
  - Transaction-backed book issue and return
  - Analytical stream reports and file export
- **What to say:**
  *"The application covers librarian authentication, inventory operations, transaction-protected book issue, automated fines, and stream-based reports."*

---

### Slide 5: Technology Stack
- **Title:** Technology Stack
- **Bullets:**
  - Java 17 LTS (Core Java)
  - MySQL 8.0 Relational Database
  - MySQL Connector/J JDBC Driver
  - Command line console interface
- **What to say:**
  *"We built our application strictly on Java 17 and MySQL, using pure JDBC with zero external frameworks or heavy libraries."*

---

### Slide 6: System Architecture
- **Title:** Multi-Tier Architecture
- **Bullets:**
  - Presentation Layer: Console UI & Menu
  - Service Layer: Business rules & transactions
  - Data Access Layer: DAO Pattern
  - Database Layer: MySQL persistent tables
- **What to say:**
  *"We followed a clean multi-tier architecture separating the console menu, business rules, DAO queries, and the database."*

---

### Slide 7: Database Design (ER Model)
- **Title:** Database Schema & Tables
- **Bullets:**
  - `users`: Librarian login credentials
  - `books`: Inventory and available stock
  - `members`: Student and faculty records
  - `issue_records`: Transaction details with foreign keys
- **What to say:**
  *"Our database contains four normalized tables linked through foreign keys to ensure relational integrity between books, members, and issues."*

---

### Slide 8: Class Hierarchy & Structure
- **Title:** Domain Class Hierarchy
- **Bullets:**
  - Abstract base class: `Person`
  - Base entity: `Member`
  - Subclasses: `Student` and `Faculty`
  - Immutable Java 17 `record`: `BookSummary`
- **What to say:**
  *"Our model layer uses an inheritance hierarchy from Person to Member, specialized into Student and Faculty, alongside a Java 17 record."*

---

### Slide 9: OOP Concepts Applied
- **Title:** Core OOP Concepts Demonstrated
- **Bullets:**
  - Abstraction with `Person` abstract class
  - Inheritance across student and faculty
  - Polymorphism in rules and fine calculations
  - Encapsulation with private attributes and getters
- **What to say:**
  *"Every core object-oriented concept from our syllabus is actively implemented across our model and service classes."*

---

### Slide 10: JDBC & Transaction Management
- **Title:** JDBC & Transaction Integrity
- **Bullets:**
  - Prepared statements block SQL injection
  - Manual transaction using `setAutoCommit(false)`
  - Atomic book issue and stock decrement
  - Automatic rollback on any failure
- **What to say:**
  *"We protect database integrity during book issuing by bundling stock reduction and issue record creation inside an atomic transaction."*

---

### Slide 11: Live Demonstration Flow
- **Title:** Application Demo Flow
- **Bullets:**
  - Step 1: Librarian login authentication
  - Step 2: Book search and sorting demo
  - Step 3: Issue book with limit enforcement
  - Step 4: Stream reports and file export
- **What to say:**
  *"In our live demo, we will demonstrate librarian login, sorting with lambdas, borrowing limit exceptions, and generating stream reports."*

---

### Slide 12: Limitations & Future Scope
- **Title:** Limitations & Future Enhancements
- **Bullets:**
  - Plain-text passwords require hashing
  - Console UI can become a web application
  - Direct JDBC can use connection pooling
  - Add email alerts for overdue returns
- **What to say:**
  *"In future iterations, we plan to implement password hashing with BCrypt, add connection pooling, and migrate the UI to a web portal."*
