package exceptionhandling;

public class ExceptionHandling3 {

    int a = 10;
    int b = 2;

    void calculate() throws Exception {
        System.out.println("C");
        System.out.println("a/b = " + a / b);
        throw new Exception("My Exception");
    }

    public static void main(String[] args) {
        System.out.println("A");
        ExceptionHandling3 ob = new ExceptionHandling3();
        System.out.println("B");
        try {
            ob.calculate();
            
        }
        catch(Exception e){
            System.out.println(e.getMessage());
        }
        System.out.println("E");
    }
}
