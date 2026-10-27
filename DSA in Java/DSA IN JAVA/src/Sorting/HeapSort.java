package Sorting;

import java.util.Scanner;

public class HeapSort {

    static void swap(int[] arr, int a, int b) {
        int temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
        //value at index ko swap karke arr me store kare

    }

    static void Heapify(int arr[], int index, int size) { //to create max heap and min heap we are creating max heap now
        int left = 2 * index + 1;
        int right = left + 1;
        int max = index;

        if (left < size && arr[left] > arr[max]) {
            max = left;
        }
        if (right < size && arr[right] > arr[max]) {
            max = right;
        }
        if (index != max) {
            swap(arr, max, index);
            Heapify(arr, max, size);
        }
    }

    static void BuildHeap(int arr[], int size) {
        int i;
        for (i = size/ 2; i >= 0; i--) {
            Heapify(arr, i, size);
        }
    }
    
    static void HeapSort(int arr[], int size){
     BuildHeap(arr,size);
     while(size>0){
     swap(arr,0,size);
     size--;
     Heapify(arr,0,size);
     
     }
     
    }
    
     public static void main(String[] args) {
        int n;
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the size of the Array: ");
        n = sc.nextInt();
        int arr[] = new int[n]; //arr as a object and taking user defined size of arr
        System.out.println("Enter the array");
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        
        sc.close();

        System.out.println("Unsorted Array: ");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + "\t");
        }
        System.out.println();

        System.out.println("Sorted Array: ");
        
        HeapSort(arr, n-1);

        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + "\t");
        }
    }
}