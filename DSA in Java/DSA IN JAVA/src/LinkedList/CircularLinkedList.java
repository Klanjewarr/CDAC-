package LinkedList;

public class CircularLinkedList {

    static class Node {
        int data;
        Node next;
        Node(int data) { this.data = data; }
    }
 
    // Only 'tail' is stored; tail.next is always the first node.
    Node tail;
 
    public boolean isEmpty() { return tail == null; }
 
    public void insertAtBeginning(int value) {
        Node node = new Node(value);
        if (isEmpty()) {
            tail = node;
            node.next = node;
        } else {
            node.next = tail.next;
            tail.next = node;
        }
        System.out.println(value + " inserted at beginning.");
    }
 
    public void insertAtEnd(int value) {
        Node node = new Node(value);
        if (isEmpty()) {
            tail = node;
            node.next = node;
        } else {
            node.next = tail.next;
            tail.next = node;
            tail = node;
        }
        System.out.println(value + " inserted at end.");
    }
 
    public void deleteByValue(int value) {
        if (isEmpty()) {
            System.out.println("List is empty. Cannot delete " + value);
            return;
        }
        Node prev = tail;
        Node curr = tail.next;
        do {
            if (curr.data == value) {
                if (curr == curr.next) {          // only one node
                    tail = null;
                } else {
                    prev.next = curr.next;
                    if (curr == tail) tail = prev; // deleted the last node
                }
                System.out.println(value + " deleted.");
                return;
            }
            prev = curr;
            curr = curr.next;
        } while (prev != tail);                    // stop after the tail is checked
        System.out.println(value + " not found. Nothing deleted.");
    }
 
    public void search(int value) {
        if (isEmpty()) {
            System.out.println("List is empty.");
            return;
        }
        Node curr = tail.next;
        int pos = 1;
        do {
            if (curr.data == value) {
                System.out.println(value + " found at position " + pos + ".");
                return;
            }
            curr = curr.next;
            pos++;
        } while (curr != tail.next);               // stop when back at the start
        System.out.println(value + " not found.");
    }
 
    public void display() {
        if (isEmpty()) {
            System.out.println("List is empty.");
            return;
        }
        Node start = tail.next;
        Node curr = start;
        System.out.print("List: ");
        do {
            System.out.print(curr.data + " -> ");
            curr = curr.next;
        } while (curr != start);
        System.out.println("(back to " + start.data + ")");
    }
 
    public static void main(String[] args) {
       CircularLinkedList list= new CircularLinkedList();
 
        System.out.println("--- Empty list checks ---");
        list.display();
        list.deleteByValue(5);
        list.search(5);
 
        System.out.println("\n--- Insert at beginning: 20, 10 ---");
        list.insertAtBeginning(20);
        list.insertAtBeginning(10);
        list.display();
 
        System.out.println("\n--- Insert at end: 30, 40 ---");
        list.insertAtEnd(30);
        list.insertAtEnd(40);
        list.display();
 
        System.out.println("\n--- Search ---");
        list.search(30);
        list.search(99);
 
        System.out.println("\n--- Delete middle (30), first (10), last (40) ---");
        list.deleteByValue(30);
        list.display();
        list.deleteByValue(10);
        list.display();
        list.deleteByValue(40);
        list.display();
 
        System.out.println("\n--- Delete value not present, then last remaining node ---");
        list.deleteByValue(99);
        list.deleteByValue(20);
        list.display();
    }


}