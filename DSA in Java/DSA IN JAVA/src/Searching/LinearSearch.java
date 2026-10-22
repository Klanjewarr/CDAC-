
package Searching;

public class LinearSearch {

  boolean linearsearch(int[]arr,int n){
  for(int i=0;i<arr.length;i++){
  if(arr[i]==n){
      return true;
  }
  };  return false;

  }
    public static void main(String[] args) {
        int[]arr={1,2,3,4,5,6,7,8,9,10};
        int key=4;
        LinearSearch li = new LinearSearch();
       System.out.println(li.linearsearch(arr,key));
    }
}