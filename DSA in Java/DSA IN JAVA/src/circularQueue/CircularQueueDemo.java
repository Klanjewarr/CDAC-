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
// Hints for CircularQueueDemo
// 1. Create an instance of CircularQueueImp (or your implementation).
// 2. Test enque operation by adding elements.
// 3. Test deque operation and verify removed elements.
// 4. Test front and rear methods.
// 5. Test display to see queue contents.
// 6. Test edge cases: enque when full, deque when empty.
// 7. You can add a main method to run these tests.


