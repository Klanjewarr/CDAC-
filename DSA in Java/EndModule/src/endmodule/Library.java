package endmodule;

import java.io.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

/**
 * Requirement 5: Library Class (6 Marks)
 * Requirement 6: User Interface (5 Marks)
 * Requirement 7: Exception Handling (5 Marks)
 * Requirement 8: File I/O (6 Marks)
 *
 * Manages books, members, and transactions with persistent storage and console UI.
 */
public class Library {

    // Persistent storage files
    private static final String DATA_DIR = "data";
    private static final String BOOKS_FILE = DATA_DIR + File.separator + "books.txt";
    private static final String MEMBERS_FILE = DATA_DIR + File.separator + "members.txt";
    private static final String TRANSACTIONS_FILE = DATA_DIR + File.separator + "transactions.txt";

    // Requirement 5: Maintain lists of books, library members, and transactions
    private List<Book> books;
    private List<LibraryMember> members;
    private List<Transaction> transactions;

    private int nextBookId = 101;
    private int nextMemberId = 1001;
    private int nextTransactionId = 5001;

    public Library() {
        this.books = new ArrayList<>();
        this.members = new ArrayList<>();
        this.transactions = new ArrayList<>();
        loadFromFile();
    }

    // ==========================================
    // Requirement 5: Core Management Methods
    // ==========================================

    /**
     * Adds a new book to the library catalogue.
     */
    public void addBook(Book book) {
        if (book != null) {
            books.add(book);
            if (book.getBookId() >= nextBookId) {
                nextBookId = book.getBookId() + 1;
            }
            saveToFile();
            System.out.println("Book added successfully: " + book.getTitle());
        }
    }

    /**
     * Registers a new library member.
     */
    public void registerMember(LibraryMember member) {
        if (member != null) {
            members.add(member);
            if (member.getMemberId() >= nextMemberId) {
                nextMemberId = member.getMemberId() + 1;
            }
            saveToFile();
            System.out.println("Member registered successfully: " + member.getName() + " (ID: " + member.getMemberId() + ")");
        }
    }

    /**
     * Requirement 5 & 7: Borrow a book with thorough exception handling.
     */
    public Transaction borrowBook(int memberId, int bookId)
            throws MemberNotFoundException, BookNotFoundException, BookNotAvailableException, MaxBooksBorrowedException {

        LibraryMember member = findMemberById(memberId);
        if (member == null) {
            throw new MemberNotFoundException("Member with ID " + memberId + " not found!");
        }

        Book book = findBookById(bookId);
        if (book == null) {
            throw new BookNotFoundException("Book with ID " + bookId + " not found!");
        }

        if (!book.isAvailable()) {
            throw new BookNotAvailableException("The book \"" + book.getTitle() + "\" (ID: " + bookId + ") is currently NOT available (already borrowed).");
        }

        if (!member.canBorrow()) {
            throw new MaxBooksBorrowedException("Member \"" + member.getName() + "\" has already reached the maximum borrowing limit ("
                    + LibraryMember.MAX_BORROW_LIMIT + " books).");
        }

        // Perform borrow operations
        book.checkOut();
        member.borrowBook(bookId);

        Transaction transaction = new Transaction(nextTransactionId++, book, member, LocalDate.now());
        transactions.add(transaction);

        saveToFile();
        return transaction;
    }

    /**
     * Requirement 5 & 7: Return a book, calculate overdue fine, and update records.
     */
    public Transaction returnBook(int memberId, int bookId)
            throws MemberNotFoundException, BookNotFoundException, Exception {

        LibraryMember member = findMemberById(memberId);
        if (member == null) {
            throw new MemberNotFoundException("Member with ID " + memberId + " not found!");
        }

        Book book = findBookById(bookId);
        if (book == null) {
            throw new BookNotFoundException("Book with ID " + bookId + " not found!");
        }

        if (!member.hasBorrowedBook(bookId)) {
            throw new Exception("Member \"" + member.getName() + "\" does not have Book ID " + bookId + " registered as borrowed.");
        }

        // Find active transaction for this book and member
        Transaction activeTx = null;
        for (Transaction tx : transactions) {
            if (tx.getReturnDate() == null && tx.getBook() != null && tx.getBook().getBookId() == bookId
                    && tx.getMember() != null && tx.getMember().getMemberId() == memberId) {
                activeTx = tx;
                break;
            }
        }

        // Complete return
        book.returnBook();
        member.returnBook(bookId);

        LocalDate returnDate = LocalDate.now();
        if (activeTx != null) {
            activeTx.completeReturn(returnDate);
        } else {
            // In case transaction record was missing, create historical record
            activeTx = new Transaction(nextTransactionId++, book, member, returnDate.minusDays(7), returnDate);
            transactions.add(activeTx);
        }

        saveToFile();
        return activeTx;
    }

    // Lookup helpers
    public Book findBookById(int bookId) {
        for (Book b : books) {
            if (b.getBookId() == bookId) {
                return b;
            }
        }
        return null;
    }

    public LibraryMember findMemberById(int memberId) {
        for (LibraryMember m : members) {
            if (m.getMemberId() == memberId) {
                return m;
            }
        }
        return null;
    }

    // ==========================================
    // Display Methods
    // ==========================================

    public void displayAllBooks() {
        System.out.println("\n--------------------------------- ALL BOOKS ---------------------------------");
        if (books.isEmpty()) {
            System.out.println("No books in library.");
            return;
        }
        for (Book b : books) {
            System.out.println(b);
        }
        System.out.println("-----------------------------------------------------------------------------");
    }

    public void displayAvailableBooks() {
        System.out.println("\n------------------------------ AVAILABLE BOOKS ------------------------------");
        boolean found = false;
        for (Book b : books) {
            if (b.isAvailable()) {
                System.out.println(b);
                found = true;
            }
        }
        if (!found) {
            System.out.println("No books are currently available.");
        }
        System.out.println("-----------------------------------------------------------------------------");
    }

    public void displayAllMembers() {
        System.out.println("\n------------------------------- ALL MEMBERS ---------------------------------");
        if (members.isEmpty()) {
            System.out.println("No registered members.");
            return;
        }
        for (LibraryMember m : members) {
            System.out.println(m);
        }
        System.out.println("-----------------------------------------------------------------------------");
    }

    public void displayMemberDetails(int memberId) throws MemberNotFoundException {
        LibraryMember m = findMemberById(memberId);
        if (m == null) {
            throw new MemberNotFoundException("Member with ID " + memberId + " not found!");
        }
        System.out.println("\n--- Member Details ---");
        System.out.println("Member ID      : " + m.getMemberId());
        System.out.println("Name           : " + m.getName());
        System.out.println("Books Borrowed : " + m.getBooksBorrowed() + " / " + LibraryMember.MAX_BORROW_LIMIT);
        System.out.println("Borrowed Books List:");
        if (m.getBorrowedBookIds().isEmpty()) {
            System.out.println("   (None)");
        } else {
            for (int bId : m.getBorrowedBookIds()) {
                Book b = findBookById(bId);
                if (b != null) {
                    System.out.println("   - [" + b.getBookId() + "] \"" + b.getTitle() + "\" by " + b.getAuthor());
                } else {
                    System.out.println("   - [ID " + bId + "] (Record unavailable)");
                }
            }
        }
    }

    public void displayAllTransactions() {
        System.out.println("\n---------------------------- TRANSACTION HISTORY ----------------------------");
        if (transactions.isEmpty()) {
            System.out.println("No transactions recorded yet.");
            return;
        }
        for (Transaction tx : transactions) {
            System.out.println(tx);
        }
        System.out.println("-----------------------------------------------------------------------------");
    }

    public void searchBooks(String query) {
        System.out.println("\n--- Search Results for: \"" + query + "\" ---");
        String lowerQuery = query.toLowerCase();
        boolean found = false;
        for (Book b : books) {
            if (b.getTitle().toLowerCase().contains(lowerQuery)
                    || b.getAuthor().toLowerCase().contains(lowerQuery)
                    || String.valueOf(b.getBookId()).equals(query)) {
                System.out.println(b);
                found = true;
            }
        }
        if (!found) {
            System.out.println("No matching books found.");
        }
    }

    // ==========================================
    // Requirement 8: File I/O (Persistence)
    // ==========================================

    /**
     * Saves books, members, and transactions to text files.
     */
    public synchronized void saveToFile() {
        File dataDir = new File(DATA_DIR);
        if (!dataDir.exists()) {
            dataDir.mkdirs();
        }

        // Save Books
        try (PrintWriter writer = new PrintWriter(new FileWriter(BOOKS_FILE))) {
            for (Book b : books) {
                writer.println(b.toFileString());
            }
        } catch (IOException e) {
            System.err.println("Error saving books to file: " + e.getMessage());
        }

        // Save Members
        try (PrintWriter writer = new PrintWriter(new FileWriter(MEMBERS_FILE))) {
            for (LibraryMember m : members) {
                writer.println(m.toFileString());
            }
        } catch (IOException e) {
            System.err.println("Error saving members to file: " + e.getMessage());
        }

        // Save Transactions
        try (PrintWriter writer = new PrintWriter(new FileWriter(TRANSACTIONS_FILE))) {
            for (Transaction tx : transactions) {
                writer.println(tx.toFileString());
            }
        } catch (IOException e) {
            System.err.println("Error saving transactions to file: " + e.getMessage());
        }
    }

    /**
     * Loads books, members, and transactions from text files.
     * Seeds initial sample data if files do not exist yet.
     */
    public synchronized void loadFromFile() {
        File dataDir = new File(DATA_DIR);
        if (!dataDir.exists()) {
            dataDir.mkdirs();
        }

        File bFile = new File(BOOKS_FILE);
        File mFile = new File(MEMBERS_FILE);
        File tFile = new File(TRANSACTIONS_FILE);

        if (!bFile.exists() || !mFile.exists()) {
            // Seed sample data for immediate out-of-the-box demonstration
            seedSampleData();
            saveToFile();
            return;
        }

        // 1. Load Books
        books.clear();
        try (BufferedReader reader = new BufferedReader(new FileReader(bFile))) {
            String line;
            while ((line = reader.readLine()) != null) {
                line = line.trim();
                if (!line.isEmpty()) {
                    Book b = Book.fromFileString(line);
                    if (b != null) {
                        books.add(b);
                        if (b.getBookId() >= nextBookId) {
                            nextBookId = b.getBookId() + 1;
                        }
                    }
                }
            }
        } catch (IOException e) {
            System.err.println("Error loading books from file: " + e.getMessage());
        }

        // 2. Load Members
        members.clear();
        try (BufferedReader reader = new BufferedReader(new FileReader(mFile))) {
            String line;
            while ((line = reader.readLine()) != null) {
                line = line.trim();
                if (!line.isEmpty()) {
                    LibraryMember m = LibraryMember.fromFileString(line);
                    if (m != null) {
                        members.add(m);
                        if (m.getMemberId() >= nextMemberId) {
                            nextMemberId = m.getMemberId() + 1;
                        }
                    }
                }
            }
        } catch (IOException e) {
            System.err.println("Error loading members from file: " + e.getMessage());
        }

        // 3. Load Transactions
        transactions.clear();
        if (tFile.exists()) {
            try (BufferedReader reader = new BufferedReader(new FileReader(tFile))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    line = line.trim();
                    if (!line.isEmpty()) {
                        String[] parts = line.split(";", -1);
                        if (parts.length >= 5) {
                            int tId = Integer.parseInt(parts[0].trim());
                            int bId = Integer.parseInt(parts[1].trim());
                            int mId = Integer.parseInt(parts[2].trim());
                            LocalDate cDate = parts[3].trim().isEmpty() ? null : LocalDate.parse(parts[3].trim());
                            LocalDate rDate = ("NONE".equalsIgnoreCase(parts[4].trim()) || parts[4].trim().isEmpty())
                                    ? null : LocalDate.parse(parts[4].trim());

                            Book book = findBookById(bId);
                            LibraryMember member = findMemberById(mId);

                            Transaction tx = new Transaction(tId, book, member, cDate, rDate);
                            transactions.add(tx);
                            if (tId >= nextTransactionId) {
                                nextTransactionId = tId + 1;
                            }
                        }
                    }
                }
            } catch (Exception e) {
                System.err.println("Error loading transactions from file: " + e.getMessage());
            }
        }
    }

    private void seedSampleData() {
        // Sample Books
        books.add(new Book(101, "Effective Java", "Joshua Bloch", true));
        books.add(new Book(102, "Clean Code", "Robert C. Martin", true));
        books.add(new Book(103, "Head First Java", "Kathy Sierra", true));
        books.add(new Book(104, "Design Patterns", "Gang of Four", true));
        books.add(new Book(105, "Introduction to Algorithms", "CLRS", true));
        nextBookId = 106;

        // Sample Members
        members.add(new LibraryMember(1001, "Alice Sharma"));
        members.add(new LibraryMember(1002, "Bob Patel"));
        members.add(new LibraryMember(1003, "Charlie Verma"));
        nextMemberId = 1004;

        nextTransactionId = 5001;
    }

    // ==========================================
    // Requirement 6: Text-Based User Interface
    // ==========================================

    public void startConsoleUI() {
        Scanner scanner = new Scanner(System.in);
        boolean exit = false;

        System.out.println("=============================================================");
        System.out.println("       WELCOME TO THE LIBRARY MANAGEMENT SYSTEM (Java SE)    ");
        System.out.println("=============================================================");

        while (!exit) {
            System.out.println("\n---------------------- MAIN MENU ----------------------");
            System.out.println(" 1. View All Books");
            System.out.println(" 2. View Available Books");
            System.out.println(" 3. Add New Book");
            System.out.println(" 4. Register New Member");
            System.out.println(" 5. View All Members");
            System.out.println(" 6. View Member Details");
            System.out.println(" 7. Borrow a Book (Checkout)");
            System.out.println(" 8. Return a Book");
            System.out.println(" 9. View All Transactions");
            System.out.println(" 10. Search Books (Title / Author / ID)");
            System.out.println(" 11. Save Data to Files");
            System.out.println(" 12. Exit");
            System.out.println("-------------------------------------------------------");
            System.out.print("Please enter your choice (1-12): ");

            int choice = -1;
            try {
                String input = scanner.nextLine().trim();
                choice = Integer.parseInt(input);
            } catch (NumberFormatException e) {
                System.out.println("\n[!] Invalid input. Please enter a valid number from 1 to 12.");
                continue;
            }

            try {
                switch (choice) {
                    case 1:
                        displayAllBooks();
                        break;

                    case 2:
                        displayAvailableBooks();
                        break;

                    case 3: {
                        System.out.print("Enter Book Title: ");
                        String title = scanner.nextLine().trim();
                        if (title.isEmpty()) {
                            System.out.println("[!] Book title cannot be empty.");
                            break;
                        }
                        System.out.print("Enter Author Name: ");
                        String author = scanner.nextLine().trim();
                        if (author.isEmpty()) {
                            System.out.println("[!] Author name cannot be empty.");
                            break;
                        }
                        Book newBook = new Book(nextBookId, title, author, true);
                        addBook(newBook);
                        break;
                    }

                    case 4: {
                        System.out.print("Enter Member Name: ");
                        String name = scanner.nextLine().trim();
                        if (name.isEmpty()) {
                            System.out.println("[!] Member name cannot be empty.");
                            break;
                        }
                        LibraryMember newMember = new LibraryMember(nextMemberId, name);
                        registerMember(newMember);
                        break;
                    }

                    case 5:
                        displayAllMembers();
                        break;

                    case 6: {
                        System.out.print("Enter Member ID: ");
                        int mId = Integer.parseInt(scanner.nextLine().trim());
                        displayMemberDetails(mId);
                        break;
                    }

                    case 7: {
                        System.out.println("\n--- Borrow Book ---");
                        System.out.print("Enter Member ID: ");
                        int mId = Integer.parseInt(scanner.nextLine().trim());
                        System.out.print("Enter Book ID to borrow: ");
                        int bId = Integer.parseInt(scanner.nextLine().trim());

                        Transaction tx = borrowBook(mId, bId);
                        System.out.println("\n[SUCCESS] Book borrowed successfully!");
                        System.out.println("Transaction ID : " + tx.getTransactionId());
                        System.out.println("Member Name    : " + tx.getMember().getName());
                        System.out.println("Book Title     : " + tx.getBook().getTitle());
                        System.out.println("Checkout Date  : " + tx.getCheckoutDate());
                        System.out.println("Due Date       : " + tx.getDueDate() + " (" + Transaction.ALLOWED_DAYS + " days allowed)");
                        break;
                    }

                    case 8: {
                        System.out.println("\n--- Return Book ---");
                        System.out.print("Enter Member ID: ");
                        int mId = Integer.parseInt(scanner.nextLine().trim());
                        System.out.print("Enter Book ID to return: ");
                        int bId = Integer.parseInt(scanner.nextLine().trim());

                        Transaction tx = returnBook(mId, bId);
                        System.out.println("\n[SUCCESS] Book returned successfully!");
                        System.out.println("Transaction ID : " + tx.getTransactionId());
                        System.out.println("Member Name    : " + tx.getMember().getName());
                        System.out.println("Book Title     : " + tx.getBook().getTitle());
                        System.out.println("Return Date    : " + tx.getReturnDate());

                        if (tx.isOverdue()) {
                            System.out.println("[!] Status      : OVERDUE by " + tx.getOverdueDays() + " day(s)");
                            System.out.printf("[!] Fine Due    : Rs. %.2f (Rate: Rs. %.2f/day)\n",
                                    tx.calculateFine(), Transaction.DAILY_FINE_RATE);
                        } else {
                            System.out.println("Status         : Returned on time (No fine).");
                        }
                        break;
                    }

                    case 9:
                        displayAllTransactions();
                        break;

                    case 10: {
                        System.out.print("Enter title, author, or Book ID to search: ");
                        String query = scanner.nextLine().trim();
                        if (!query.isEmpty()) {
                            searchBooks(query);
                        }
                        break;
                    }

                    case 11:
                        saveToFile();
                        System.out.println("[SUCCESS] All data successfully saved to files in '" + DATA_DIR + "/' folder.");
                        break;

                    case 12:
                        saveToFile();
                        System.out.println("Data saved. Exiting Library Management System. Goodbye!");
                        exit = true;
                        break;

                    default:
                        System.out.println("[!] Invalid choice. Please select an option between 1 and 12.");
                        break;
                }
            } catch (BookNotFoundException | MemberNotFoundException | BookNotAvailableException | MaxBooksBorrowedException e) {
                // Requirement 7: Exception Handling
                System.out.println("\n[EXCEPTION CAUGHT]: " + e.getMessage());
            } catch (NumberFormatException e) {
                System.out.println("\n[INPUT ERROR]: Please enter a valid numeric ID.");
            } catch (Exception e) {
                System.out.println("\n[ERROR]: " + e.getMessage());
            }
        }
    }

    public static void main(String[] args) {
        Library library = new Library();
        library.startConsoleUI();
    }
}
