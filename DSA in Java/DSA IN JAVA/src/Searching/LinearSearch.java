
package Searching;

import DummyData.Data;

public class LinearSearch {

  boolean linearsearch(int[]arr,int n){
  for(int i=0;i<arr.length;i++){
  if(arr[i]==n){
      System.out.println("Found "+n+" at "+i);
      return true;
  }
  };  return false;

  }
    public static void main(String[] args) {
//        int[]arr={1,2,3,4,5,6,7,8,9,10};
//        int key=4;
//        LinearSearch li = new LinearSearch();
//       System.out.println(li.linearsearch(arr,key));
int a[]=Data.arrDataUnsorted();
    long start = System.nanoTime();
    LinearSearch li = new LinearSearch();
    int key=4000;
    System.out.println(li.linearsearch(a,key));
    long end = System.nanoTime();
    
    System.out.println("Completion time    : " + (end - start) / 1_000_000.0 + " ms");
    }
}