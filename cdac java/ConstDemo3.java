
package constructorTest;

public class ConstDemo3 {
    int x,y,z;
    static int s;
    
    static{
        s=101;
    }
    
    public ConstDemo3(){
        System.out.println("Default Constructor");
    }

    void display(){
        System.out.println("Values of Instance variables x= "+x+",y= "+y+"and z= "+z);
    }

    public static void main(String[] args) {
        System.out.println("Value of static variable "+s);
        System.out.println("Main Method");
        //Instatiation of Object
        ConstDemo3 cd=new ConstDemo3();
        cd.display();
    }
}