
package constructorTest;

public class ConstDemoo {
    int x,y,z;
    public ConstDemoo(){
        System.out.println("Default Constructor");
    }
    
    void display(){
        System.out.println("Values of Instance variables x="+x+",y= "+y+"and z= "+z);
    }
    
    public static void main(String[] args) {
        System.out.println("Main Method");
        ConstDemoo cd=new ConstDemoo();
        cd.display();
    }
}
