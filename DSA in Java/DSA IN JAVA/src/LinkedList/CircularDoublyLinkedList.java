package LinkedList;
public class CircularDoublyLinkedList {
    static class Node {
        int data;
        Node prev, next;
        Node(int data) { this.data = data; }
    }
 
    Node head;
    int size;
 
    public boolean isEmpty() { return head == null; }
 
    public void insertAtBeginning(int value) {
        Node node = new Node(value);
        if (isEmpty()) {
            node.next = node;
            node.prev = node;
        } else {
            Node tail = head.prev;
            node.next = head;
            node.prev = tail;
            tail.next = node;
            head.prev = node;
        }
        head = node;
        size++;
        System.out.println(value + " inserted at beginning.");
    }
 
    public void insertAtEnd(int value) {
        Node node = new Node(value);
        if (isEmpty()) {
            node.next = node;
            node.prev = node;
            head = node;
        } else {
            Node tail = head.prev;
            node.next = head;
            node.prev = tail;
            tail.next = node;
            head.prev = node;
        }
        size++;
        System.out.println(value + " inserted at end.");
    }
 
    public void deleteByValue(int value) {
        if (isEmpty()) {
            System.out.println("List is empty. Cannot delete " + value);
            return;
        }
        Node curr = head;
        for (int i = 0; i < size; i++) {          // visit each node exactly once
            if (curr.data == value) {
                if (size == 1) {
                    head = null;
                } else {
                    curr.prev.next = curr.next;
                    curr.next.prev = curr.prev;
                    if (curr == head) head = curr.next;
                }
                size--;
                System.out.println(value + " deleted.");
                return;
            }
            curr = curr.next;
        }
        System.out.println(value + " not found. Nothing deleted.");
    }
 
    public void displayForward() {
        if (isEmpty()) {
            System.out.println("List is empty.");
            return;
        }
        System.out.print("Forward : ");
        Node curr = head;
        for (int i = 0; i < size; i++) {
            System.out.print(curr.data + " ");
            curr = curr.next;
        }
        System.out.println();
    }
 
    public void displayReverse() {
        if (isEmpty()) {
            System.out.println("List is empty.");
            return;
        }
        System.out.print("Reverse : ");
        Node curr = head.prev;                     // start from the tail
        for (int i = 0; i < size; i++) {
            System.out.print(curr.data + " ");
            curr = curr.prev;
        }
        System.out.println();
    }
 
    public static void main(String[] args) {
        CircularDoublyLinkedList list = new CircularDoublyLinkedList();
 
        System.out.println("--- Empty list ---");
        list.displayForward();
        list.displayReverse();
        list.deleteByValue(1);
 
        System.out.println("\n--- Single node ---");
        list.insertAtBeginning(20);
        list.displayForward();
        list.displayReverse();
 
        System.out.println("\n--- Insert at beginning: 10 ; at end: 30, 40 ---");
        list.insertAtBeginning(10);
        list.insertAtEnd(30);
        list.insertAtEnd(40);
        list.displayForward();
        list.displayReverse();
 
        System.out.println("\n--- Delete middle (30), first (10), last (40) ---");
        list.deleteByValue(30);
        list.displayForward();
        list.displayReverse();
        list.deleteByValue(10);
        list.displayForward();
        list.displayReverse();
        list.deleteByValue(40);
        list.displayForward();
        list.displayReverse();
 
        System.out.println("\n--- Delete missing value, then the last remaining node ---");
        list.deleteByValue(99);
        list.deleteByValue(20);
        list.displayForward();
        list.displayReverse();
    }
}
