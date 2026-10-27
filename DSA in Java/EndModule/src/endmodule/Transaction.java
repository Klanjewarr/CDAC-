package endmodule;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

/**
 * Requirement 1 & 4: Transaction Class
 * Represents a borrow/return transaction in the library system.
 * Attributes: transactionId, book, member, checkoutDate, returnDate
 * Methods: calculateFine(), isOverdue(), completeReturn(), toString()
 */
public class Transaction implements Serializable {
    private static final long serialVersionUID = 1L;

    public static final int ALLOWED_DAYS = 14;     // Maximum allowed borrowing period in days
    public static final double DAILY_FINE_RATE = 5.0; // Fine per day overdue in Rupees

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE;

    private int transactionId;
    private Book book;
    private LibraryMember member;
    private LocalDate checkoutDate;
    private LocalDate returnDate; // null if book is currently checked out

    // Constructors
    public Transaction() {
    }

    public Transaction(int transactionId, Book book, LibraryMember member, LocalDate checkoutDate) {
        this.transactionId = transactionId;
        this.book = book;
        this.member = member;
        this.checkoutDate = checkoutDate;
        this.returnDate = null;
    }

    public Transaction(int transactionId, Book book, LibraryMember member, LocalDate checkoutDate, LocalDate returnDate) {
        this.transactionId = transactionId;
        this.book = book;
        this.member = member;
        this.checkoutDate = checkoutDate;
        this.returnDate = returnDate;
    }

    // Requirement 4 method: isOverdue()
    public boolean isOverdue() {
        if (checkoutDate == null) {
            return false;
        }
        LocalDate effectiveDate = (returnDate != null) ? returnDate : LocalDate.now();
        LocalDate dueDate = checkoutDate.plusDays(ALLOWED_DAYS);
        return effectiveDate.isAfter(dueDate);
    }

    // Requirement 4 method: calculateFine()
    public double calculateFine() {
        if (checkoutDate == null) {
            return 0.0;
        }
        LocalDate effectiveDate = (returnDate != null) ? returnDate : LocalDate.now();
        LocalDate dueDate = checkoutDate.plusDays(ALLOWED_DAYS);

        if (effectiveDate.isAfter(dueDate)) {
            long overdueDays = ChronoUnit.DAYS.between(dueDate, effectiveDate);
            return overdueDays * DAILY_FINE_RATE;
        }
        return 0.0;
    }

    public long getOverdueDays() {
        if (checkoutDate == null) {
            return 0;
        }
        LocalDate effectiveDate = (returnDate != null) ? returnDate : LocalDate.now();
        LocalDate dueDate = checkoutDate.plusDays(ALLOWED_DAYS);
        if (effectiveDate.isAfter(dueDate)) {
            return ChronoUnit.DAYS.between(dueDate, effectiveDate);
        }
        return 0;
    }

    public void completeReturn(LocalDate date) {
        this.returnDate = date;
    }

    // Getters and Setters
    public int getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(int transactionId) {
        this.transactionId = transactionId;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public LibraryMember getMember() {
        return member;
    }

    public void setMember(LibraryMember member) {
        this.member = member;
    }

    public LocalDate getCheckoutDate() {
        return checkoutDate;
    }

    public void setCheckoutDate(LocalDate checkoutDate) {
        this.checkoutDate = checkoutDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public LocalDate getDueDate() {
        return (checkoutDate != null) ? checkoutDate.plusDays(ALLOWED_DAYS) : null;
    }

    // File formatting helpers
    public String toFileString() {
        int bId = (book != null) ? book.getBookId() : -1;
        int mId = (member != null) ? member.getMemberId() : -1;
        String cDateStr = (checkoutDate != null) ? checkoutDate.format(DATE_FORMATTER) : "";
        String rDateStr = (returnDate != null) ? returnDate.format(DATE_FORMATTER) : "NONE";
        return transactionId + ";" + bId + ";" + mId + ";" + cDateStr + ";" + rDateStr;
    }

    @Override
    public String toString() {
        String bookTitle = (book != null) ? book.getTitle() : "Unknown";
        String memberName = (member != null) ? member.getName() : "Unknown";
        String status = (returnDate == null) ? "ACTIVE" : "RETURNED (" + returnDate + ")";
        double fine = calculateFine();

        return String.format("[TX #%-4d] Member: %-15s | Book: %-25s | CheckedOut: %s | Due: %s | Status: %-18s | Fine: Rs. %.2f",
                transactionId, memberName, bookTitle, checkoutDate, getDueDate(), status, fine);
    }
}
