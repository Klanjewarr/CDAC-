package com.library.service;

import com.library.dao.BookDAO;
import com.library.dao.IssueDAO;
import com.library.dao.MemberDAO;
import com.library.exception.BookNotAvailableException;
import com.library.exception.InvalidInputException;
import com.library.exception.LimitExceededException;
import com.library.model.Book;
import com.library.model.IssueRecord;
import com.library.model.Member;
import com.library.model.MemberType;
import com.library.util.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

public class LibraryService {

    private BookDAO bookDAO;
    private MemberDAO memberDAO;
    private IssueDAO issueDAO;

    public LibraryService() {
        this.bookDAO = new BookDAO();
        this.memberDAO = new MemberDAO();
        this.issueDAO = new IssueDAO();
    }

    public boolean login(String username, String password) throws SQLException {
        String sql = "SELECT * FROM users WHERE username = ? AND password = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, username);
            ps.setString(2, password);
            try (ResultSet rs = ps.executeQuery()) {
                return rs.next();
            }
        }
    }

    public int issueBook(int memberId, int bookId) throws SQLException, LimitExceededException, BookNotAvailableException {
        Member member = memberDAO.getMemberById(memberId);
        if (member == null) {
            throw new InvalidInputException("Member not found with ID: " + memberId);
        }

        int activeIssues = issueDAO.getActiveIssueCount(memberId);
        if (activeIssues >= member.getMaxBooks()) {
            throw new LimitExceededException("Borrowing limit exceeded! " + member.getMemberType() + 
                    " can borrow a maximum of " + member.getMaxBooks() + " books.");
        }

        Book book = bookDAO.getBookById(bookId);
        if (book == null) {
            throw new InvalidInputException("Book not found with ID: " + bookId);
        }
        if (book.getAvailableCopies() <= 0) {
            throw new BookNotAvailableException("No copies available for book: " + book.getTitle());
        }

        // JDBC Transaction for issuing
        Connection conn = null;
        int generatedIssueId = 0;
        try {
            conn = DBConnection.getConnection();
            conn.setAutoCommit(false);

            bookDAO.updateAvailableCopies(bookId, -1, conn);

            LocalDate issueDate = LocalDate.now();
            LocalDate dueDate = issueDate.plusDays(member.getBorrowDays());
            IssueRecord record = new IssueRecord(0, bookId, memberId, issueDate, dueDate, null, 0.0);
            generatedIssueId = issueDAO.insertIssueRecord(record, conn);

            conn.commit();
        } catch (SQLException e) {
            if (conn != null) {
                try {
                    conn.rollback();
                } catch (SQLException ex) {
                    System.out.println("Rollback failed: " + ex.getMessage());
                }
            }
            throw e;
        } finally {
            if (conn != null) {
                try {
                    conn.setAutoCommit(true);
                    conn.close();
                } catch (SQLException ex) {
                    System.out.println("Connection close failed: " + ex.getMessage());
                }
            }
        }

        return generatedIssueId;
    }

    public double calculateFine(long daysLate, double ratePerDay) {
        if (daysLate > 0) {
            return daysLate * ratePerDay;
        }
        return 0.0;
    }

    public double calculateFine(LocalDate dueDate, LocalDate returnDate, MemberType type) {
        long daysLate = ChronoUnit.DAYS.between(dueDate, returnDate);
        double rate = (type == MemberType.STUDENT) ? 2.0 : 1.0;
        return calculateFine(daysLate, rate);
    }

    public double returnBook(int issueId) throws SQLException {
        IssueRecord record = issueDAO.getIssueById(issueId);
        if (record == null) {
            throw new InvalidInputException("Issue record not found with ID: " + issueId);
        }
        if (record.getReturnDate() != null) {
            throw new InvalidInputException("Book was already returned on: " + record.getReturnDate());
        }

        Member member = memberDAO.getMemberById(record.getMemberId());
        LocalDate returnDate = LocalDate.now();
        double fine = calculateFine(record.getDueDate(), returnDate, member.getMemberType());

        // JDBC Transaction for returning
        Connection conn = null;
        try {
            conn = DBConnection.getConnection();
            conn.setAutoCommit(false);

            issueDAO.updateReturn(issueId, returnDate, fine, conn);
            bookDAO.updateAvailableCopies(record.getBookId(), 1, conn);

            conn.commit();
        } catch (SQLException e) {
            if (conn != null) {
                try {
                    conn.rollback();
                } catch (SQLException ex) {
                    System.out.println("Rollback failed: " + ex.getMessage());
                }
            }
            throw e;
        } finally {
            if (conn != null) {
                try {
                    conn.setAutoCommit(true);
                    conn.close();
                } catch (SQLException ex) {
                    System.out.println("Connection close failed: " + ex.getMessage());
                }
            }
        }

        return fine;
    }

    public BookDAO getBookDAO() {
        return bookDAO;
    }

    public MemberDAO getMemberDAO() {
        return memberDAO;
    }

    public IssueDAO getIssueDAO() {
        return issueDAO;
    }
}
