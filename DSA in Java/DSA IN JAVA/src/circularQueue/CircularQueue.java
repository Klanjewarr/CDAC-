package circularQueue;

public interface CircularQueue {
    void enqueue(int value);
    void dequeue();
    void display();
}
    

// Hints for implementing CircularQueue:
// 1. Use an array to store elements with a fixed capacity.
// 2. Maintain two pointers: front and rear.
// 3. Use modulo arithmetic to wrap around the array.
// 4. Keep track of current size to distinguish between full and empty.
// 5. Enque operation adds element at rear, increments rear and size.
// 6. Deque operation removes element at front, increments front and decrements size.
// 7. Front operation returns element at front index.
// 8. Rear operation returns element at (rear-1+capacity)%capacity.
// 9. Display operation loops from front to rear using modulo.
// 10. Handle edge cases: overflow (full) and underflow (empty).
