package queueDemo;

public class QueueImp implements Queue {

    int capacity;
    int data[];
    int rear = -1;
    int front = 0;

    public QueueImp(int capacity) {
        if (capacity < 0) {
            throw new IllegalStateException("Negative capacity is not allowed");
        }
        this.capacity = capacity;
        this.data = new int[capacity];
    }

    public void enque(int value) {
        if (isFull()) {
            throw new IllegalStateException("Queue is Full...");
        }
        data[++rear] = value;
    }

    public int deque() {
        if (isEmpty()) {
            throw new IllegalStateException("Queue is Empty...");
        }
        if (rear < front) {
            rear = -1;
            front = 0;
            System.out.println("All Data Removed");
            return 0;
        }
        return data[front++];
    }

    public int peek() {
        if (isEmpty()) {
            throw new IllegalStateException("Queue is Empty....");
        }
        return data[front];
    }

    public boolean isEmpty() {
        return rear == -1;
    }

    public boolean isFull() {
        return rear == capacity - 1;
    }

    public void display() {
        for (int i = front; i <= rear; i++) {
            System.out.println(data[i] + "\t");
        }
    }
}
