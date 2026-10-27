package Sorting;

public class MergeSort {

    // Step 1: Divide the array into smaller parts
    public void mergeSort(int arr[], int start, int end) {

        if (start < end) {

            int mid = start + (end - start) / 2;

            // Sort the left half
            mergeSort(arr, start, mid);

            // Sort the right half
            mergeSort(arr, mid + 1, end);

            // Merge both sorted halves
            merge(arr, start, mid, end);
        }
    }

    // Step 2: Merge two sorted halves
    public void merge(int arr[], int start, int mid, int end) {

        int temp[] = new int[end - start + 1];

        int i = start;     // Pointer for the left half
        int j = mid + 1;   // Pointer for the right half
        int k = 0;         // Pointer for the temporary array

        // Compare elements from both halves
        while (i <= mid && j <= end) {

            if (arr[i] <= arr[j]) {
                temp[k] = arr[i];
                i++;
            } else {
                temp[k] = arr[j];
                j++;
            }

            k++;
        }

        // Copy remaining elements from the left half
        while (i <= mid) {
            temp[k] = arr[i];
            i++;
            k++;
        }

        // Copy remaining elements from the right half
        while (j <= end) {
            temp[k] = arr[j];
            j++;
            k++;
        }

        // Copy sorted elements back into the original array
        for (int t = 0; t < temp.length; t++) {
            arr[start + t] = temp[t];
        }
    }

    // Step 3: Main method
    public static void main(String[] args) {

        int numbers[] = {89, 87, 40, 83, 65, 10, 12, 56};

        MergeSort ms = new MergeSort();

        ms.mergeSort(numbers, 0, numbers.length - 1);

        System.out.println("Sorted array:");

        for (int num : numbers) {
            System.out.print(num + " ");
        }
    }
}

