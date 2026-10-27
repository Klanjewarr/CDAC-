package endmodule;

import java.io.Serializable;

/**
 * Requirement 1 & 2: Book Class
 * Represents a book in the library system.
 * Attributes: title, author, availability, bookId
 * Methods: checkOut(), returnBook(), getters/setters, toString()
 */
public class Book implements Serializable {
    private static final long serialVersionUID = 1L;

    private int bookId;
    private String title;
    private String author;
    private boolean availability; // true = Available, false = Checked Out

    // Constructors
    public Book() {
        this.availability = true;
    }

    public Book(int bookId, String title, String author) {
        this(bookId, title, author, true);
    }

    public Book(int bookId, String title, String author, boolean availability) {
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.availability = availability;
    }

    // Requirement 2 methods: checkOut() & returnBook()
    public void checkOut() {
        this.availability = false;
    }

    public void returnBook() {
        this.availability = true;
    }

    // Getters and Setters
    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public boolean isAvailable() {
        return availability;
    }

    public void setAvailability(boolean availability) {
        this.availability = availability;
    }

    // File formatting helpers for persistent text storage
    public String toFileString() {
        return bookId + ";" + escape(title) + ";" + escape(author) + ";" + availability;
    }

    public static Book fromFileString(String line) {
        String[] parts = line.split(";", -1);
        if (parts.length < 4) {
            return null;
        }
        int id = Integer.parseInt(parts[0].trim());
        String title = unescape(parts[1].trim());
        String author = unescape(parts[2].trim());
        boolean avail = Boolean.parseBoolean(parts[3].trim());
        return new Book(id, title, author, avail);
    }

    private static String escape(String s) {
        return s.replace(";", ",");
    }

    private static String unescape(String s) {
        return s;
    }

    @Override
    public String toString() {
        return String.format("[ID: %-4d] \"%-30s\" by %-20s | Status: %s",
                bookId, title, author, (availability ? "AVAILABLE" : "CHECKED OUT"));
    }
}
