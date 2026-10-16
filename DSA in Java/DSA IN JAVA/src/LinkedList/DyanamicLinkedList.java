package LinkedList;

class Node {

    int data;
    Node next; //reference variable capable of referring

    public Node(int data) {
        this.data = data;
        this.next = null;
    }
}

class MyLinkedList {

    Node head;

    public void addFirst(int value) {
        Node newNode = new Node(value);
        newNode.next = head;
        head = newNode;
    }

    public void addLast(int value) {
        Node newNode = new Node(value);
//if no code is available
        if (head == null) {
            head = newNode;
        }
//Atleast one node is available
        Node temp = head;
        while (temp.next != null) {
            temp = temp.next;
        }
        temp.next = newNode;
    }

    public void delete(int value) {
        if (head == null) {
            System.out.println("List is empty");
            return;
        }
        if(head.data==value){
        head=head.next;
            System.out.println(value+"deleted");
            return;
        }
        Node temp = head;
        while (temp.next != null && temp.next.data != value) {
            temp = temp.next;
        }
        if(temp.next==null){
            System.out.println("Data Not Found");
        }
        else{
        temp.next=temp.next.next;
            System.out.println(value+" Deleted...");
        }
        
    }
    public void display(){
    if(head==null){
    System.out.println("list is empty");
    return;
    }
    Node temp = head;
    while(temp != null){
    System.out.println(temp.data);
    temp=temp.next;
    }
    
    }
    public boolean search(int value){
    return true;
    }
}

public class DyanamicLinkedList {
    public static void main(String[] args) {
        MyLinkedList mil = new MyLinkedList();
        
        mil.addFirst(10);
        mil.addFirst(20);
        mil.addLast(30);
        mil.addLast(40);
        mil.addFirst(50);
        
        mil.display();
        mil.delete(40);
        
        mil.display();
    }
}
