package endmodule;

/**
 * Requirement 7: Exception Handling
 * Thrown when a book with the specified ID cannot be found.
 */
public class BookNotFoundException extends Exception {
    public BookNotFoundException(String message) {
        super(message);
    }
}
