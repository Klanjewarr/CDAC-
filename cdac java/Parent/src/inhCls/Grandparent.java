package inhCls;

public class Grandparent {
    int p;
    public Grandparent(int p){
    this.p=p;
    System.out.println("Grand Parent Constructor");
    }
    
    void test(){
        System.out.println("Grand Parent = "+ this.p);
    }
}
