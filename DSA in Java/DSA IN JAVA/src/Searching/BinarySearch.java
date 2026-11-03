package Searching;

import DummyData.Data;

public class BinarySearch {

    void binarysearch(int[] arr, int n) {
        int start = 0;
        int end = arr.length -1;
  
        while (start <= end) {
            int mid = start + (end - start) / 2;
            if (arr[mid] > n) {
                end = mid-1;
            } else if (arr[mid] < n) {
                start = mid+1;
            }
            else{
                System.out.println(n + " found this value in the array at " +mid);
                return;
            }
        }
        System.out.println("Not Found");
        
    }

    public static void main(String[] args) {
//        int[] arr = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
//        int key = 10;
//        BinarySearch li = new BinarySearch();
//        li.binarysearch(arr, key);
int a[]=Data.arrDataSorted();
    long start = System.nanoTime();
    BinarySearch li = new BinarySearch();
    int key =99999;
      li.binarysearch(a, key);
    long end = System.nanoTime();
    
    System.out.println("Completion time    : " + (end - start) / 1_000_000.0 + " ms");
    }

}
