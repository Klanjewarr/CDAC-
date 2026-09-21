package inhCls;
public class Child extends Parent1{
    int x;
    
    public Child(){
        super(500); //must be first line of the constructor
        System.out.println("Child Constructor");
        x=10;
    }
    void show(){
        System.out.println("Child x= "+x);
    }
}
