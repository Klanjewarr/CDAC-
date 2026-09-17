import java.util.Scanner; // 1. Import the Scanner class

class Arithimetics{ //main class
	int x;
	int y;
void getdata(){
// 2. Create a Scanner object
Scanner scanner = new Scanner(System.in);

System.out.print("Enter your first variable: ");
// 3. Read a String (full line)
 x = scanner.nextInt(); 

System.out.print("Enter your second variable: ");
 y = scanner.nextInt(); 
}



void add(){
int z =x+y;
System.out.println("Addition is: "+z);
}
void sub(){
int z = x-y;
System.out.println("Substraction is: "+z);
}
void mul(){
int z = x*y;
System.out.println("Multiplication is: "+z);
}
void div(){
int z = x/y;
System.out.println("Division is: "+z);
}
void mod(){
int z = x%y;
System.out.println("Division is: "+z);
}
void area_rect(){
int z = x*y;
System.out.println("Area of Reactangle of lenght "+x+" and breadth "+y+ " is: "+z);
}
	


//main func
public static void main (String arg[]){
 Arithimetics a1= new Arithimetics();
 
 a1.getdata();
 a1.add();
 a1.sub();
 a1.mul();
 a1.div();
 a1.mod();
 a1.area_rect();
 
}

}