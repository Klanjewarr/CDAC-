package queueDemo;

public class LinearQueueDemo {

    public static void main(String[] args) {
        Queue queue=new QueueImp(3);
        
        System.out.println("Empty : "+queue.isEmpty());
        System.out.println("Full : "+queue.isFull());
        queue.enque(10);
        queue.enque(20);
        queue.enque(30);
//        queue.enque(40);
        
        queue.display();
        
        System.out.println("Peek : "+ queue.peek());
        System.out.println("Deque : "+ queue.deque());
        System.out.println("Peek : "+ queue.peek());
        System.out.println("Deque : "+ queue.deque());
        System.out.println("Peek : "+ queue.peek());
        System.out.println("Deque : "+ queue.deque());
        System.out.println("Deque : "+ queue.deque());
//        queue.display();

System.out.println("Empty : "+queue.isEmpty());
        System.out.println("Full : "+queue.isFull());
        queue.enque(100);
        queue.enque(200);
        queue.enque(300);
        queue.display();
    }

}