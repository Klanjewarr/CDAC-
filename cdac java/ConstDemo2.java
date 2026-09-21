
package constructorTest;

public class ConstDemo2 {
    int x,y,z;
    
    public ConstDemo2(){
        this(25);
        x=y=z=0;
        System.out.println("Default Constructor");
    }
    
    public ConstDemo2(int a){
        this(10,20,30);
        System.out.println("Single Parameter Constructor");
        x=y=z=a;
        display();
    }
    
    public ConstDemo2(int x,int y,int z){
        System.out.println("Triple Parameter Constructor");
        this.x=x;
        this.y=y;
        this.z=z;
        display();
    }
    
    void display(){
        System.out.println("Values of Instance variables x= "+x+",y= "+y+",z= "+z);
    }
    
    public static void main(String[] args) {
        //Instantiation of Object
        ConstDemo2 cd=new ConstDemo2();
        cd.display();
    }
   
}
