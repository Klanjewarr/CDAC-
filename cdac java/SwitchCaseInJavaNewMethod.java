import java.util.*;

class SwitchCase{
	static Scanner sc = new Scanner(System.in);
	
	static void oldversion(){
	String result;
	System.out.println("Enter a day in week");
	String ch = sc.next();
	switch(ch){
		case "Mon":
		//System.out.println("Day 1");
		//result="Day 1";
		//break;
		case "Tue":
		//System.out.println("Day 2");//
		//result="Day 2";
		 
		//break;
		
		case "Wed":
		//System.out.println("Day3");
		//result="Day3";
		//break;
		case "Thu":
		//System.out.println("Day 4");
		//result="Day 4";
		//break;
		case "Fri":
		//System.out.println("Day 5");
		result="Working day of week";
		break;
		case "Sat":
		//System.out.println("Weekend of the week");
		result="Weekend of the week";
		break;
		case "Sun":
		result="Holiday of week";
		//System.out.println("Holiday of week");
		
		break;
		default:
		//System.out.println("Invalid Day");
		result="Invalid Day";
		}
		System.out.println(result);
	}
	
	
	static void newversion(){
		System.out.println("Enter day of week");
		String ch = sc.next();
		String result = switch(ch){
		//case "Mon"->"Day 1";//System.out.println("Day 1");
		//case "Tue"->"Day 2";//System.out.println("Day 2");
		//case "Wed"->"Day 3";//System.out.println("Day 3");
		//case "Thu"->"Day 4";//System.out.println("Day 4");
		case "Fri","Mon","Tue","Wed","Thu"->"Working day";//System.out.println("Day 5");
		case "Sat"->"Weekend of week";//System.out.println("Weekend of week");
		case "Sun"->"Holiday";//System.out.println("Holiday");
		default-> "Invalid day";//System.out.println("Invalid day");
		};
		
		System.out.println(result);
	
	}
	public static void main(String arg[]){
	//oldversion();
	newversion();
	
	}
}