package Hashing;

public class HashingDouble {

    static final int SIZE = 5;
    static final int p = 3;  
    int arr[] = new int[SIZE];

    public HashingDouble(){
        for (int i = 0; i < SIZE; i++){
            arr[i] = -1;
        }
    }

    private int hash1(int key){
        return key % SIZE;
    }

    private int hash2(int key){
        return p - (key % p);
    }

    public int insert(int value){
        int index = hash1(value);
        int stepSize = hash2(value);

        for (int i = 0; i < SIZE; i++){
            int newIndex = (index + i * stepSize) % SIZE;
            if (arr[newIndex] == -1){
                arr[newIndex] = value;
                return 1;
            }
        }
        System.out.println("Hash Table Full.");
        return 0;
    }

    public int del(int value){
        int index = hash1(value);
        int stepSize = hash2(value);

        for (int i = 0; i < SIZE; i++){
            int newIndex = (index + i * stepSize) % SIZE;
            if (arr[newIndex] == value){
                arr[newIndex] = -1;
                return 1;
            }
            if (arr[newIndex] == -1)
                return 0;
        }
        return 0;
    }

    public int search(int value){
        int index = hash1(value);
        int stepSize = hash2(value);

        for (int i = 0; i < SIZE; i++){
            int newIndex = (index + i * stepSize) % SIZE;
            if (arr[newIndex] == value)
                return 1;
            if (arr[newIndex] == -1)
                return 0;
        }
        return 0;
    }

    public void display(){
        for (int i = 0; i < SIZE; i++){
            System.out.println(i + " " + arr[i]);
        }
    }

    public static void main(String[] args){
        HashingDouble dh = new HashingDouble();

        dh.insert(10);
        dh.insert(15);
        dh.insert(20);
        dh.insert(25);
        dh.insert(30);

        dh.display();

        if (dh.search(15) == 1)
            System.out.println("Found");
        else
            System.out.println("Not Found");

        if (dh.del(15) == 1)
            System.out.println("Deleted");
        else
            System.out.println("Not Found");

        dh.display();

        if (dh.search(15) == 1)
            System.out.println("Found");
        else
            System.out.println("Not Found");
    }

}