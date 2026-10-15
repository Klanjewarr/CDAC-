
package StackDemo;

public class StackImp {

    int capacity;
    int data[];
    int top=-1;
    
    public StackImp(int capacity) {
        this.capacity = capacity;
        this.data = new int[this.capacity];
    }
    
 
    public void push(int value) {
        if(top==capacity-1){
            throw new IllegalStateException("Stack is Full");
        }
        data[++top]=value;
    }

  
    public int pop() {
        if(isEmpty()){
            throw new IllegalStateException("Stack is Empty");
        }
        return data[top--];
    }

  
    public int peek() {
        if(isEmpty()){
            throw new IllegalStateException("Stack is Empty");
        }
        return data[top];
    }

   
    public boolean isEmpty() {
        return top==-1;
    }

    public void display() {
         if(isEmpty()){
            throw new IllegalStateException("Stack is Empty");
        }
         for(int i=top;i>=0;i--){
             System.out.println(data[i]+"\t");
         }
    }

}