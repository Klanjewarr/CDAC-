package innerClsConcept.annonymous;

public class Outer {

//   class Parent{
//       void show(){
//           System.err.println("Hello Parent display");
//       }
//   }
//   abstract class Parent{
//       abstract void show();
//       abstract void display();
//   }
   interface Parent{
       void show();
       void display();
   }
   public class OuterCls {
   Parent p=new Parent (){
       
   }
   }
}