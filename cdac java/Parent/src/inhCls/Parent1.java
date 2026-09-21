
package inhCls;


public class Parent1 extends Grandparent {

    int a;
    public Parent1(int a){
    super(101);
    System.out.print("Parent Constructor");
    this.a=a;
    }
   void display() {
       System.out.println("Parent a= "+a);
    }
    
}
