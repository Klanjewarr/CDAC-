-- ========================================================
-- Library Management System Database Schema & Sample Data
-- Team Size: 3
-- ========================================================

CREATE DATABASE IF NOT EXISTS library_db;
USE library_db;

-- 1. Table: users (Librarian login)
CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(50) NOT NULL
);

-- 2. Table: books
CREATE TABLE IF NOT EXISTS books (
    book_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    author VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    total_copies INT NOT NULL,
    available_copies INT NOT NULL
);

-- 3. Table: members
CREATE TABLE IF NOT EXISTS members (
    member_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    member_type VARCHAR(20) NOT NULL
);

-- 4. Table: issue_records
CREATE TABLE IF NOT EXISTS issue_records (
    issue_id INT PRIMARY KEY AUTO_INCREMENT,
    book_id INT NOT NULL,
    member_id INT NOT NULL,
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE NULL,
    fine DOUBLE DEFAULT 0.0,
    FOREIGN KEY (book_id) REFERENCES books(book_id),
    FOREIGN KEY (member_id) REFERENCES members(member_id)
);

-- Sample Data: 1 Librarian login
INSERT INTO users (username, password) VALUES 
('admin', 'admin123')
ON DUPLICATE KEY UPDATE password=password;

-- Sample Data: 15 Books across diverse categories
INSERT INTO books (title, author, category, total_copies, available_copies) VALUES
('Effective Java', 'Joshua Bloch', 'Programming', 5, 5),
('Clean Code', 'Robert C. Martin', 'Programming', 4, 4),
('Head First Java', 'Kathy Sierra', 'Programming', 6, 6),
('Introduction to Algorithms', 'Thomas H. Cormen', 'Algorithms', 3, 3),
('Design Patterns', 'Erich Gamma', 'Software Engineering', 4, 4),
('Database System Concepts', 'Abraham Silberschatz', 'Databases', 5, 5),
('SQL Antipatterns', 'Bill Karwin', 'Databases', 3, 3),
('Operating System Concepts', 'Peter B. Galvin', 'Operating Systems', 4, 4),
('Computer Networks', 'Andrew S. Tanenbaum', 'Networking', 4, 4),
('Let Us C', 'Yashavant Kanetkar', 'Programming', 7, 7),
('Modern Operating Systems', 'Andrew S. Tanenbaum', 'Operating Systems', 3, 3),
('Cracking the Coding Interview', 'Gayle Laakmann McDowell', 'Career', 5, 5),
('The Pragmatic Programmer', 'David Thomas', 'Software Engineering', 3, 3),
('Data Structures and Algorithms in Java', 'Robert Lafore', 'Algorithms', 4, 4),
('Artificial Intelligence: A Modern Approach', 'Stuart Russell', 'AI', 2, 2);

-- Sample Data: 5 Members (3 Students, 2 Faculty)
INSERT INTO members (name, email, member_type) VALUES
('Rahul Sharma', 'rahul.sharma@email.com', 'STUDENT'),
('Priya Patel', 'priya.patel@email.com', 'STUDENT'),
('Amit Verma', 'amit.verma@email.com', 'STUDENT'),
('Dr. Sunita Rao', 'sunita.rao@email.com', 'FACULTY'),
('Prof. Rajesh Nair', 'rajesh.nair@email.com', 'FACULTY');
