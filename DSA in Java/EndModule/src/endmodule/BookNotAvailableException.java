package endmodule;

/**
 * Requirement 7: Exception Handling
 * Thrown when an operation attempts to check out a book that is already borrowed.
 */
public class BookNotAvailableException extends Exception {
    public BookNotAvailableException(String message) {
        super(message);
    }
}
