package endmodule;

/**
 * Requirement 7: Exception Handling
 * Thrown when a library member has reached the maximum permitted borrow limit.
 */
public class MaxBooksBorrowedException extends Exception {
    public MaxBooksBorrowedException(String message) {
        super(message);
    }
}
