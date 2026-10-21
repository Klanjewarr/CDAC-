package LinkedList;


public class CircularSinglyLinkedList {
    static class Node {
        int data;
        Node next;
        Node(int data) { this.data = data; }
    }
 
     Node head;
     int size;
 
    public boolean isEmpty() { return head == null; }
 
     Node getLast() {
        Node curr = head;
        while (curr.next != head) curr = curr.next;
        return curr;
    }
 
    public void insertAtBeginning(int value) {
        Node node = new Node(value);
        if (isEmpty()) {
            node.next = node;
        } else {
            Node last = getLast();
            node.next = head;
            last.next = node;
        }
        head = node;
        size++;
        System.out.println(value + " inserted at beginning.");
    }
 
    public void insertAtEnd(int value) {
        Node node = new Node(value);
        if (isEmpty()) {
            node.next = node;
            head = node;
        } else {
            Node last = getLast();
            last.next = node;
            node.next = head;
        }
        size++;
        System.out.println(value + " inserted at end.");
    }
 
    // position is 1-based
    public void insertAtPosition(int value, int pos) {
        if (pos < 1 || pos > size + 1) {
            System.out.println("Invalid position " + pos + " (valid: 1 to " + (size + 1) + ").");
            return;
        }
        if (pos == 1) {
            insertAtBeginning(value);
            return;
        }
        if (pos == size + 1) {
            insertAtEnd(value);
            return;
        }
        Node curr = head;
        for (int i = 1; i < pos - 1; i++) curr = curr.next;
        Node node = new Node(value);
        node.next = curr.next;
        curr.next = node;
        size++;
        System.out.println(value + " inserted at position " + pos + ".");
    }
 
    public void deleteFromBeginning() {
        if (isEmpty()) {
            System.out.println("List is empty. Nothing to delete.");
            return;
        }
        int removed = head.data;
        if (head.next == head) {
            head = null;
        } else {
            Node last = getLast();
            head = head.next;
            last.next = head;
        }
        size--;
        System.out.println(removed + " deleted from beginning.");
    }
 
    public void deleteFromEnd() {
        if (isEmpty()) {
            System.out.println("List is empty. Nothing to delete.");
            return;
        }
        int removed;
        if (head.next == head) {
            removed = head.data;
            head = null;
        } else {
            Node secondLast = head;
            while (secondLast.next.next != head) secondLast = secondLast.next;
            removed = secondLast.next.data;
            secondLast.next = head;
        }
        size--;
        System.out.println(removed + " deleted from end.");
    }
 
    public void search(int value) {
        if (isEmpty()) {
            System.out.println("List is empty.");
            return;
        }
        Node curr = head;
        int pos = 1;
        do {
            if (curr.data == value) {
                System.out.println(value + " found at position " + pos + ".");
                return;
            }
            curr = curr.next;
            pos++;
        } while (curr != head);
        System.out.println(value + " not found.");
    }
 
    public void display() {
        if (isEmpty()) {
            System.out.println("List is empty.");
            return;
        }
        Node curr = head;
        System.out.print("List: ");
        do {
            System.out.print(curr.data + " -> ");
            curr = curr.next;
        } while (curr != head);
        System.out.println("(back to " + head.data + ")");
    }
 
    public static void main(String[] args) {
        CircularSinglyLinkedList list = new CircularSinglyLinkedList();
 
        System.out.println("--- Empty list cases ---");
        list.display();
        list.deleteFromBeginning();
        list.deleteFromEnd();
        list.search(1);
 
        System.out.println("\n--- Single node cases ---");
        list.insertAtBeginning(10);
        list.display();
        list.deleteFromEnd();
        list.display();
        list.insertAtEnd(10);
        list.deleteFromBeginning();
        list.display();
 
        System.out.println("\n--- Insert at beginning, end, and position ---");
        list.insertAtBeginning(20);
        list.insertAtBeginning(10);
        list.insertAtEnd(40);
        list.insertAtPosition(30, 3);
        list.insertAtPosition(5, 1);
        list.insertAtPosition(50, 6);
        list.insertAtPosition(99, 10);
        list.display();
 
        System.out.println("\n--- Search ---");
        list.search(30);
        list.search(77);
 
        System.out.println("\n--- Delete from beginning and end ---");
        list.deleteFromBeginning();
        list.display();
        list.deleteFromEnd();
        list.display();
    }
}
