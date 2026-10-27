package endmodule;

/**
 * Requirement 7: Exception Handling
 * Thrown when a member with the specified ID cannot be found.
 */
public class MemberNotFoundException extends Exception {
    public MemberNotFoundException(String message) {
        super(message);
    }
}
