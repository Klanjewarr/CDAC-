package recursion;

public class IndirectRecur {
    static int x=1;
    static void even(){
    if(x==10)
        return;
    System.out.println("Even: "+x);
    ++x;
    odd();
    }
    static void odd(){
    if(x==10)
        return;
        System.out.println("Odd :"+x);
        ++x;
        even();
    }
    public static void main(String[] args) {
        odd();
    }
    }
    
