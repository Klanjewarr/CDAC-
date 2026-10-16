 package jdbc;
 
 import java.sql.*;
 import java.util.Scanner;
 
 /**
  * This class demonstrates various JDBC operations such as querying all records,
  * querying a specific record, and inserting a record into an employee table.
  * 
  * <p>Prerequisites:
  * <ul>
  *   <li>MySQL server must be installed and running on localhost:3306</li>
  *   <li>Database {@code dac_aug_26} must exist</li>
  *   <li>Table {@code Employee} must exist with columns: empId (INT), empName (VARCHAR), salary (DOUBLE), deptId (INT)</li>
  *   <li>MySQL Connector/J (JDBC driver) must be in the classpath</li>
  *   <li>Environment variable {@code MyPass} must be set to the MySQL password</li>
  * </ul>
  * </p>
  */
 public class JDBC2 {
     static String driver = null;
     static String url = null;
     static String user = null;
     static String password = null;
     
     static {
         driver = "com.mysql.cj.jdbc.Driver";
         url = "jdbc:mysql://localhost:3306/dac_aug_26?zeroDateTimeBehavior=CONVERT_TO_NULL";
         user = "root";
         password = System.getenv("MyPass");
     }
     
     static Connection getConn() {
         try {
             Connection con = DriverManager.getConnection(url, user, password);
             return con;
         } catch (Exception e) {
             return null;
         }
     }
     
     public static void showAllRecord() {
         try (Connection con = getConn(); Statement stmt = con.createStatement()) {
             ResultSet rs = stmt.executeQuery("Select * from Employee");
             while (rs.next()) {
                 System.out.println(rs.getInt(1) + " : " + rs.getString(2) + " : " + rs.getDouble(3));
             }
         } catch (Exception e) {
             System.err.println(e.getMessage());
         }
     }
     
     public static void showRecord(int id) {
         try (Connection con = getConn(); PreparedStatement stmt = con.prepareStatement("Select * from employee where empId=?")) {
             stmt.setInt(1, id);
             ResultSet rs = stmt.executeQuery();
             while (rs.next()) {
                 System.out.println(rs.getInt(1) + " : " + rs.getString(2) + " : " + rs.getDouble(3));
             }
         } catch (Exception e) {
             System.err.println(e.getMessage());
         }
     }
     
     public static void insertRecord(int id, String name, double sal, int did) {
         try (Connection con = getConn(); PreparedStatement stmt = con.prepareStatement("Insert into employee values(?,?,?,?)")) {
             stmt.setInt(1, id);
             stmt.setString(2, name);
             stmt.setDouble(3, sal);
             stmt.setInt(4, did);
             int r = stmt.executeUpdate();
             
             if (r > 0) {
                 System.out.println("Record inserted Successfully");
             } else {
                 System.err.println("Record not inserted");
             }
         } catch (Exception e) {
             System.err.println(e.getMessage());
         }
     }
     
     public static void main(String[] args) {
         // showAllRecord();
         Scanner sc = new Scanner(System.in);
         System.out.println("Enter id,name,salary,did for inserting the Employee");
         int id = sc.nextInt();
         sc.nextLine();
         String name = sc.nextLine();
         double sal = sc.nextDouble();
         int did = sc.nextInt();
         insertRecord(id, name, sal, did);
         
         // showRecord(id);
     }
 }
