#include<iostream>

using namespace std;

int main(){
    // omega best theta avg and O worst case
    // arrays - collection of similar data types
    // 5 is size and subscript 
    // 1-D array
    
    // int arr[5]={2,3,4,5,6},i; //compile time initilzation
    // cout<<"______________ARRAY_______________"<<endl;
    // for(i=0;i<5;i++){
    //     cout<<"Array of ["<<i<<"] is "<<arr[i]<<endl;
    // }

    // user given array
    // int arr[5];
    // cout<<"Enter the elements: "<<endl;
    // for(int i=0;i<5;i++){
    //     cin>>arr[i];
    // }

    // for(int j=0;j<5;j++){
    //     cout<<"Array of ["<<j<<"] is "<<arr[j]<<endl;
    // }


// Write a program to find sum of array elements
// // input
//  int arr[5];
//     cout<<"Enter the elements: "<<endl;
//     for(int i=0;i<5;i++){
//         cin>>arr[i];
//     }
// // output
// int sum=0;
//     for(int j=0;j<5;j++){
//         sum=sum+arr[j];
//     }
//     cout<<sum;


// Write a program to find even num  array elements
// // input
//  int arr[5];
//     cout<<"Enter the elements: "<<endl;
//     for(int i=0;i<5;i++){
//         cin>>arr[i];
//     }
// // output
//     for(int j=0;j<5;j++){
//         if(arr[j]%2==0){
//             cout<<arr[j]<<endl;
//         }
       
//     }


// // Biggest element in a array
// int arr[5];
//     cout<<"Enter the elements: "<<endl;
//     for(int i=0;i<5;i++){
//         cin>>arr[i];
//     }
// //checking biggest number for that we need a previous pointer
//  int prev=0;
//     for(int j=0;j<5;j++){
//        if(arr[j]>prev){
//         prev=arr[j];
//        }
//     }
//     cout<<"Biggest Number in array is : "<<prev;


// // prime number in array
// // agar num%i==0 hai to c ko badhav aur agar ake se jyada divide hua to c toh 2 hojayega

//  int arr[5];
//     cout<<"Enter the elements: "<<endl;
//     for(int i=0;i<5;i++){
//         cin>>arr[i];
//     }
// // output

//     for(int j=0;j<5;j++){
//         // checking 
//         int div=0;
//         // this is the iteration upto number to check wheather it  prime or not 
//       for(int a=2;a<=arr[j];a++){
//         // cout<<arr[j]%a<<endl; //o/p
//         // condition
//         if(arr[j]%a==0){
//             div++;
//         }

//         // only 2 factor 1 and num 
//         // how we can find the factors of number 
//         // in math we use 
//       }
//       if(div==1){
//         cout<<arr[j]<<endl;
//       }
       
//     }
    

    // enter marks of 5 sub to calculate total and print the avg using array
   
// input
 int arr[5];
    cout<<"Enter the Marks: "<<endl;
    for(int i=0;i<5;i++){
        cin>>arr[i];
    }
// output
int sum=0;
    for(int j=0;j<5;j++){
        sum=sum+arr[j];
    }
    
    int avg;
    avg=sum/5;
    cout<<"Your Avg Marks is: "<<avg;

}