package miscillinous;

import java.util.Scanner;


//    enum Day{
//    Sunday,
//    Monday, 
//    Tuesday,
//    Wensday,
//    Thrusday,
//    Friday,
//    Saturday
//    }
//    
    enum OrderStatus{
    Place,
    Dispatched,
    Shipped,
    Transit,
    Delivered,
    Cancelled
    }
public class Enum {

    public static void main(String[] args) {
//        Day today-Day.Friday;
//            System.err.println("Today is "+ today);
            
            Scanner sc = new Scanner(System.in);
            System.out.println("Enter Status");
            String at = sc.next();
            
         OrderStatus status=OrderStatus.valueOf(at.toUpperCase());
         switch(status){
                 case Place:
                     System.err.println("Your order is Placed");
                     break;
                     case  Dispatched:
                     System.err.println("Your order is  Dispatched");
                     break;
                     case Shipped:
                     System.err.println("Your order is Shipped");
                     break;
                     case Transit:
                     System.err.println("Your order is Transit");
                     break;
                     case Delivered:
                     System.err.println("Your order is Delivered");
                     break;
                     case Cancelled:
                     System.err.println("Your order is Cancelled");
                     break;
                     default:
                         System.out.println("First Place the order");
                     
         }
         
         System.err.println("All Record of Enum "+ OrderStatus.values().length);
     for(OrderStatus stat:OrderStatus.values()){
         System.err.println(stat);
     }
            
    }
    
   
}