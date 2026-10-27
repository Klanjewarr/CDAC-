package Sorting;

import java.util.Scanner;

public class QuickSort {

    static void swap(int[] arr, int a, int b) {
        int temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
        //value at index ko swap karke arr me store kare

    }

    static int setPiovtElement(int arr[], int start, int end) {
        int pIndex = start;
        int pivot = arr[end];
        int i;
        for (i = start; i < end; i++) {
            if (arr[i] < pivot) {
                swap(arr, i, pIndex);
                pIndex++;
            }
        }
        swap(arr, end, pIndex);
        return pIndex;
    }
    
    static void quickSort(int arr[], int start, int end){
    if(start<end){
    int pIndex=setPiovtElement(arr,start, end);
    quickSort(arr,start,pIndex-1);
    quickSort(arr,pIndex+1,end);
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
        
        quickSort(arr,0, n-1 );

        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + "\t");
        }
    }
}
