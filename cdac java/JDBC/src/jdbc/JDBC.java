 package jdbc;
 
 import java.sql.*;
 import java.util.Scanner;
 
 /**
  * This class demonstrates a simple JDBC program to connect to a MySQL database,
  * query an employee table based on user input, and display the results.
  * 
  * <p>Prerequisites:
  * <ul>
  *   <li>MySQL server must be installed and running on localhost:3306</li>
  *   <li>Database {@code cdac2026} must exist</li>
  *   <li>Table {@code employee} must exist with at least columns: empId (INT), empName (VARCHAR), salary (DOUBLE)</li>
  *   <li>MySQL Connector/J (JDBC driver) must be in the classpath</li>
  * </ul>
  * </p>
  */
 public class JDBC {
 
     /**
      * Main method to execute the JDBC demonstration.
      * 
      * @param args command line arguments (not used)
      * @throws ClassNotFoundException if the JDBC driver class is not found
      * @throws SQLException if a database access error occurs
      */
     public static void main(String[] args) throws ClassNotFoundException, SQLException {
         // JDBC driver class name for MySQL Connector/J
         String driver = "com.mysql.cj.jdbc.Driver";
         // JDBC URL for connecting to the MySQL database
         // Adjust the database name, hostname, and port as needed
         String url = "jdbc:mysql://localhost:3306/cdac2026?zeroDateTimeBehavior=CONVERT_TO_NULL";
         // Database username (default MySQL root user)
         String user = "root";
         // Database password (change as per your setup)
         String password = "12345678";
         
         // Load the JDBC driver (optional for JDBC 4.0+ as it's auto-loaded, but kept for clarity)
         Class.forName(driver);
         
         // Use try-with-resources to automatically close JDBC objects
         try (Connection con = DriverManager.getConnection(url, user, password);
              PreparedStatement pst = con.prepareStatement("SELECT * FROM employee WHERE empId = ?");
              Scanner sc = new Scanner(System.in)) {
             
             // Prompt the user to enter an employee ID
             System.out.println("Enter id to find Employee");
             int id = sc.nextInt();
             
             // Set the input parameter for the prepared statement
             pst.setInt(1, id);
             
             // Execute the query and get the result set
             ResultSet rs = pst.executeQuery();
             
             // Process the result set
             while (rs.next()) {
                 // Assuming the table has: empId (INT), empName (VARCHAR), salary (DOUBLE)
                 System.out.println(rs.getInt(1) + " : " + rs.getString(2) + " : " + rs.getDouble(3));
             }
             
         } catch (Exception e) {
             // Print the error message and stack trace for debugging
             System.err.println("Error: " + e.getMessage());
             e.printStackTrace();
         }
     }
 }
