package StackDemo;

public class StackDemo {

    public static void main(String[] args) {
        StackImp stack=new StackImp(5);
        
        System.out.println("Is Empty : "+stack.isEmpty());
        
        stack.push(10);
        stack.push(20);
        stack.push(30);
        stack.push(40);
        stack.push(50);
        
        System.out.println("Peek : "+stack.peek());
        System.out.println("Pop : "+stack.pop());
        
         stack.push(150);
         System.out.println("Pop : "+stack.pop());
//       
         stack.display();
         System.out.println("Pop : "+stack.pop());
         stack.display();
          System.out.println("Pop : "+stack.pop());
         stack.display();
          System.out.println("Pop : "+stack.pop());
         stack.display();
          System.out.println("Pop : "+stack.pop());
         stack.display();
//          System.out.println("Pop : "+stack.pop());
//        stack.push(60);
        
        
    }

}