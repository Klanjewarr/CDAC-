package LinkedList;

class Node{
//we are using the node class for reference pointer 
    int data;
    Node next; //reference pointer
    
    //constuctor
    public Node(int data){
        this.data=data;
        this.next=null;
    }
}

public class staticLinkedList {
// the linked list have head  and each node point to next node and only tail points to end
    public static void main(String[] args) {
   Node head, middle,middle2,middle3, last; //three obj
    
    head=new Node(10);
    middle=new Node(20);
    middle2=new Node(40);
    middle3=new Node(50);
    last=new Node(30);
    
    head.next=middle;
    middle.next=middle2;
    middle2.next=middle3;
    middle3.next=last;
    last.next=null;
    
    Node temp= head;
    while(temp!=null){
    System.out.println(temp.data);
    temp=temp.next;
    }
    
    }

    
}