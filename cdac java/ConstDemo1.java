
package constructorTest;

public class ConstDemo1 {
    int x,y,z;
   
    public ConstDemo1(){
        x=y=z=0;
        System.out.println("Default Constructor");
    }
    
    public ConstDemo1(int a){
        System.out.println("Single Parameter Constructor");
        x=y=z=a;
    }
    
    public ConstDemo1(int x,int y,int z){
        System.out.println("Triple Parameter Constructor");
        this.x=x;
        this.y=y;
        this.z=z;
    }
    
    void display(){
        System.out.println("Values of Instance variables x= "+x+",y= "+y+",z= "+z);
    }
    
    public static void main(String[] args) {
        //Instantiation of Object
        ConstDemo cd=new ConstDemo();
        ConstDemo cd1=new ConstDemo(25);
        ConstDemo cd2=new ConstDemo(10,20,30);
        
        cd.display();
        cd1.display();
        cd2.display();
    }
   
}

