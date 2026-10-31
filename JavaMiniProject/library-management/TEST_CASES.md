# 10 Test Cases with Expected Output
**Project:** Library Management System (Core Java 17 + JDBC + MySQL)

---

### Test Case 1: Librarian Login (Valid Credentials)
- **Input:** Username: `admin`, Password: `admin123`
- **Action:** Attempt login at program startup.
- **Expected Output:**
  ```text
  Login successful! Welcome, admin.
  ```
  Enters the main menu loop.

---

### Test Case 2: Librarian Login (Invalid Credentials)
- **Input:** Username: `admin`, Password: `wrongpassword`
- **Action:** Attempt login with bad password.
- **Expected Output:**
  ```text
  Invalid credentials! Attempts remaining: 2
  ```

---

### Test Case 3: Search Books (Safe Parameterization vs SQL Injection)
- **Input:** Option `4` -> Search keyword: `' OR '1'='1`
- **Action:** Attempt standard SQL injection in search prompt.
- **Expected Output:**
  ```text
  No books matched the search keyword.
  ```
  *(Confirms `PreparedStatement` treated `' OR '1'='1` as literal text rather than executable SQL; no data leak).*

---

### Test Case 4: Issue Book within Allowed Limit (Student 1st Book)
- **Input:** Option `8` -> Member ID: `1` (Rahul Sharma, Student), Book ID: `1` (Effective Java)
- **Action:** Issue book to student who has 0 active borrowings.
- **Expected Output:**
  ```text
  Book issued successfully with transaction committed!
  ```
  Database verification: `books.available_copies` drops from 5 to 4; new row appears in `issue_records`.

---

### Test Case 5: Student Borrowing 4th Book (Limit Violation)
- **Pre-condition:** Member 1 already has 3 active borrowed books.
- **Input:** Option `8` -> Member ID: `1`, Book ID: `4`
- **Action:** Issue a 4th book to a student.
- **Expected Output:**
  ```text
  Business Rule Error: Borrowing limit exceeded! STUDENT can borrow a maximum of 3 books.
  ```
  *(Handled via `LimitExceededException`; transaction is aborted and stock is not reduced).*

---

### Test Case 6: Issue Book with Zero Stock Available
- **Pre-condition:** Book 15 (`Artificial Intelligence: A Modern Approach`) has `available_copies = 0`.
- **Input:** Option `8` -> Member ID: `4` (Dr. Sunita Rao, Faculty), Book ID: `15`
- **Action:** Request to issue out-of-stock book.
- **Expected Output:**
  ```text
  Business Rule Error: No copies available for book: Artificial Intelligence: A Modern Approach
  ```
  *(Handled via `BookNotAvailableException`; stock unchanged).*

---

### Test Case 7: Return Book on Time (Zero Fine)
- **Pre-condition:** Issue ID 1 returned within 14 days of issue date.
- **Input:** Option `9` -> Issue ID: `1`
- **Action:** Process return for on-time loan.
- **Expected Output:**
  ```text
  Book returned successfully!
  Returned on time. No fine levied.
  ```
  Database verification: `issue_records.return_date` set to current date, `fine = 0.0`, `available_copies` incremented back by 1.

---

### Test Case 8: Return Book Overdue (Fine Calculation Verification)
- **Pre-condition:** Issue record where `due_date` is 5 days in the past for a Student (Rs 2/day rate).
- **Input:** Option `9` -> Issue ID for overdue record
- **Action:** Return overdue book.
- **Expected Output:**
  ```text
  Book returned successfully!
  Late Return Fine to Collect: Rs 10.0
  ```
  *(Calculation: 5 days late * Rs 2.0 = Rs 10.0 recorded in database).*

---

### Test Case 9: Sort Inventory by Author and Title
- **Input:** Option `10` -> Option `1` (by Author), then Option `2` (by Title)
- **Action:** Test anonymous class and lambda Comparators.
- **Expected Output:**
  - Option 1 displays books sorted alphabetically by author (`Abraham Silberschatz`, `Andrew S. Tanenbaum`, etc.).
  - Option 2 displays books sorted alphabetically by title (`Artificial Intelligence...`, `Clean Code`, etc.).

---

### Test Case 10: Stream Reports and Export to File
- **Input:** Option `11` (Stream Reports), then Option `12` (Export Report)
- **Action:** Run grouping, partitioning, and write to file.
- **Expected Output:**
  - Console prints:
    - Overdue issues list
    - Category groupings (`Programming: 4`, `Operating Systems: 2`, etc.)
    - Available vs unavailable breakdown
  - Option 12 outputs:
    ```text
    Report successfully exported to: library_report.txt
    ```
  - File `library_report.txt` is created on disk with formatted report contents.
