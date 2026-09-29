package exceptionhandling;

public class ExceptionHandling {
    int  a = 10;
    int b=2;
    void calculate(){
    try{
        System.out.println("C");
        System.out.println("a/b= "+a/b);
    }
//    catch(Exceptiom e){
//        System.out.println("Exception: "+ e.getMessage());
//    }

    finally{
        System.out.println("D");}
    }

    public static void main(String[] args) {
        System.out.println("A");
        ExceptionHandling ob = new ExceptionHandling();
        System.out.println("B");
        ob.calculate();
        System.out.println("E");
    }
    
}
