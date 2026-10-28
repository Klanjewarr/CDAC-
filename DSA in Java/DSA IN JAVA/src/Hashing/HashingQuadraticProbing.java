package Hashing;

public class HashingQuadraticProbing {



    static final int SIZE = 5;
    int arr[] = new int[SIZE];

    public HashingQuadraticProbing(){
        for (int i = 0; i < SIZE; i++){
            arr[i] = -1;
        }
    }

    public int insert(int value){
        int key = value % SIZE;
        for (int i = 0; i < SIZE; i++){
            int index = (key + i * i) % SIZE;
            if (arr[index] == -1){
                arr[index] = value;
                return 1;
            }
        }
        System.out.println("Hash Table Full.");
        return 0;
    }

    public int del(int value){
        int key = value % SIZE;
        for (int i = 0; i < SIZE; i++){
            int index = (key + i * i) % SIZE;
            if (arr[index] == value){
                arr[index] = -1;
                return 1;
            }
            if (arr[index] == -1)
                return 0;
        }
        return 0;
    }

    public int search(int value){
        int key = value % SIZE;
        for (int i = 0; i < SIZE; i++){
            int index = (key + i * i) % SIZE;
            if (arr[index] == value)
                return 1;
            if (arr[index] == -1)
                return 0;
        }
        return 0;
    }

    public void display(){
        for (int i = 0; i < SIZE; i++) {
            System.out.println(i + " " + arr[i]);
        }
    }

    public static void main(String[] args) {
        HashingQuadraticProbing qp = new HashingQuadraticProbing();

        qp.insert(10);
        qp.insert(15);
        qp.insert(20);
        qp.insert(25);
        qp.insert(30);

        qp.display();

        if (qp.search(15) == 1)
            System.out.println("Found");
        else
            System.out.println("Not Found");

        if (qp.del(15) == 1)
            System.out.println("Deleted");
        else
            System.out.println("Not Found");

        qp.display();

        if (qp.search(15) == 1)
            System.out.println("Found");
        else
            System.out.println("Not Found");
    }

}