# Library Management System - Comprehensive Viva & Technical Documentation
**Team Size:** 3 (Team of 3)

---

## 1. System Overview
The Library Management System is a modular, console-based Java application designed to automate day-to-day library operations for academic institutions. Built using Core Java 17, JDBC, and MySQL, the application enables librarians to authenticate securely, manage books and members, process book borrowings with transactional integrity, calculate overdue fines based on member category, sort inventories, generate analytical stream reports, and export reports to persistent files.

---

## 2. Program Execution Flow
1. **Librarian Authentication**: 
   - `Main` prompts for username and password.
   - `LibraryService.login()` queries the `users` table via `PreparedStatement`.
   - On success, the user is greeted and enters the main menu loop.
2. **Main Menu Loop**:
   - `Main.printMenu()` displays 13 options.
   - Input is validated using `readIntInput()`, gracefully handling `NumberFormatException`.
   - A modern Java 14+ `switch` expression routes execution to dedicated handler methods.
3. **Core Workflows**:
   - **Book & Member Management**: CRUD operations routed to `BookDAO` and `MemberDAO`.
   - **Transaction-Protected Borrowing (`issueBook`)**:
     1. Verifies member existence and checks borrow limit (3 for Student, 5 for Faculty). Throws `LimitExceededException` if violated.
     2. Verifies book existence and checks stock (`available_copies > 0`). Throws `BookNotAvailableException` if 0.
     3. Starts JDBC transaction (`conn.setAutoCommit(false)`).
     4. Decrements `available_copies` in `books` table.
     5. Inserts a new record into `issue_records` with calculated `due_date`.
     6. Calls `conn.commit()`. If an exception occurs, calls `conn.rollback()`.
   - **Book Return & Fine Calculation (`returnBook`)**:
     1. Fetches `issue_record` and ensures book hasn't already been returned.
     2. Calculates days late using `java.time.temporal.ChronoUnit.DAYS.between()`.
     3. Computes fine (Rs 2/day for students, Rs 1/day for faculty) via overloaded `calculateFine()`.
     4. Updates `return_date` and `fine` in `issue_records`, then increments `available_copies`.
   - **Stream Reports & Export**:
     - Uses Java Stream API (`filter`, `map`, `groupingBy`, `partitioningBy`).
     - Exports report to `library_report.txt` using `PrintWriter` and `FileWriter`.

---

## 3. Syllabus Mapping of All Classes

| Class / Component | Package | Purpose | Syllabus Concept Demonstrated |
| :--- | :--- | :--- | :--- |
| `DBConnection` | `com.library.util` | Establishes MySQL connection | Static methods, JDBC Driver registration, `SQLException` handling |
| `BookNotAvailableException` | `com.library.exception` | Raised when book copies = 0 | Custom checked exception (`extends Exception`), constructor `super(msg)` |
| `LimitExceededException` | `com.library.exception` | Raised when borrow limit is breached | Custom checked exception (`extends Exception`), business rule enforcement |
| `InvalidInputException` | `com.library.exception` | Raised on invalid user console inputs | Custom unchecked exception (`extends RuntimeException`) |
| `Person` | `com.library.model` | Abstract base class for people | Abstract class, abstract methods, `protected` access modifier |
| `MemberType` | `com.library.model` | Types of members (`STUDENT`, `FACULTY`) | Java `enum`, type-safe constants |
| `Member` | `com.library.model` | Base class for library patrons | Inheritance (`extends`), method overriding, `toString()` |
| `Student` | `com.library.model` | Student member (max 3 books, 14 days) | Multilevel inheritance, polymorphism, method overriding |
| `Faculty` | `com.library.model` | Faculty member (max 5 books, 30 days) | Multilevel inheritance, polymorphism, method overriding |
| `Book` | `com.library.model` | Book entity with inventory counts | Encapsulation, `Comparable<Book>`, `equals()`, `hashCode()`, `toString()` |
| `IssueRecord` | `com.library.model` | Borrow record with issue & due dates | Modern Date API (`java.time.LocalDate`), getters/setters |
| `BookSummary` | `com.library.model` | Lightweight snapshot of book status | Java 17 Records (`record` keyword, immutable data carrier) |
| `BookDAO` | `com.library.dao` | CRUD operations on `books` table | DAO pattern, `PreparedStatement`, `ResultSet`, SQL parameterization |
| `MemberDAO` | `com.library.dao` | Member lookup & persistence | DAO pattern, polymorphic instantiation (`Student` vs `Faculty`) |
| `IssueDAO` | `com.library.dao` | Issue tracking & return status | DAO pattern, SQL queries, handling `java.sql.Date` conversions |
| `LibraryService` | `com.library.service` | Business logic & transaction coordinator | JDBC Transactions (`setAutoCommit`, `commit`, `rollback`), method overloading |
| `Main` | `com.library.ui` | Console UI & reports runner | Java 14+ switch expressions, Lambdas, Streams, Anonymous classes, File I/O |

---

## 4. OOP Concepts & Implementation Matrix

| OOP Concept | Where It Is Used | Exact Code Reference |
| :--- | :--- | :--- |
| **Abstraction** | `Person.java` | `public abstract void displayDetails();` forces subclasses to implement their own display behavior. |
| **Encapsulation** | `Book.java`, `IssueRecord.java` | Private fields (`bookId`, `title`, etc.) accessed strictly through getters and setters. |
| **Inheritance** | `Student extends Member`, `Member extends Person` | Code reuse of common fields (`id`, `name`, `email`) across 3 levels of hierarchy. |
| **Polymorphism (Runtime)** | `MemberDAO.getMemberById()` | Instantiates either a `Student` or `Faculty` object returned as a `Member` reference. |
| **Polymorphism (Compile-time)** | `LibraryService.java` | Overloaded `calculateFine(long, double)` and `calculateFine(LocalDate, LocalDate, MemberType)`. |
| **Interface / Natural Order** | `Book.java` | Implements `Comparable<Book>` and defines `compareTo(Book other)` based on title. |
| **Anonymous Inner Class** | `Main.java` (Option 10) | `new Comparator<Book>() { public int compare(Book b1, Book b2) { ... } }` to sort by author. |
| **Lambda Expression** | `Main.java` (Option 10) | `books.sort((b1, b2) -> b1.getTitle().compareToIgnoreCase(b2.getTitle()));` to sort by title. |
| **Java 17 Record** | `BookSummary.java` | `public record BookSummary(...)` eliminating constructor and getter boilerplate. |
| **Generics & Collections** | Throughout `Main` & DAOs | `List<Book>`, `Map<String, Long>`, `ArrayList<Member>`, type-safe collection handling. |
| **Streams & Aggregations** | `Main.handleStreamReports()` | `filter()`, `map()`, `Collectors.groupingBy()`, and `Collectors.partitioningBy()`. |
| **File I/O** | `Main.handleExportReport()` | `PrintWriter` and `FileWriter` with try-with-resources auto-closing. |

---

## 5. JDBC Transactions: How and Why

### The Problem
When issuing a book, two separate database updates must occur:
1. Decrement `available_copies` in `books`.
2. Insert a new record into `issue_records`.

If step 1 succeeds but step 2 fails (e.g., server crash, database constraint failure), the book's available stock is permanently decreased without any issue record existing to show who took it. This violates database consistency (the "C" in ACID).

### The Solution: Manual JDBC Transaction
In `LibraryService.java`:
```java
Connection conn = DBConnection.getConnection();
try {
    conn.setAutoCommit(false); // 1. Start Transaction

    bookDAO.updateAvailableCopies(bookId, -1, conn);
    issueDAO.insertIssueRecord(record, conn);

    conn.commit(); // 2. Both succeeded, persist permanently
} catch (SQLException e) {
    if (conn != null) {
        conn.rollback(); // 3. Something failed, revert all changes
    }
    throw e;
} finally {
    if (conn != null) {
        conn.setAutoCommit(true); // 4. Restore default state
        conn.close();
    }
}
```
- By disabling `autoCommit`, individual statements are not written permanently to disk immediately.
- `conn.commit()` makes all modifications atomic (all or nothing).
- `conn.rollback()` restores the database state to the exact condition before the transaction started if any failure occurs.

---

## 6. SQL Injection Prevention: Why PreparedStatement is Secure

### The Vulnerability with `Statement`
With basic SQL concatenation:
```java
String sql = "SELECT * FROM books WHERE title = '" + userInput + "'";
```
If an attacker inputs `' OR '1'='1`, the SQL query becomes:
```sql
SELECT * FROM books WHERE title = '' OR '1'='1'
```
This causes the database parser to treat `'1'='1'` as SQL syntax, returning every single row in the database.

### The Defense with `PreparedStatement`
In our project:
```java
String sql = "SELECT * FROM books WHERE title LIKE ? OR author LIKE ? OR category LIKE ?";
PreparedStatement ps = conn.prepareStatement(sql);
ps.setString(1, "%" + keyword + "%");
```
1. **Pre-compilation**: The database compiles the SQL query structure *before* user parameters are bound.
2. **Parameter Treatment**: Values passed via `ps.setString()` are treated strictly as **literal data**, never executable SQL commands.
3. Quotes and special characters (`'`, `;`, `--`) are automatically escaped by the driver, neutralizing SQL injection attempts.

---

## 7. 25 Viva Questions with Short Answers

**Q1: What is the difference between `Comparable` and `Comparator`?**  
**A:** `Comparable` provides a single default natural ordering inside the class via `compareTo()`. `Comparator` allows multiple custom sorting orders defined externally via `compare()`.

**Q2: Why did you make `Person` an abstract class?**  
**A:** Because a generic "Person" does not exist in the library—only specific roles like `Student` or `Faculty` exist. It prevents direct instantiation while sharing common code.

**Q3: What is the benefit of a Java 17 `record`?**  
**A:** A `record` is an immutable data carrier that automatically provides private final fields, a canonical constructor, getters, `equals()`, `hashCode()`, and `toString()`.

**Q4: Why use custom exceptions instead of generic `Exception`?**  
**A:** Custom exceptions like `LimitExceededException` make business rule violations explicit in method signatures and allow precise handling in the UI layer.

**Q5: What is the difference between checked and unchecked exceptions?**  
**A:** Checked exceptions extend `Exception` and must be handled (`try-catch`) or declared (`throws`) at compile-time. Unchecked exceptions extend `RuntimeException` and are checked at runtime.

**Q6: What does `setAutoCommit(false)` do?**  
**A:** It turns off MySQL's default behavior of saving every SQL statement immediately, allowing multiple SQL queries to be grouped into a single atomic transaction.

**Q7: When should `conn.rollback()` be invoked?**  
**A:** Inside the `catch` block of a transaction so that if any SQL query fails, all prior modifications in that transaction are reverted.

**Q8: Why is `PreparedStatement` faster and safer than `Statement`?**  
**A:** It is pre-compiled by the database engine for faster execution with repeated queries, and parameter placeholders (`?`) prevent SQL injection attacks.

**Q9: What is the DAO design pattern?**  
**A:** Data Access Object (DAO) isolates the application/business logic from persistence details, ensuring database queries are concentrated in dedicated classes.

**Q10: Why did you use `LocalDate` instead of `java.util.Date`?**  
**A:** `LocalDate` is immutable, thread-safe, has clearer methods like `plusDays()`, and works seamlessly with `ChronoUnit.DAYS.between()`.

**Q11: What is method overloading? Where did you use it?**  
**A:** Same method name with different parameter lists in the same class. Used in `LibraryService.calculateFine(long, double)` and `calculateFine(LocalDate, LocalDate, MemberType)`.

**Q12: What is method overriding? Where did you use it?**  
**A:** A subclass providing its own implementation of a method defined in its superclass. Used in `Student` and `Faculty` overriding `getMaxBooks()`, `getBorrowDays()`, and `getFineRate()`.

**Q13: How does `instanceof` work?**  
**A:** It checks at runtime whether an object is an instance of a specific class or implements an interface, returning `true` or `false`.

**Q14: What is the difference between upcasting and downcasting?**  
**A:** Upcasting treats a subclass as its superclass (`Member m = new Student(...)`) and is implicit. Downcasting casts a superclass reference back to a subclass (`Student s = (Student) m`) and requires explicit casting.

**Q15: Why override both `equals()` and `hashCode()`?**  
**A:** Java contract requires that if two objects are equal according to `equals()`, they must produce the same `hashCode()`. Failing to do so breaks hash-based collections like `HashSet` and `HashMap`.

**Q16: How does the Java 14+ switch expression differ from traditional switch?**  
**A:** It uses arrow syntax (`case 1 ->`), eliminates accidental fall-through without needing `break`, and can return a value as an expression.

**Q17: What does `Collectors.groupingBy()` do?**  
**A:** It groups stream elements by a classification function and returns a `Map<K, List<T>>` (or another downstream reduction like counting).

**Q18: What does `Collectors.partitioningBy()` do?**  
**A:** It is a special case of `groupingBy` that accepts a `Predicate<T>` and partitions elements into a `Map<Boolean, List<T>>` (`true` and `false` keys).

**Q19: What is an anonymous inner class?**  
**A:** An inner class without a name declared and instantiated in a single expression, used here for the author `Comparator`.

**Q20: What is a lambda expression?**  
**A:** An anonymous function that provides a concise implementation of a single-abstract-method (SAM) functional interface, used here for the title `Comparator`.

**Q21: How does try-with-resources work?**  
**A:** Any resource implementing `AutoCloseable` declared within `try(...)` is automatically closed at block exit, avoiding resource leaks without an explicit `finally` block.

**Q22: Why did you catch `NumberFormatException` in `readIntInput()`?**  
**A:** When `Integer.parseInt()` receives non-numeric text, it throws `NumberFormatException`. Catching it prevents console crashes and re-prompts the user cleanly.

**Q23: What does the `super` keyword do in constructors?**  
**A:** It invokes the constructor of the direct parent class to initialize inherited state before subclass initialization runs.

**Q24: What is the role of `Class.forName("com.mysql.cj.jdbc.Driver")`?**  
**A:** It explicitly loads the MySQL JDBC driver bytecode into the JVM memory, registering it with `DriverManager`.

**Q25: Why is the team size 3 suitable for this project?**  
**A:** A team of 3 allowed clean division of responsibilities: one member handled schema and model hierarchy, one built DAOs and transactional services, and one built UI, stream reporting, and file I/O.

---

## 8. Honest Project Limitations
1. **Plain-Text Password Storage**: Passwords in the `users` table are stored in plain text rather than hashed using BCrypt or SHA-256.
2. **Console Single-Session Only**: The interface is console-based and runs in a single blocking thread, not supporting concurrent multi-user GUI or Web sessions.
3. **Manual Connection Management**: Creates direct database connections per DAO call instead of utilizing an enterprise connection pool like HikariCP.
4. **Hardcoded Database Credentials**: Connection credentials are hardcoded in `DBConnection.java` rather than loaded from an external `.properties` or `.env` configuration file.
