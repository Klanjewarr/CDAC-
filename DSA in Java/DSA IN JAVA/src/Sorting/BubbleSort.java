package Sorting;
import DummyData.Data;

public class BubbleSort {
    //compare first position to all

   static void swap(int[]arr,int a, int b) {
        int temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
        //value at index ko swap karke arr me store kare
        
    }

    static void bubbleSort(int[] arr) {
        for (int i = 0; i < arr.length - 1; i++) {
            for (int j = 0; j < arr.length-1-i; j++) {
                if (arr[j] > arr[j+1]) {
                    swap(arr,j,j+1);
                }
            }
        }
    }
    
    public static void main(String[] args) {
//        int[]arr={10,23,33,2,3,5,8,3,5,6,8};
//        bubbleSort(arr);
//        for(int i=0;i<arr.length;i++){
//            System.out.print(arr[i]+"\t");
//        }
    int a[]=Data.arrDataUnsorted();
    long start = System.nanoTime();
     bubbleSort(a);
      for(int i=0;i<10;i++){
            System.out.print(a[i]+"\t");
        }
        System.out.println();
    long end = System.nanoTime();
    
    System.out.println("Completion time    : " + (end - start) / 1_000_000.0 + " ms");

    }

}
