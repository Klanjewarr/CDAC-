package queueDemo;

public interface Queue {
 void enque(int value);
 int deque();
 int peek();
 boolean isEmpty();
 boolean isFull();
 void display();
}