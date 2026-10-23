package Sorting;

import java.util.Scanner;

public class InsertionSort {

    static void insertionSort(int[] arr) {
        for (int i = 1; i < arr.length - 1; i++) {
            int value = arr[i];//checcking value of first index
            int index = i;
            while (index > 0 && arr[index - 1] > value) {//stop when we donot have value to compare if it is smaller then we swap 
                arr[index] = arr[index - 1];
                index--;
            }
            arr[index] = value;
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
        insertionSort(arr);

        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + "\t");
        }
    }

}
