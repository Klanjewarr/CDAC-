-- ============================================================
-- Expense Tracker — Database Schema
-- Run this file in MySQL Workbench or the mysql CLI:
--   mysql -u root -p < schema.sql
-- ============================================================

-- 1. Create the database (if it doesn't already exist)
CREATE DATABASE IF NOT EXISTS expense_tracker_db;

-- 2. Switch to the new database
USE expense_tracker_db;

-- 3. Create the transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id              INT             AUTO_INCREMENT PRIMARY KEY,
    title           VARCHAR(255)    NOT NULL,
    amount          DECIMAL(12, 2)  NOT NULL CHECK (amount > 0),
    type            ENUM('income', 'expense') NOT NULL DEFAULT 'expense',
    category        VARCHAR(100)    NOT NULL DEFAULT 'Other',
    payment_method  VARCHAR(50)     NOT NULL DEFAULT 'Cash',
    transaction_date DATE           NOT NULL,
    created_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Indexes for common queries
    INDEX idx_type (type),
    INDEX idx_category (category),
    INDEX idx_transaction_date (transaction_date)
);
