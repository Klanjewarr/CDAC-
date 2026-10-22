package Searching;

public class BinarySearch {

    void binarysearch(int[] arr, int n) {
        int start = 0;
        int end = arr.length - 1;
        int mid;
        while (start <= end) {
            mid = (start + end) / 2;
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
        int[] arr = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        int key = 10;
        BinarySearch li = new BinarySearch();
        li.binarysearch(arr, key);
    }

}
