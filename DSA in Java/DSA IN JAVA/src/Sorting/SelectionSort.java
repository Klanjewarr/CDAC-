package Sorting;

import DummyData.Data;
import static Sorting.InsertionSort.insertionSort;

public class SelectionSort {
   static void swap(int[]arr,int a, int b) {
        int temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
        //value at index ko swap karke arr me store kare
        
    }

    static void selectionSort(int[] arr) {
        for (int i = 0; i < arr.length - 1; i++) {
            for (int j = i+1; j < arr.length; j++) {
                if (arr[j] < arr[i]) {
                    swap(arr,i,j);
                }
            }
        }
    }
    
    public static void main(String[] args) {
//        int[]arr={10,23,33,2,3,5,8,3,5,6,8};
//        selectionSort(arr);
//        for(int i=0;i<arr.length;i++){
//            System.out.print(arr[i]+"\t");

int a[]=Data.arrDataUnsorted();
    long start = System.nanoTime();
     selectionSort(a);
    long end = System.nanoTime();
    for(int i=0;i<10;i++){
            System.out.print(a[i]+"\t");
        }
        System.out.println();
    System.out.println("Completion time    : " + (end - start) / 1_000_000.0 + " ms");

        
    }



  
}