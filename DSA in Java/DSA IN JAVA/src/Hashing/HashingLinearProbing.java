
package Hashing;


public class HashingLinearProbing {

    static final int SIZE = 5;
    int arr[] = new int[SIZE];

    public HashingLinearProbing(){
        for (int i = 0; i < SIZE; i++){
            arr[i] = -1;
        }
    }

    public int insert(int value){
        int key = value % SIZE;
        int index = key;
        while (arr[index] != -1){
            index = (index + 1) % SIZE;
            if (index == key){
                System.out.println("Hash Table Full.");
                return 0;
            }
        }
        arr[index] = value;
        return 1;
    }

    public int del(int value){
        int key = value % SIZE;
        int index = key;
        while (arr[index] != value){
            if (arr[index] == -1) return 0;
            index = (index + 1) % SIZE;
            if (index == key) return 0;
        }
        arr[index] = -1;
        return 1;
    }

    public int search(int value){
        int key = value % SIZE;
        int index = key;
        while (arr[index] != value){
            if (arr[index] == -1) return 0;
            index = (index + 1) % SIZE;
            if (index == key) return 0;
        }
        return 1;
    }

    public void display(){
        for (int i = 0; i < SIZE; i++){
            System.out.println(i + "  " + arr[i]);
        }
    }

    public static void main(String[] args){
        HashingLinearProbing lp = new HashingLinearProbing();

        lp.insert(10);
        lp.insert(15);
        lp.insert(20);
        lp.insert(25);
        lp.insert(30); 

        lp.display();

        if(lp.search(15) == 1){
            System.out.println("Found");
        }
        else{
            System.out.println("Not Found");
        }

        if(lp.del(15) == 1){
            System.out.println("Deleted");
        }else{
            System.out.println("Not Found");
        }
        lp.display();

        if(lp.search(15) == 1){
            System.out.println("Found");
        }else{
            System.out.println("Not Found");
        }
    }
}
