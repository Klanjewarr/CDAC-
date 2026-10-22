package Searching;

public class BinarySearchRecussion {

    void binarysearchRecussion(int[] arr, int n, int mid, int start, int end) {
        if (start > end) {
            System.out.println("Not found");
            return;
        }
        mid = (start + end) / 2;
        if (arr[mid] == n) {
            System.out.println("Found at index " + mid);
            return;
        }
        if (arr[mid] < n) {
            binarysearchRecussion(arr, n, mid, mid + 1, end);
        } else {
            binarysearchRecussion(arr, n, mid, start, mid - 1);
        }

    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        int key =10;
        int start = 0;
        int end = arr.length - 1;
        int mid = (start + end) / 2;
        BinarySearchRecussion li = new BinarySearchRecussion();
        li.binarysearchRecussion(arr, key, mid, start, end);
    }
}
