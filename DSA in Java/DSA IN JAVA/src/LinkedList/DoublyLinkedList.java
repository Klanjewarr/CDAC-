package LinkedList;

class Node {

    Node next; //reference variable capable of referring
    int data;
    Node prev;

    public Node(int data) {

        this.prev = null;
        this.data = data;
        this.next = null;
    }
}

class MyDoublyLinkedList {

    Node head;

    void addFirst(int value) {
        Node newNode = new Node(value);
        if (head == null) {
            head = newNode;
            return;
        }
        newNode.next = head;
        head.prev = newNode;
        head = newNode;
    }

    void addLast(int value) {
        Node newNode = new Node(value);
        if (head == null) {
            head = newNode;
            return;
        }
        Node temp = head;
        while (temp.next != null) {
            temp = temp.next;
        }
        temp.next = newNode;
        newNode.prev = temp;
    }

    void delete(int value) {
        if (head == null) {
            System.out.println("List is empty");
            return;
        }
        Node temp = head;
        while (temp.next != null && temp.data != value) {
            temp = temp.next;
        }
//    Data Not found condition
        if (temp.next == null && temp.data != value) {
            System.out.println("Data Not found");
        } //    For data available at head
        else if (temp == head) {
            System.out.println(temp.data + " deleted");
            head.next.prev = null;
            head = head.next;
        } //    For Data at last node
        else if (temp.next == null) {
            System.out.println(temp.data + " deleted");
            temp.prev.next = null;
        } //    For data at intermidiate position
        else {
            System.out.println(temp.data + " deleted");
            temp.prev.next = temp.next;
            temp.next.prev = temp.prev;
        }
    }

    void print() {
        Node tempFirst = head;
        Node tempLast = null;

        if (head == null) {
            System.out.println("List is Empty");
            return;
        }
        System.out.println("Forwar Traversal.....");
        while (tempFirst != null) {
            System.out.println(tempFirst.data);
            if (tempFirst.next == null) {
                tempLast = tempFirst;
            }
            tempFirst = tempFirst.next;
        }
        System.out.println("*********************************");
        System.out.println("BackWard Traversal....");
        while(tempLast!=null){
            System.out.println(tempLast.data);
            tempLast=tempLast.prev;
        }
    }
}
public class DoublyLinkedList
{
    public static void main(String[] args) {
        MyDoublyLinkedList mdll=new MyDoublyLinkedList();
        mdll.addFirst(10);
        mdll.addFirst(20);
        mdll.addLast(30);
        mdll.addLast(40);
        mdll.addFirst(50);
        
        mdll.print();
        
        mdll.delete(10);
        mdll.print();
    }
}
