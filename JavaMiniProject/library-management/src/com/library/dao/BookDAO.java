package com.library.dao;

import com.library.model.Book;
import com.library.util.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class BookDAO {

    public void addBook(Book book) throws SQLException {
        String sql = "INSERT INTO books (title, author, category, total_copies, available_copies) VALUES (?, ?, ?, ?, ?)";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, book.getTitle());
            ps.setString(2, book.getAuthor());
            ps.setString(3, book.getCategory());
            ps.setInt(4, book.getTotalCopies());
            ps.setInt(5, book.getAvailableCopies());
            ps.executeUpdate();
        }
    }

    public void updateBook(Book book) throws SQLException {
        String sql = "UPDATE books SET title = ?, author = ?, category = ?, total_copies = ?, available_copies = ? WHERE book_id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, book.getTitle());
            ps.setString(2, book.getAuthor());
            ps.setString(3, book.getCategory());
            ps.setInt(4, book.getTotalCopies());
            ps.setInt(5, book.getAvailableCopies());
            ps.setInt(6, book.getBookId());
            ps.executeUpdate();
        }
    }

    public void deleteBook(int bookId) throws SQLException {
        String sql = "DELETE FROM books WHERE book_id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, bookId);
            ps.executeUpdate();
        }
    }

    public Book getBookById(int bookId) throws SQLException {
        String sql = "SELECT * FROM books WHERE book_id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, bookId);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return new Book(
                            rs.getInt("book_id"),
                            rs.getString("title"),
                            rs.getString("author"),
                            rs.getString("category"),
                            rs.getInt("total_copies"),
                            rs.getInt("available_copies")
                    );
                }
            }
        }
        return null;
    }

    public List<Book> getAllBooks() throws SQLException {
        List<Book> bookList = new ArrayList<>();
        String sql = "SELECT * FROM books";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                bookList.add(new Book(
                        rs.getInt("book_id"),
                        rs.getString("title"),
                        rs.getString("author"),
                        rs.getString("category"),
                        rs.getInt("total_copies"),
                        rs.getInt("available_copies")
                ));
            }
        }
        return bookList;
    }

    public List<Book> searchBooks(String keyword) throws SQLException {
        List<Book> bookList = new ArrayList<>();
        String sql = "SELECT * FROM books WHERE title LIKE ? OR author LIKE ? OR category LIKE ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            String pattern = "%" + keyword + "%";
            ps.setString(1, pattern);
            ps.setString(2, pattern);
            ps.setString(3, pattern);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    bookList.add(new Book(
                            rs.getInt("book_id"),
                            rs.getString("title"),
                            rs.getString("author"),
                            rs.getString("category"),
                            rs.getInt("total_copies"),
                            rs.getInt("available_copies")
                    ));
                }
            }
        }
        return bookList;
    }

    public void updateAvailableCopies(int bookId, int delta, Connection conn) throws SQLException {
        String sql = "UPDATE books SET available_copies = available_copies + ? WHERE book_id = ?";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, delta);
            ps.setInt(2, bookId);
            ps.executeUpdate();
        }
    }
}
