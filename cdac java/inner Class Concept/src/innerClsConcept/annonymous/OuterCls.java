package innerClsConcept.annonymous;

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
        public void show(){
            System.out.println("Hello Parent display");
        }
        public void display(){
            System.out.println("Hello Parent display");
        }
   };
   }