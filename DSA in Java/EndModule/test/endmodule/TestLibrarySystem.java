package endmodule;

import java.io.File;
import java.time.LocalDate;

public class TestLibrarySystem {
    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("  STARTING AUTOMATED TESTS FOR ASSIGNMENT TASKS   ");
        System.out.println("==================================================");

        int passed = 0;
        int failed = 0;

        // Test 1: Book Class functionality
        try {
            Book book = new Book(1, "Test Book", "Test Author", true);
            if (!book.isAvailable()) throw new AssertionError("Book should be available initially");
            book.checkOut();
            if (book.isAvailable()) throw new AssertionError("Book should be unavailable after checkOut()");
            book.returnBook();
            if (!book.isAvailable()) throw new AssertionError("Book should be available after returnBook()");
            System.out.println("[PASS] Test 1: Book class and methods checkOut()/returnBook()");
            passed++;
        } catch (Exception e) {
            System.err.println("[FAIL] Test 1: " + e.getMessage());
            failed++;
        }

        // Test 2: LibraryMember Class functionality & Max limit
        try {
            LibraryMember member = new LibraryMember(1, "John Doe");
            member.borrowBook(101);
            member.borrowBook(102);
            member.borrowBook(103);
            if (member.getBooksBorrowed() != 3) throw new AssertionError("Expected 3 borrowed books");

            boolean limitCaught = false;
            try {
                member.borrowBook(104);
            } catch (MaxBooksBorrowedException ex) {
                limitCaught = true;
            }
            if (!limitCaught) throw new AssertionError("Expected MaxBooksBorrowedException when exceeding limit");

            member.returnBook(102);
            if (member.getBooksBorrowed() != 2) throw new AssertionError("Expected 2 borrowed books after return");

            System.out.println("[PASS] Test 2: LibraryMember borrowBook(), returnBook() & MaxBooksBorrowedException");
            passed++;
        } catch (Exception e) {
            System.err.println("[FAIL] Test 2: " + e.getMessage());
            failed++;
        }

        // Test 3: Transaction overdue & fine calculation
        try {
            Book b = new Book(201, "Java Concurrency", "Brian Goetz");
            LibraryMember m = new LibraryMember(2, "Alice");
            LocalDate pastCheckout = LocalDate.now().minusDays(20); // 20 days ago (due 6 days ago for 14-day limit)
            Transaction tx = new Transaction(99, b, m, pastCheckout);

            if (!tx.isOverdue()) throw new AssertionError("Transaction should be overdue");
            double fine = tx.calculateFine(); // 6 days * 5 = 30.0
            if (fine != 30.0) throw new AssertionError("Expected fine 30.0, got: " + fine);

            System.out.println("[PASS] Test 3: Transaction isOverdue() and calculateFine() calculation");
            passed++;
        } catch (Exception e) {
            System.err.println("[FAIL] Test 3: " + e.getMessage());
            failed++;
        }

        // Test 4: Library borrowing workflow and BookNotAvailableException
        try {
            // Clean test data directory
            File dir = new File("data");
            if (dir.exists()) {
                for (File f : dir.listFiles()) {
                    f.delete();
                }
            }

            Library lib = new Library();
            lib.addBook(new Book(501, "Effective Java", "Joshua Bloch"));
            lib.registerMember(new LibraryMember(601, "Bob"));

            Transaction tx = lib.borrowBook(601, 501);
            if (tx == null) throw new AssertionError("Transaction should not be null");

            // Attempt to borrow same book again
            boolean unavailableCaught = false;
            try {
                lib.borrowBook(601, 501);
            } catch (BookNotAvailableException ex) {
                unavailableCaught = true;
            }
            if (!unavailableCaught) throw new AssertionError("Expected BookNotAvailableException for already borrowed book");

            // Return the book
            Transaction retTx = lib.returnBook(601, 501);
            if (retTx.getReturnDate() == null) throw new AssertionError("Return date should be set");
            if (!lib.findBookById(501).isAvailable()) throw new AssertionError("Book should be available after return");

            System.out.println("[PASS] Test 4: Library borrowBook, returnBook & BookNotAvailableException");
            passed++;
        } catch (Exception e) {
            System.err.println("[FAIL] Test 4: " + e.getMessage());
            failed++;
        }

        // Test 5: File I/O Persistence
        try {
            Library lib1 = new Library();
            lib1.addBook(new Book(888, "Persistent Testing", "Jane Doe"));
            lib1.saveToFile();

            // Create a fresh instance to load from file
            Library lib2 = new Library();
            Book loadedBook = lib2.findBookById(888);
            if (loadedBook == null || !"Persistent Testing".equals(loadedBook.getTitle())) {
                throw new AssertionError("Book not loaded correctly from file");
            }

            System.out.println("[PASS] Test 5: File I/O persistence saveToFile() and loadFromFile()");
            passed++;
        } catch (Exception e) {
            System.err.println("[FAIL] Test 5: " + e.getMessage());
            failed++;
        }

        System.out.println("==================================================");
        System.out.println("RESULTS: " + passed + " Passed, " + failed + " Failed.");
        System.out.println("==================================================");
    }
}
