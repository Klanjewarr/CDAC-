package endmodule;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Requirement 1 & 3: LibraryMember Class
 * Represents a member of the library.
 * Attributes: memberId, name, booksBorrowed, borrowedBookIds
 * Methods: borrowBook(), returnBook(), getters/setters, toString()
 */
public class LibraryMember implements Serializable {
    private static final long serialVersionUID = 1L;

    public static final int MAX_BORROW_LIMIT = 3; // Maximum allowed books at a time

    private int memberId;
    private String name;
    private int booksBorrowed; // Current count of borrowed books
    private List<Integer> borrowedBookIds; // IDs of books currently borrowed

    // Constructors
    public LibraryMember() {
        this.borrowedBookIds = new ArrayList<>();
        this.booksBorrowed = 0;
    }

    public LibraryMember(int memberId, String name) {
        this.memberId = memberId;
        this.name = name;
        this.booksBorrowed = 0;
        this.borrowedBookIds = new ArrayList<>();
    }

    public LibraryMember(int memberId, String name, int booksBorrowed, List<Integer> borrowedBookIds) {
        this.memberId = memberId;
        this.name = name;
        this.booksBorrowed = booksBorrowed;
        this.borrowedBookIds = (borrowedBookIds != null) ? borrowedBookIds : new ArrayList<>();
    }

    // Requirement 3 methods: borrowBook() & returnBook()
    public void borrowBook(int bookId) throws MaxBooksBorrowedException {
        if (booksBorrowed >= MAX_BORROW_LIMIT) {
            throw new MaxBooksBorrowedException("Member " + name + " (ID: " + memberId
                    + ") has already borrowed the maximum limit of " + MAX_BORROW_LIMIT + " books.");
        }
        if (!borrowedBookIds.contains(bookId)) {
            borrowedBookIds.add(bookId);
        }
        booksBorrowed = borrowedBookIds.size();
    }

    public void returnBook(int bookId) {
        borrowedBookIds.remove(Integer.valueOf(bookId));
        booksBorrowed = borrowedBookIds.size();
    }

    public boolean hasBorrowedBook(int bookId) {
        return borrowedBookIds.contains(bookId);
    }

    public boolean canBorrow() {
        return booksBorrowed < MAX_BORROW_LIMIT;
    }

    // Getters and Setters
    public int getMemberId() {
        return memberId;
    }

    public void setMemberId(int memberId) {
        this.memberId = memberId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getBooksBorrowed() {
        return booksBorrowed;
    }

    public void setBooksBorrowed(int booksBorrowed) {
        this.booksBorrowed = booksBorrowed;
    }

    public List<Integer> getBorrowedBookIds() {
        return new ArrayList<>(borrowedBookIds);
    }

    public void setBorrowedBookIds(List<Integer> borrowedBookIds) {
        this.borrowedBookIds = (borrowedBookIds != null) ? borrowedBookIds : new ArrayList<>();
        this.booksBorrowed = this.borrowedBookIds.size();
    }

    // File formatting helpers
    public String toFileString() {
        StringBuilder sb = new StringBuilder();
        sb.append(memberId).append(";").append(escape(name)).append(";").append(booksBorrowed).append(";");
        for (int i = 0; i < borrowedBookIds.size(); i++) {
            sb.append(borrowedBookIds.get(i));
            if (i < borrowedBookIds.size() - 1) {
                sb.append(",");
            }
        }
        return sb.toString();
    }

    public static LibraryMember fromFileString(String line) {
        String[] parts = line.split(";", -1);
        if (parts.length < 3) {
            return null;
        }
        int id = Integer.parseInt(parts[0].trim());
        String name = unescape(parts[1].trim());
        int count = Integer.parseInt(parts[2].trim());
        List<Integer> ids = new ArrayList<>();
        if (parts.length >= 4 && !parts[3].trim().isEmpty()) {
            String[] idTokens = parts[3].split(",");
            for (String tok : idTokens) {
                if (!tok.trim().isEmpty()) {
                    ids.add(Integer.parseInt(tok.trim()));
                }
            }
        }
        return new LibraryMember(id, name, count, ids);
    }

    private static String escape(String s) {
        return s.replace(";", ",");
    }

    private static String unescape(String s) {
        return s;
    }

    @Override
    public String toString() {
        return String.format("[ID: %-4d] %-20s | Books Borrowed: %d / %d | Active Book IDs: %s",
                memberId, name, booksBorrowed, MAX_BORROW_LIMIT, borrowedBookIds.toString());
    }
}
