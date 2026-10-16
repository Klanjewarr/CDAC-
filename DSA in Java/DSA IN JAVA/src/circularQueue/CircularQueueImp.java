package circularQueue;

public class CircularQueueImp implements CircularQueue{

//    We have the basic understaning that a ciruclar queue is the data structure where the end point to the start  
    
  

// Hints for implementing CircularQueueImp:
// 1. Add instance variables: int[] arr; int capacity; int front; int rear; int size;

//    int[] data; 
//    int capacity;
//    int front=0;
//    int rear=-1;
//    int size;

// 2. Initialize array in constructor with given capacity (you may add a constructor).
//    
//      public CircularQueueImp(int capacity) { //constructor
//        if (capacity < 0) {
//            throw new IllegalStateException("Negative capacity is not allowed");
//        }
//        this.capacity = capacity;
//        this.data = new int[capacity];
//    }
//    
//// 3. Enque: check if full (size == capacity), if full print overflow or return.
//       public void enque(int value) {
//        if (size==capacity) {
//            throw new IllegalStateException("Queue Overflow...");
//        }
//        data[++rear] = value;
//    }
//
//// 4. Insert at rear index: arr[rear] = value; rear = (rear + 1) % capacity; size++;
//       public void rear(int value){
//       if
//       }
// 5. Deque: check if empty (size == 0), if empty print underflow or return.
// 6. Retrieve front element: int value = arr[front]; front = (front + 1) % capacity; size--; return value;
// 7. Front: return arr[front] if not empty.
// 8. Rear: return arr[(rear - 1 + capacity) % capacity] if not empty.
// 9. Display: loop from i=0 to size-1, index = (front + i) % capacity, print arr[index].
//10. Consider adding a constructor CircularQueueImp(int capacity) to set up the array.
//11. Ensure methods match the interface (change return types if needed).

       
       
 
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