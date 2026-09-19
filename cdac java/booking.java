import java.util.*;
class Booking{
  public static void main(String ar[]){
	Scanner sc=new Scanner(System.in);
	RouteFinder rf=new RouteFinder();
  
  System.out.println("Enter your choice of booking from 1,2 and 3");
  int choice=sc.nextInt();
  
  switch(choice){
	  case 1->{
		  System.out.println("Enter Destination");
		  String desti=sc.next();
		  rf.route(desti);
	  }
	  
	  case 2->{
		  System.out.println("Enter source and Destination");
 		  String src=sc.next();
		  String desti=sc.next();
		  rf.route(src,desti);
	  }
	  
	  case 3->{
		  System.out.println("Enter source, via and Destination");
 		  String src=sc.next();
		  String via=sc.next();
		  String desti=sc.next();
		  rf.route(src,desti);
	  }
	  default->System.out.println("This service is not available........");
  }
  }
}