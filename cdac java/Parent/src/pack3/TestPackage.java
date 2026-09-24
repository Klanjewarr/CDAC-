//for same name use this mthod.
package packageDemo.pack3;
//import packageDemo.pack1.Demo;
//import packageDemo.pack2.Demo;

public class TestPackage {
    public static void main(String ar[]) {
         packageDemo.pack1.Demo d1= new packageDemo.pack1.Demo();
        packageDemo.pack2.Demo d2= new packageDemo.pack2.Demo();
    d1.show();
       d2.show();
    }
}
