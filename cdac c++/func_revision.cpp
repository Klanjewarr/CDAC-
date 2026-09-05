#include<iostream>

// without return without argument

using namespace std;
// void areRect(){
//     int a,b;
//     cout<<"Enter the Lenght:";
//     cin>>a;
//     cout<<"Enter the Breadth:";
//     cin>>b;

//     cout<<"Area of Rectangle is: "<<a*b;
// }

// // without return with arg(acc to i/p)
// void areRect(int a, int b){

//     cout<<"Area of Rectangle is: "<<a*b;
// }

// // with return without arg 
// int areRect(){
//  int a,b;
//     cout<<"Enter the Lenght:";
//     cin>>a;
//     cout<<"Enter the Breadth:";
//     cin>>b;
//     return a*b;
// }

// with return with arg 
int areRect(int a, int b){
    return a*b;
}


int main(){
    // areRect() //--> calling for without return without arg

    // for without return with arg
    //  int a,b;
//     cout<<"Enter the Lenght:";
//     cin>>a;
//     cout<<"Enter the Breadth:";
//     cin>>b;

// // For with return without arg
//     int area = areRect();
//     cout<<"Area of Rectangle is: "<<area;

// for with return with argument
    int a, b;
    cout<<"Enter the Lenght:";
    cin>>a;
    cout<<"Enter the Breadth:";
    cin>>b;
      int area = areRect(a,b);
    cout<<"Area of Rectangle is: "<<area;
}