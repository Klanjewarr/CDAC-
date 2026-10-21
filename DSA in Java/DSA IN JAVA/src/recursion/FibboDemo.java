package recursion;

public class FibboDemo {
 static int fib(int n ){
 if(n<=1)
     return n;
 return fib(n-1)+fib(n-2);
 }
    public static void main(String[] args) {
        int n=5;
//        System.out.println("Fibbo of "+n+" is "+fib(n));
        for(int i=0;i<=n;i++){
            System.out.print(fib(i)+"\t");
        }
    }
 
}