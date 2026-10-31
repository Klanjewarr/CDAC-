package com.library.dao;

import com.library.model.IssueRecord;
import com.library.util.DBConnection;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class IssueDAO {

    public int getActiveIssueCount(int memberId) throws SQLException {
        String sql = "SELECT COUNT(*) FROM issue_records WHERE member_id = ? AND return_date IS NULL";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, memberId);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt(1);
                }
            }
        }
        return 0;
    }

    public int insertIssueRecord(IssueRecord record, Connection conn) throws SQLException {
        String sql = "INSERT INTO issue_records (book_id, member_id, issue_date, due_date, return_date, fine) VALUES (?, ?, ?, ?, ?, ?)";
        try (PreparedStatement ps = conn.prepareStatement(sql, java.sql.Statement.RETURN_GENERATED_KEYS)) {
            ps.setInt(1, record.getBookId());
            ps.setInt(2, record.getMemberId());
            ps.setDate(3, Date.valueOf(record.getIssueDate()));
            ps.setDate(4, Date.valueOf(record.getDueDate()));
            if (record.getReturnDate() != null) {
                ps.setDate(5, Date.valueOf(record.getReturnDate()));
            } else {
                ps.setNull(5, java.sql.Types.DATE);
            }
            ps.setDouble(6, record.getFine());
            ps.executeUpdate();

            try (ResultSet rs = ps.getGeneratedKeys()) {
                if (rs.next()) {
                    return rs.getInt(1);
                }
            }
        }
        return 0;
    }

    public IssueRecord getIssueById(int issueId) throws SQLException {
        String sql = "SELECT * FROM issue_records WHERE issue_id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, issueId);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    Date retDate = rs.getDate("return_date");
                    LocalDate returnLocalDate = (retDate != null) ? retDate.toLocalDate() : null;

                    return new IssueRecord(
                            rs.getInt("issue_id"),
                            rs.getInt("book_id"),
                            rs.getInt("member_id"),
                            rs.getDate("issue_date").toLocalDate(),
                            rs.getDate("due_date").toLocalDate(),
                            returnLocalDate,
                            rs.getDouble("fine")
                    );
                }
            }
        }
        return null;
    }

    public void updateReturn(int issueId, LocalDate returnDate, double fine, Connection conn) throws SQLException {
        String sql = "UPDATE issue_records SET return_date = ?, fine = ? WHERE issue_id = ?";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setDate(1, Date.valueOf(returnDate));
            ps.setDouble(2, fine);
            ps.setInt(3, issueId);
            ps.executeUpdate();
        }
    }

    public List<IssueRecord> getAllIssues() throws SQLException {
        List<IssueRecord> list = new ArrayList<>();
        String sql = "SELECT * FROM issue_records";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                Date retDate = rs.getDate("return_date");
                LocalDate returnLocalDate = (retDate != null) ? retDate.toLocalDate() : null;

                list.add(new IssueRecord(
                        rs.getInt("issue_id"),
                        rs.getInt("book_id"),
                        rs.getInt("member_id"),
                        rs.getDate("issue_date").toLocalDate(),
                        rs.getDate("due_date").toLocalDate(),
                        returnLocalDate,
                        rs.getDouble("fine")
                ));
            }
        }
        return list;
    }
}
