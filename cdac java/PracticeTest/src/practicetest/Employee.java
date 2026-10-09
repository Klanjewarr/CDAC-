package practicetest;

import java.util.*;

public class Employee {
 class Data{
 int Employee_Id;
 String Employee_Name;
 String Department;
 int Basic_Salary;
 Data(int eId, String eName,String dept,int salary, ){
 Scanner sc=new Scanner();
 System.out.println("Enter the Employee ID: ");
eId= sc.nextInt();
 System.out.println("Enter the Employee Name: ");
eName=sc.nextLine();
 System.out.println("Enter the Department: ");
dept=sc.nextLine();
System.out.println("Enter the Basic Salary: ");
salary=sc.nextInt();

 Employee_Id=eId;
 Employee_Name=eName;
 Department=dept;
 Basic_Salary=salary;
 
 }

 }
 
 class show extends Data{
  void display_details(){
      System.out.println("Employee Id: "+ Employee_Id);
      System.out.println("Employee Name: "+ Employee_Name);
      System.out.println("Employee Department: "+ Department);
      System.out.println("Basic Salary: "+Basic_Salary);
  }
 }
    public static void main(String[] args) {
        
    }

}