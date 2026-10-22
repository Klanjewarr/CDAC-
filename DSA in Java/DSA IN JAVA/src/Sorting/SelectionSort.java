package Sorting;

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
        int[]arr={10,23,33,2,3,5,8,3,5,6,8};
        selectionSort(arr);
        for(int i=0;i<arr.length;i++){
            System.out.print(arr[i]+"\t");
        }
    }



  
}