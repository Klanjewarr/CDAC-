import java.util.Scanner; // 1. Import the Scanner class

class AllAssignments{ //main class

Scanner scanner = new Scanner(System.in);

//---------- Q1: Sum of two variables ----------
void q1_sum(){
System.out.print("Enter your first variable: ");
int x = scanner.nextInt();
System.out.print("Enter your second variable: ");
int y = scanner.nextInt();

int z = x+y;
System.out.println("Sum is: "+z);
}

//---------- Q2: Sum of two fixed variables p=2.5, q=3.6 ----------
void q2_sumFixed(){
float p = 2.5f;
float q = 3.6f;

float z = p+q;
System.out.println("Sum of p and q is: "+z);
}

//---------- Q3: Simple Interest ----------
void q3_simpleInterest(){
System.out.print("Enter principal (p): ");
float p = scanner.nextFloat();
System.out.print("Enter number of years (n): ");
float n = scanner.nextFloat();
System.out.print("Enter rate of interest (r): ");
float r = scanner.nextFloat();

float si = (p*n*r)/100;
System.out.println("Simple Interest is: "+si);
}

//---------- Q4: Area of Rectangle ----------
void q4_areaRectangle(){
System.out.print("Enter length (l): ");
int l = scanner.nextInt();
System.out.print("Enter breadth (b): ");
int b = scanner.nextInt();

int a_rec = l*b;
System.out.println("Area of Rectangle is: "+a_rec);
}

//---------- Q5: Area of Circle ----------
void q5_areaCircle(){
final float pi = 3.14f;
System.out.print("Enter radius (r): ");
float r = scanner.nextFloat();

float a_cir = pi*r*r;
System.out.println("Area of Circle is: "+a_cir);
}

//---------- Q6: Multiplication of three numbers ----------
void q6_multiplyThree(){
System.out.print("Enter first number: ");
int x = scanner.nextInt();
System.out.print("Enter second number: ");
int y = scanner.nextInt();
System.out.print("Enter third number: ");
int z = scanner.nextInt();

int result = x*y*z;
System.out.println("Multiplication is: "+result);
}

//---------- Q7: Swap using third variable ----------
void q7_swapWithThird(){
System.out.print("Enter your first variable: ");
int x = scanner.nextInt();
System.out.print("Enter your second variable: ");
int y = scanner.nextInt();

System.out.println("Before swap: x = "+x+", y = "+y);
int temp = x;
x = y;
y = temp;
System.out.println("After swap: x = "+x+", y = "+y);
}

//---------- Q8: Swap without third variable ----------
void q8_swapWithoutThird(){
System.out.print("Enter your first variable: ");
int x = scanner.nextInt();
System.out.print("Enter your second variable: ");
int y = scanner.nextInt();

System.out.println("Before swap: x = "+x+", y = "+y);
x = x+y;
y = x-y;
x = x-y;
System.out.println("After swap: x = "+x+", y = "+y);
}

//---------- Q9: Add, Sub, Mul, Div, Mod ----------
void q9_arithmetics(){
System.out.print("Enter your first variable: ");
int x = scanner.nextInt();
System.out.print("Enter your second variable: ");
int y = scanner.nextInt();

System.out.println("Addition is: "+(x+y));
System.out.println("Substraction is: "+(x-y));
System.out.println("Multiplication is: "+(x*y));
System.out.println("Division is: "+((float)x/y)); // cast BEFORE dividing
System.out.println("Modulus is: "+(x%y));
}

//---------- Q10: Third angle of a triangle ----------
void q10_thirdAngle(){
System.out.print("Enter first angle: ");
int angle1 = scanner.nextInt();
System.out.print("Enter second angle: ");
int angle2 = scanner.nextInt();

int angle3 = 180-(angle1+angle2);
System.out.println("Third angle is: "+angle3);
}

//---------- Q11: Ramesh's Salary ----------
void q11_salary(){
System.out.print("Enter basic salary: ");
float basic = scanner.nextFloat();

float da = 0.40f*basic;
float hra = 0.25f*basic;
float pf = 0.20f*basic;
float ta = 0.30f*basic;

float gross = basic+da+hra+ta;
float net = gross-pf;

System.out.println("DA is: "+da);
System.out.println("HRA is: "+hra);
System.out.println("PF is: "+pf);
System.out.println("TA is: "+ta);
System.out.println("Gross Salary is: "+gross);
System.out.println("Net Salary is: "+net);
}

//---------- Q12: Surface of Cylinder ----------
void q12_surfaceCylinder(){
final float pi = 3.14f;
System.out.print("Enter radius (r): ");
float r = scanner.nextFloat();
System.out.print("Enter height (h): ");
float h = scanner.nextFloat();

float s = 2*pi*r*h;
System.out.println("Surface of Cylinder is: "+s);
}

//---------- Q13: Total and Average of five subjects ----------
void q13_totalAverage(){
System.out.print("Enter marks of subject 1: ");
int s1 = scanner.nextInt();
System.out.print("Enter marks of subject 2: ");
int s2 = scanner.nextInt();
System.out.print("Enter marks of subject 3: ");
int s3 = scanner.nextInt();
System.out.print("Enter marks of subject 4: ");
int s4 = scanner.nextInt();
System.out.print("Enter marks of subject 5: ");
int s5 = scanner.nextInt();

int total = s1+s2+s3+s4+s5;
float avg = total/5.0f;

System.out.println("Total is: "+total);
System.out.println("Average is: "+avg);
}

//---------- Q14: Fahrenheit <-> Celsius ----------
void q14_tempConvert(){
System.out.print("Enter temperature in Fahrenheit: ");
float fahrenheit = scanner.nextFloat();

float celsius = (fahrenheit-32)/1.8f;
System.out.println("Temperature in Celsius is: "+celsius);

float backToFahrenheit = (1.8f*celsius)+32;
System.out.println("Converted back to Fahrenheit is: "+backToFahrenheit);
}

//---------- Q15: Sum of digits of a 4 digit number ----------
void q15_sumOfDigits(){
System.out.print("Enter a 4 digit number: ");
int n = scanner.nextInt();

int sum = 0;
int d1 = n%10; n = n/10; sum = sum+d1;
int d2 = n%10; n = n/10; sum = sum+d2;
int d3 = n%10; n = n/10; sum = sum+d3;
int d4 = n%10; n = n/10; sum = sum+d4;

System.out.println("Sum of digits is: "+sum);
}

//---------- Q16: Circumference of Circle ----------
void q16_circumference(){
final float pi = 3.14f;
System.out.print("Enter radius (r): ");
float r = scanner.nextFloat();

float c = 2*pi*r;
System.out.println("Circumference of Circle is: "+c);
}

//---------- Q17: Quotient and Remainder ----------
void q17_quotientRemainder(){
System.out.print("Enter dividend: ");
int x = scanner.nextInt();
System.out.print("Enter divisor: ");
int y = scanner.nextInt();

System.out.println("Quotient is: "+(x/y));
System.out.println("Remainder is: "+(x%y));
}

//---------- Q18: ASCII value of a character ----------
void q18_asciiValue(){
System.out.print("Enter a character: ");
char ch = scanner.next().charAt(0);

int ascii = (int)ch;
System.out.println("ASCII value of "+ch+" is: "+ascii);
}

//---------- Q19: Size of int, float, double, char ----------
void q19_sizeOfDataTypes(){
// Java has no sizeof operator; sizes are fixed by the JVM spec
System.out.println("Size of int is: 4 bytes (32 bits)");
System.out.println("Size of float is: 4 bytes (32 bits)");
System.out.println("Size of double is: 8 bytes (64 bits)");
System.out.println("Size of char is: 2 bytes (16 bits)");
}

//---------- Q20: Reverse a 4 digit number ----------
void q20_reverseNumber(){
System.out.print("Enter a 4 digit number: ");
int n = scanner.nextInt();

int reversed = 0;
while(n>0){
int digit = n%10;
reversed = (reversed*10)+digit;
n = n/10;
}
System.out.println("Reversed number is: "+reversed);
}

//---------- Q21: Sum of first and last digit ----------
void q21_firstLastDigitSum(){
System.out.print("Enter a 4 digit number: ");
int n = scanner.nextInt();

int lastDigit = n%10;
int temp = n;
int firstDigit = 0;
while(temp>0){
firstDigit = temp%10;
temp = temp/10;
}

int sum = firstDigit+lastDigit;
System.out.println("First digit is: "+firstDigit);
System.out.println("Last digit is: "+lastDigit);
System.out.println("Sum of first and last digit is: "+sum);
}

//---------- Q22: Perimeter of Rectangle ----------
void q22_perimeterRectangle(){
System.out.print("Enter length (l): ");
int l = scanner.nextInt();
System.out.print("Enter breadth (b): ");
int b = scanner.nextInt();

int p = 2*(l+b);
System.out.println("Perimeter of Rectangle is: "+p);
}

//---------- Menu ----------
void showMenu(){
System.out.println("\n===== BASIC ASSIGNMENTS MENU =====");
System.out.println("1. Sum of two variables");
System.out.println("2. Sum of two fixed variables (p=2.5, q=3.6)");
System.out.println("3. Simple Interest");
System.out.println("4. Area of Rectangle");
System.out.println("5. Area of Circle");
System.out.println("6. Multiplication of three numbers");
System.out.println("7. Swap using third variable");
System.out.println("8. Swap without third variable");
System.out.println("9. Add, Sub, Mul, Div, Mod");
System.out.println("10. Third angle of a triangle");
System.out.println("11. Ramesh's Salary");
System.out.println("12. Surface of Cylinder");
System.out.println("13. Total and Average of five subjects");
System.out.println("14. Fahrenheit to Celsius conversion");
System.out.println("15. Sum of digits of a 4 digit number");
System.out.println("16. Circumference of Circle");
System.out.println("17. Quotient and Remainder");
System.out.println("18. ASCII value of a character");
System.out.println("19. Size of int, float, double, char");
System.out.println("20. Reverse a 4 digit number");
System.out.println("21. Sum of first and last digit");
System.out.println("22. Perimeter of Rectangle");
System.out.println("0. Exit");
System.out.print("Enter your choice: ");
}

//---------- main ----------
public static void main(String arg[]){
AllAssignments a1 = new AllAssignments();
int choice = -1;

while(choice != 0){
a1.showMenu();
choice = a1.scanner.nextInt();

switch(choice){
case 1: a1.q1_sum(); break;
case 2: a1.q2_sumFixed(); break;
case 3: a1.q3_simpleInterest(); break;
case 4: a1.q4_areaRectangle(); break;
case 5: a1.q5_areaCircle(); break;
case 6: a1.q6_multiplyThree(); break;
case 7: a1.q7_swapWithThird(); break;
case 8: a1.q8_swapWithoutThird(); break;
case 9: a1.q9_arithmetics(); break;
case 10: a1.q10_thirdAngle(); break;
case 11: a1.q11_salary(); break;
case 12: a1.q12_surfaceCylinder(); break;
case 13: a1.q13_totalAverage(); break;
case 14: a1.q14_tempConvert(); break;
case 15: a1.q15_sumOfDigits(); break;
case 16: a1.q16_circumference(); break;
case 17: a1.q17_quotientRemainder(); break;
case 18: a1.q18_asciiValue(); break;
case 19: a1.q19_sizeOfDataTypes(); break;
case 20: a1.q20_reverseNumber(); break;
case 21: a1.q21_firstLastDigitSum(); break;
case 22: a1.q22_perimeterRectangle(); break;
case 0: System.out.println("Exiting..."); break;
default: System.out.println("Invalid choice, try again.");
}
}

}

}