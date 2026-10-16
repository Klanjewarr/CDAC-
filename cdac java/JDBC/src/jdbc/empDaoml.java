//package jdbc;
//
//import java.sql.*;
//import java.util.ArrayList;
//import java.util.List;
//
//public class empDaoml implements EmpDao {
//
//    final String DRIVER = "com.mysql.cj.jdbc.Driver";
//    final String URL = "jdbc:mysql://localhost:3306/dac_aug_26?zeroDateTimeBehavior=CONVERT_TO_NULL";
//    final String USER = "root";
//    final String PASSWORD = System.getenv("MySQLpass");
//
//    public empDaoml() throws ClassNotFoundException {
//        Class.forName(DRIVER);
//    }
//
//    Connection getCon() throws SQLException {
//        return DriverManager.getConnection(URL, USER, PASSWORD);
//    }
//
//    @Override
//    public Employee find(int id) {
//        Employee emp = null;
////        String sql = "Select * from Employee where empid = ?";
//        String sql = "(call InputPro(?))";
////        try(Connection con = getCon();PreparedStatement pst = con.prepareStatement(sql)){
//        try (Connection con = getCon(); CallableStatement pst = con.prepareCall(sql)) {
//            pst.setInt(1, id);
//            try (ResultSet rs = pst.executeQuery()) {
//                if (rs.next()) {
//                    emp = new Employee(rs.getInt(1), rs.getString(2), rs.getDouble(3), rs.getString(4));
//                }
//            }
//
//        } catch (Exception e) {
//            System.err.println(e.getMessage());
//        }
//        return emp;
//    }
//    @Override
//    public List<Employee> findAll(){
//        List<Employee> emps = new ArrayList<>();
//        String sql = "(call simplePro())";
//        
//        try(Connection con = getCon(); CallableStatement pst = con.prepareCall(sql)){
//            try(ResultSet rs = pst.executeQuery()){
//                ResultSetMetaData rmd = rs.getMetaData();
//                
//                while(rs.next()){
//                    emps.add(new Employee(rs.getInt(1),rs.getString(2),rs.getDouble(3),rs.getString(4)));
//                }
//            }
//        }
//        catch(Exception e){
//            System.err.println(e.getMessage());
//        }
//        return emps;
//    }
//
//      @Override
//      public void save(Employee e){
//          String sql = "Insert into employee values(?,?,?,?)";
//          try(Connection con = getCon(); PreparedStatement pst = con.prepareStatement(sql)){
//              pst.setInt(1,e.getId());
//              pst.setString(2,e.getName());
//              pst.setDouble(3,e.getSalary());
//              pst.setString(4,e.DeptId());
//              
//              int row = pst.executeUpdate();
//              if(row>0){
//                  System.out.println("Record Inserted........");
//              }
//              else{
//                  System.out.println("Record Not Inserted.......");
//              }
//          }
//          catch(Exception ex){
//              System.err.println(ex.getMessage());
//          }
//      }
//      
//      @Override
//      public void update(Employee e){
//          String sql = "Update employee set empname = ?,salary = ?,did=? where empId=?";
//          try(Connection con = getCon();PreparedStatement pst = con.prepareStatement(sql)){
//              pst.setString(1,e.getName());
//              pst.setDouble(2,e.getSalary());
//              pst.setString(3,e.DeptId());
//              pst.setInt(4,e.getId());
//              
//              int row = pst.executeUpdate();
//              if(row>0){
//                  System.out.println("Record Updated........");
//              }
//              else{
//                  System.out.println("Record Not Updated.......");
//              }
//          }
//          catch(Exception ex){
//              System.err.println(ex.getMessage());
//          }
//      }
//      
////      @Override
////      public void delete(int id){
////          
////      }
//}