
package LinkedList;

public class StackUsingLinkedList {

    static class Node {
        int data;
        Node next;
        Node(int data) { this.data = data; }
    }
 
     Node top;
 
    public boolean isEmpty() { return top == null; }
 
    public void push(int value) {
        Node node = new Node(value);
        node.next = top;
        top = node;
        System.out.println(value + " pushed.");
    }
 
    public void pop() {
        if (isEmpty()) {
            System.out.println("Stack Underflow! Cannot pop.");
            return;
        }
        System.out.println(top.data + " popped.");
        top = top.next;
    }
 
    public void peek() {
        if (isEmpty()) {
            System.out.println("Stack is empty. No top element.");
            return;
        }
        System.out.println("Top element: " + top.data);
    }
 
    public void display() {
        if (isEmpty()) {
            System.out.println("Stack is empty.");
            return;
        }
        System.out.print("Stack (top -> bottom): ");
        for (Node cur = top; cur != null; cur = cur.next) {
            System.out.print(cur.data + " ");
        }
        System.out.println();
    }
 
    public static void main(String[] args) {
        StackUsingLinkedList s = new StackUsingLinkedList();
 
        System.out.println("--- Underflow tests on empty stack ---");
        s.pop();
        s.peek();
 
        System.out.println("\n--- Push 10, 20, 30, 40 ---");
        s.push(10);
        s.push(20);
        s.push(30);
        s.push(40);
        s.display();
 
        System.out.println("\n--- Peek ---");
        s.peek();
 
        System.out.println("\n--- Pop twice ---");
        s.pop();
        s.pop();
        s.display();
 
        System.out.println("\n--- Pop remaining, then underflow ---");
        s.pop();
        s.pop();
        s.display();
        s.pop();
    }
}

