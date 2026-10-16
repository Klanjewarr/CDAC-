 /*
  * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
  * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
 
 /**
  * This class provides a simple JDBC template for connecting to a MySQL database.
  * It demonstrates the basic steps of loading the driver, establishing a connection,
  * creating a statement, executing a query, and processing the result set.
  * 
  * <p>To run this program:
  * <ol>
  *   <li>Ensure MySQL server is running and accessible.</li>
  *   <li>Create a database and table as per your requirements.</li>
  *   <li>Download the MySQL Connector/J JDBC driver from {@code https://dev.mysql.com/downloads/connector/j/} and add it to the classpath.</li>
  *   <li>Update the URL, username, and password in the code to match your MySQL setup.</li>
  *   <li>Compile and run the program.</li>
  * </ol>
  * </p>
  */
 import java.sql.Connection;
 import java.sql.DriverManager;
 import java.sql.ResultSet;
 import java.sql.SQLException;
 import java.sql.Statement;
 
 public class driver {
     public static void main(String[] args) {
         // JDBC driver class name for MySQL Connector/J
         String driverClass = "com.mysql.cj.jdbc.Driver";
         // JDBC URL for connecting to the MySQL database
         // Replace the database name, hostname, and port as needed
         String url = "jdbc:mysql://localhost:3306/your_database?zeroDateTimeBehavior=CONVERT_TO_NULL";
         // Database username
         String user = "your_username";
         // Database password
         String password = "your_password";
         
         try {
             // Step 1: Load the JDBC driver (optional for JDBC 4.0+ as it's auto-loaded)
             Class.forName(driverClass);
             System.out.println("JDBC driver loaded successfully.");
 
             // Step 2: Establish a connection to the database
             Connection con = DriverManager.getConnection(url, user, password);
             System.out.println("Connected to the database: " + url);
 
             // Step 3: Create a statement object for executing SQL queries
             Statement stmt = con.createStatement();
 
             // Step 4: Execute a query (replace with your own query)
             String sql = "SELECT * FROM your_table LIMIT 5"; // Example query
             ResultSet rs = stmt.executeQuery(sql);
 
             // Step 5: Process the result set
             System.out.println("\nQuery Results:");
             System.out.println("----------------");
             while (rs.next()) {
                 // Assuming the table has columns that you can access by index or name
                 // Adjust the column indices and types as per your table structure
                 System.out.println("Column1: " + rs.getInt(1) + ", Column2: " + rs.getString(2));
             }
 
             // Step 6: Clean up resources
             rs.close();
             stmt.close();
             con.close();
             System.out.println("\nResources closed successfully.");
 
         } catch (ClassNotFoundException e) {
             System.err.println("JDBC Driver not found: " + e.getMessage());
             e.printStackTrace();
             System.err.println("Please add the MySQL Connector/J JAR file to the classpath.");
         } catch (SQLException e) {
             System.err.println("Database error: " + e.getMessage());
             e.printStackTrace();
         }
     }
 }
