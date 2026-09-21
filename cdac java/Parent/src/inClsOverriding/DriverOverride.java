package inClsOverriding;

public class DriverOverride {
    public static void main(String[] args){
    Animal a;
    System.out.println("Dog methods");
    a=new Cat();//UpCasting(implicit)
    a.sound();
    a.show();
    if(a instanceof Dog){
    Dog d =(Dog)a; //down Casting(Explicit)
    d.test();
    }
    if(a instanceof Cat){
    Cat d=(Cat)a;//Down Casting(explicit)
    d.test();
    }
//    System.out.println("************************");
//    System.out.println("Animal Method");
//    a= new Animal();
//    a.sound();
//    a.show();
//    
//    System.out.println("************************");
//    System.out.println("Cat Method");
//    a= new Cat();
//    a.sound();
//    a.show();
    }
}
