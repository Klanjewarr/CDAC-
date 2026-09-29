package exceptionhandling;

public class ExceptionHandling2 {

    int a = 10;
    int b = 0;
    int arr[] = new int[3];

    void calculate() {
        try {
            try {
                System.out.println("a/b =" + a / b);
            } catch (ArithmeticException e) {
                System.out.println(" Exception: " + e.getMessage());
            }
            arr[3] = 43;
            System.out.println("Array: " + arr[2]);
        } catch (ArrayIndexOutOfBoundsException e) {
            try {
                System.out.println("Exceprion: " + e.getMessage());
            } catch (Exception e1) {
            }
        }
    }

    public static void main(String[] args) {
        ExceptionHandling2 ob = new ExceptionHandling2();
        ob.calculate();
    }
}
