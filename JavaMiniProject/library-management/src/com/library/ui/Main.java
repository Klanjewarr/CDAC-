package com.library.ui;

import com.library.exception.BookNotAvailableException;
import com.library.exception.InvalidInputException;
import com.library.exception.LimitExceededException;
import com.library.model.Book;
import com.library.model.BookSummary;
import com.library.model.Faculty;
import com.library.model.IssueRecord;
import com.library.model.Member;
import com.library.model.MemberType;
import com.library.model.Student;
import com.library.service.LibraryService;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.stream.Collectors;

public class Main {

    private static Scanner scanner = new Scanner(System.in);
    private static LibraryService service = new LibraryService();

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("             LIBRARY MANAGEMENT SYSTEM            ");
        System.out.println("==================================================");

        boolean loggedIn = false;
        int loginAttempts = 0;

        while (!loggedIn && loginAttempts < 3) {
            System.out.print("Enter Librarian Username: ");
            String username = scanner.nextLine().trim();
            System.out.print("Enter Librarian Password: ");
            String password = scanner.nextLine().trim();

            try {
                if (service.login(username, password)) {
                    loggedIn = true;
                    System.out.println("Login successful! Welcome, " + username + ".");
                } else {
                    loginAttempts++;
                    System.out.println("Invalid credentials! Attempts remaining: " + (3 - loginAttempts));
                }
            } catch (SQLException e) {
                System.out.println("Database error during login: " + e.getMessage());
                return;
            }
        }

        if (!loggedIn) {
            System.out.println("Maximum login attempts exceeded. System exiting.");
            return;
        }

        boolean exit = false;
        while (!exit) {
            printMenu();
            int choice = readIntInput("Enter your choice: ");

            // Java 14+ switch expression
            switch (choice) {
                case 1 -> handleAddBook();
                case 2 -> handleUpdateBook();
                case 3 -> handleDeleteBook();
                case 4 -> handleSearchBooks();
                case 5 -> handleListAllBooks();
                case 6 -> handleRegisterMember();
                case 7 -> handleListMembers();
                case 8 -> handleIssueBook();
                case 9 -> handleReturnBook();
                case 10 -> handleSortBooks();
                case 11 -> handleStreamReports();
                case 12 -> handleExportReport();
                case 13 -> {
                    System.out.println("Thank you for using Library Management System. Goodbye!");
                    exit = true;
                }
                default -> System.out.println("Invalid option! Please enter a number between 1 and 13.");
            }
        }
    }

    private static void printMenu() {
        System.out.println("\n----------------- MAIN MENU -----------------");
        System.out.println("1.  Add New Book");
        System.out.println("2.  Update Book");
        System.out.println("3.  Delete Book");
        System.out.println("4.  Search Books (Title/Author/Category)");
        System.out.println("5.  List All Books");
        System.out.println("6.  Register Member");
        System.out.println("7.  List All Members");
        System.out.println("8.  Issue Book");
        System.out.println("9.  Return Book & Calculate Fine");
        System.out.println("10. Sort Books (Anonymous Class & Lambda Demo)");
        System.out.println("11. Stream Reports (Overdue, Categories, Availability)");
        System.out.println("12. Export Report to File (.txt)");
        System.out.println("13. Exit");
        System.out.println("---------------------------------------------");
    }

    private static int readIntInput(String prompt) {
        while (true) {
            System.out.print(prompt);
            String input = scanner.nextLine().trim();
            try {
                return Integer.parseInt(input);
            } catch (NumberFormatException e) {
                System.out.println("Invalid number format! Please enter a valid integer.");
            }
        }
    }

    private static void handleAddBook() {
        try {
            System.out.print("Enter Book Title: ");
            String title = scanner.nextLine().trim();
            System.out.print("Enter Author: ");
            String author = scanner.nextLine().trim();
            System.out.print("Enter Category: ");
            String category = scanner.nextLine().trim();
            int copies = readIntInput("Enter Total Copies: ");

            if (title.isEmpty() || author.isEmpty() || copies <= 0) {
                throw new InvalidInputException("Book title, author cannot be empty, and copies must be > 0.");
            }

            Book book = new Book(0, title, author, category, copies, copies);
            service.getBookDAO().addBook(book);
            System.out.println("Book added successfully!");
        } catch (InvalidInputException e) {
            System.out.println("Input Error: " + e.getMessage());
        } catch (SQLException e) {
            System.out.println("Database Error: " + e.getMessage());
        }
    }

    private static void handleUpdateBook() {
        try {
            int bookId = readIntInput("Enter Book ID to update: ");
            Book existing = service.getBookDAO().getBookById(bookId);
            if (existing == null) {
                System.out.println("Book with ID " + bookId + " not found!");
                return;
            }

            System.out.print("Enter New Title (leave blank to keep '" + existing.getTitle() + "'): ");
            String title = scanner.nextLine().trim();
            if (!title.isEmpty()) existing.setTitle(title);

            System.out.print("Enter New Author (leave blank to keep '" + existing.getAuthor() + "'): ");
            String author = scanner.nextLine().trim();
            if (!author.isEmpty()) existing.setAuthor(author);

            System.out.print("Enter New Category (leave blank to keep '" + existing.getCategory() + "'): ");
            String category = scanner.nextLine().trim();
            if (!category.isEmpty()) existing.setCategory(category);

            System.out.print("Enter New Total Copies (or -1 to keep " + existing.getTotalCopies() + "): ");
            int total = readIntInput("");
            if (total >= 0) {
                int diff = total - existing.getTotalCopies();
                existing.setTotalCopies(total);
                existing.setAvailableCopies(Math.max(0, existing.getAvailableCopies() + diff));
            }

            service.getBookDAO().updateBook(existing);
            System.out.println("Book updated successfully!");
        } catch (SQLException e) {
            System.out.println("Database Error: " + e.getMessage());
        }
    }

    private static void handleDeleteBook() {
        try {
            int bookId = readIntInput("Enter Book ID to delete: ");
            service.getBookDAO().deleteBook(bookId);
            System.out.println("Book deleted successfully (if existed).");
        } catch (SQLException e) {
            System.out.println("Cannot delete book (it may have active borrowing records): " + e.getMessage());
        }
    }

    private static void handleSearchBooks() {
        try {
            System.out.print("Enter search keyword (title/author/category): ");
            String keyword = scanner.nextLine().trim();
            List<Book> results = service.getBookDAO().searchBooks(keyword);

            if (results.isEmpty()) {
                System.out.println("No books matched the search keyword.");
            } else {
                System.out.println("\nSearch Results (" + results.size() + " found):");
                for (Book b : results) {
                    System.out.println(b);
                }
            }
        } catch (SQLException e) {
            System.out.println("Database Error: " + e.getMessage());
        }
    }

    private static void handleListAllBooks() {
        try {
            List<Book> books = service.getBookDAO().getAllBooks();
            if (books.isEmpty()) {
                System.out.println("No books currently in database.");
            } else {
                System.out.println("\n--- All Books in Library ---");
                for (Book b : books) {
                    System.out.println(b);
                }
            }
        } catch (SQLException e) {
            System.out.println("Database Error: " + e.getMessage());
        }
    }

    private static void handleRegisterMember() {
        try {
            System.out.print("Enter Member Name: ");
            String name = scanner.nextLine().trim();
            System.out.print("Enter Member Email: ");
            String email = scanner.nextLine().trim();
            System.out.print("Enter Member Type (1 for STUDENT, 2 for FACULTY): ");
            int typeChoice = readIntInput("");

            if (name.isEmpty() || email.isEmpty()) {
                throw new InvalidInputException("Name and Email cannot be empty.");
            }

            Member member;
            if (typeChoice == 1) {
                member = new Student(0, name, email);
            } else if (typeChoice == 2) {
                member = new Faculty(0, name, email);
            } else {
                throw new InvalidInputException("Invalid member type selected.");
            }

            service.getMemberDAO().addMember(member);
            System.out.println("Member registered successfully!");
        } catch (InvalidInputException e) {
            System.out.println("Input Error: " + e.getMessage());
        } catch (SQLException e) {
            System.out.println("Database Error (Email may already exist): " + e.getMessage());
        }
    }

    private static void handleListMembers() {
        try {
            List<Member> members = service.getMemberDAO().getAllMembers();
            if (members.isEmpty()) {
                System.out.println("No members registered yet.");
            } else {
                System.out.println("\n--- Registered Members ---");
                for (Member m : members) {
                    m.displayDetails();
                }
            }
        } catch (SQLException e) {
            System.out.println("Database Error: " + e.getMessage());
        }
    }

    private static void handleIssueBook() {
        try {
            int memberId = readIntInput("Enter Member ID: ");
            int bookId = readIntInput("Enter Book ID: ");

            int issueId = service.issueBook(memberId, bookId);
            System.out.println("Book issued successfully with transaction committed!");
            System.out.println(">>> Generated Issue ID: " + issueId + " (Please note this ID for returning) <<<");
        } catch (BookNotAvailableException | LimitExceededException e) {
            System.out.println("Business Rule Error: " + e.getMessage());
        } catch (InvalidInputException e) {
            System.out.println("Input Error: " + e.getMessage());
        } catch (SQLException e) {
            System.out.println("Transaction rolled back due to Database Error: " + e.getMessage());
        }
    }

    private static void handleReturnBook() {
        try {
            List<IssueRecord> allIssues = service.getIssueDAO().getAllIssues();
            List<IssueRecord> activeIssues = allIssues.stream()
                    .filter(ir -> ir.getReturnDate() == null)
                    .collect(Collectors.toList());

            if (activeIssues.isEmpty()) {
                System.out.println("No active borrowed books to return.");
                return;
            }

            System.out.println("\n--- Currently Borrowed Books (Pending Return) ---");
            for (IssueRecord ir : activeIssues) {
                System.out.println("Issue ID: " + ir.getIssueId() + " | Member ID: " + ir.getMemberId() + 
                                   " | Book ID: " + ir.getBookId() + " | Due Date: " + ir.getDueDate());
            }
            System.out.println("-------------------------------------------------");

            int issueId = readIntInput("Enter Issue ID to return: ");
            double fine = service.returnBook(issueId);

            System.out.println("Book returned successfully!");
            if (fine > 0) {
                System.out.println("Late Return Fine to Collect: Rs " + fine);
            } else {
                System.out.println("Returned on time. No fine levied.");
            }
        } catch (InvalidInputException e) {
            System.out.println("Input Error: " + e.getMessage());
        } catch (SQLException e) {
            System.out.println("Database Error: " + e.getMessage());
        }
    }

    private static void handleSortBooks() {
        try {
            List<Book> books = service.getBookDAO().getAllBooks();
            if (books.isEmpty()) {
                System.out.println("No books to sort.");
                return;
            }

            System.out.println("Choose sorting method:");
            System.out.println("1. Sort by Author (using Anonymous Class Comparator)");
            System.out.println("2. Sort by Title  (using Lambda Expression Comparator)");
            int opt = readIntInput("Select option: ");

            if (opt == 1) {
                // Anonymous class Comparator implementation
                books.sort(new Comparator<Book>() {
                    @Override
                    public int compare(Book b1, Book b2) {
                        return b1.getAuthor().compareToIgnoreCase(b2.getAuthor());
                    }
                });
                System.out.println("\n--- Books Sorted by Author (Anonymous Class) ---");
            } else if (opt == 2) {
                // Lambda expression Comparator implementation
                books.sort((b1, b2) -> b1.getTitle().compareToIgnoreCase(b2.getTitle()));
                System.out.println("\n--- Books Sorted by Title (Lambda Expression) ---");
            } else {
                System.out.println("Invalid option.");
                return;
            }

            for (Book b : books) {
                System.out.println(b);
            }
        } catch (SQLException e) {
            System.out.println("Database Error: " + e.getMessage());
        }
    }

    private static void handleStreamReports() {
        try {
            List<Book> books = service.getBookDAO().getAllBooks();
            List<IssueRecord> issues = service.getIssueDAO().getAllIssues();

            System.out.println("\n================ STREAM REPORTS ================");

            // Stream Report 1: Overdue List
            LocalDate today = LocalDate.now();
            List<IssueRecord> overdueList = issues.stream()
                    .filter(ir -> ir.getReturnDate() == null && ir.getDueDate().isBefore(today))
                    .collect(Collectors.toList());

            System.out.println("\n[Report 1] Overdue Active Issues (" + overdueList.size() + " overdue):");
            if (overdueList.isEmpty()) {
                System.out.println("No books are currently overdue.");
            } else {
                overdueList.forEach(System.out::println);
            }

            // Stream Report 2: Books count per category
            Map<String, Long> categoryCount = books.stream()
                    .collect(Collectors.groupingBy(Book::getCategory, Collectors.counting()));

            System.out.println("\n[Report 2] Books Count per Category:");
            categoryCount.forEach((cat, count) -> System.out.println(" - " + cat + ": " + count + " titles"));

            // Stream Report 3: Available vs Unavailable Books (partitioningBy)
            Map<Boolean, List<BookSummary>> partitioned = books.stream()
                    .map(b -> new BookSummary(b.getBookId(), b.getTitle(), b.getAuthor(), b.getCategory(), b.getAvailableCopies()))
                    .collect(Collectors.partitioningBy(bs -> bs.availableCopies() > 0));

            System.out.println("\n[Report 3] Available vs Unavailable Breakdown:");
            System.out.println("Available Titles Count   : " + partitioned.get(true).size());
            System.out.println("Out of Stock Titles Count: " + partitioned.get(false).size());

            System.out.println("================================================");
        } catch (SQLException e) {
            System.out.println("Database Error: " + e.getMessage());
        }
    }

    private static void handleExportReport() {
        try {
            List<Book> books = service.getBookDAO().getAllBooks();
            List<IssueRecord> issues = service.getIssueDAO().getAllIssues();
            LocalDate today = LocalDate.now();

            String filename = "library_report.txt";
            try (PrintWriter writer = new PrintWriter(new FileWriter(filename))) {
                writer.println("==================================================");
                writer.println("          LIBRARY STATUS EXPORT REPORT            ");
                writer.println("          Date: " + LocalDate.now());
                writer.println("==================================================");
                writer.println();

                writer.println("--- 1. OVERDUE ISSUES LIST ---");
                List<IssueRecord> overdue = issues.stream()
                        .filter(i -> i.getReturnDate() == null && i.getDueDate().isBefore(today))
                        .collect(Collectors.toList());
                if (overdue.isEmpty()) {
                    writer.println("No overdue issues.");
                } else {
                    for (IssueRecord ir : overdue) {
                        writer.println(ir.toString());
                    }
                }
                writer.println();

                writer.println("--- 2. CATEGORY BREAKDOWN ---");
                Map<String, Long> catMap = books.stream()
                        .collect(Collectors.groupingBy(Book::getCategory, Collectors.counting()));
                catMap.forEach((cat, count) -> writer.println(cat + ": " + count));
                writer.println();

                writer.println("--- 3. COMPLETE BOOK INVENTORY ---");
                for (Book b : books) {
                    writer.println(b.toString());
                }

                writer.println();
                writer.println("End of Report.");
            }

            System.out.println("Report successfully exported to: " + filename);
        } catch (SQLException e) {
            System.out.println("Database Error: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("File I/O Error: " + e.getMessage());
        }
    }
}
