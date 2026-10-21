package circularQueue;

public class CircularQueueImp implements CircularQueue {

    int[] queue;
    int size;
    int front = -1;
    int rear = -1;

    CircularQueueImp(int size) {
        this.size = size;
        queue = new int[size];
    }

    public void enqueue(int value) {
        if ((rear + 1) % size == front) {
            System.out.println("Queue is Full");
            return;
        }

        if (front == -1) {
            front = 0;
        }

        rear = (rear + 1) % size;
        queue[rear] = value;

        System.out.println(value + " inserted");
    }

    public void dequeue() {
        if (front == -1) {
            System.out.println("Queue is Empty");
            return;
        }

        System.out.println(queue[front] + " deleted");

        if (front == rear) {
            front = -1;
            rear = -1;
        } else {
            front = (front + 1) % size;
        }
    }

    public void display() {
        if (front == -1) {
            System.out.println("Queue is Empty");
            return;
        }

        int i = front;
        System.out.print("Queue: ");

        while (true) {
            System.out.print(queue[i] + " ");

            if (i == rear) {
                break;
            }

            i = (i + 1) % size;
        }

        System.out.println();
    }

}
