package endmodule;

/**
 * Backward compatibility alias for Book class.
 */
public class Books extends Book {
    public Books() {
        super();
    }

    public Books(int bookId, String title, String author) {
        super(bookId, title, author);
    }

    public Books(int bookId, String title, String author, boolean availability) {
        super(bookId, title, author, availability);
    }
}
