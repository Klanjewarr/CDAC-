package circularQueue;

public class CircularQueueDemo {

    public static void main(String[] args) {
        CircularQueue cq = new CircularQueueImp(5);

        cq.enqueue(10);
        cq.enqueue(20);
        cq.enqueue(30);

        cq.display();

        cq.dequeue();

        cq.enqueue(40);
        cq.display();
    }
}


