package jdbc;

import java.sql.*;
import java.util.Scanner;

public class JDBC {

    public static void main(String[] args) throws ClassNotFoundException, SQLException {
        String driver = "com.mysql.cj.jdbc.Driver";
        String url = "jdbc:mysql://localhost:3306/cdac2026?zeroDateTimeBehavior=CONVERT_TO_NULL";
        String user = "root";
        String password = "12345678";
        
        Class.forName(driver);
        try (Connection con = DriverManager.getConnection(url, user, password);
             PreparedStatement pst = con.prepareStatement("Select * from employee where empId= ?");
             Scanner sc = new Scanner(System.in)) {
             // ResultSet rs=stmt.executeQuery("Select * from employee where empId=110");
            System.out.println("Enter id to find Employee");
            int id = sc.nextInt();
            pst.setInt(1, id);
            ResultSet rs = pst.executeQuery();
            
            while (rs.next()) {
                System.out.println(rs.getInt(1) + " : " + rs.getString(2) + " : " + rs.getDouble(3));
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }
}