package com.library.model;

import java.time.LocalDate;

public class IssueRecord {

    private int issueId;
    private int bookId;
    private int memberId;
    private LocalDate issueDate;
    private LocalDate dueDate;
    private LocalDate returnDate;
    private double fine;

    public IssueRecord() {
    }

    public IssueRecord(int issueId, int bookId, int memberId, LocalDate issueDate, LocalDate dueDate, LocalDate returnDate, double fine) {
        this.issueId = issueId;
        this.bookId = bookId;
        this.memberId = memberId;
        this.issueDate = issueDate;
        this.dueDate = dueDate;
        this.returnDate = returnDate;
        this.fine = fine;
    }

    public int getIssueId() {
        return issueId;
    }

    public void setIssueId(int issueId) {
        this.issueId = issueId;
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public int getMemberId() {
        return memberId;
    }

    public void setMemberId(int memberId) {
        this.memberId = memberId;
    }

    public LocalDate getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(LocalDate issueDate) {
        this.issueDate = issueDate;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public double getFine() {
        return fine;
    }

    public void setFine(double fine) {
        this.fine = fine;
    }

    @Override
    public String toString() {
        return "IssueRecord [IssueID=" + issueId + ", BookID=" + bookId + ", MemberID=" + memberId + 
               ", IssueDate=" + issueDate + ", DueDate=" + dueDate + 
               ", ReturnDate=" + (returnDate != null ? returnDate : "Not Returned") + 
               ", Fine=Rs " + fine + "]";
    }
}
