package recursion;
class Recursionn{  
void showTail(String str){
//    Base Case
    if(str.length()==0)
        return;
    System.out.println(str.charAt(0));
    showTail(str.substring(1));
}
    void showHead(String str){
    //Base Case
    if(str.length()==0)
        return;
    showHead(str.substring(1));//not last statement
    System.out.println(str.charAt(0));
    }
    }


public class Recur {
    public static void main(String[] args) {
        Recursionn r=new Recursionn();
        r.showTail("ABCD");
    }
}
