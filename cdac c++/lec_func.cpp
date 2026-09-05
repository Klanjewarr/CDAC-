#include<iostream>

using namespace std;

// fuction is a block of code that perform specific task when called
// implicit and explicit func

// 4 ways to write func:
// 1. without return without argument
// 2. without return with argument
// 3. with return without argument
// 4. with return with argument

// 1. without return without argument
// void add();//function declaration/prototype

// 2. without return with argument
// void add(int , int );

// factorial
//without return without arg
// void fact();
// without return with arg 
// void fact(int);


// 3. with return without argument
float add();

int main(){
    // add();//calling
    
    // call by value
    // int a,b,c;
    // cout<<"Enter 2 intergers no.: "<<endl;
    // cin>>a>>b; 
    // add(a,b);
    // fact();

    // // calling by value
    // int b;
    // cout<<"Enter the number to find the Factorial: ";
    // cin>>b;
    // fact(b);


    // with return calling 
    float a= add();
    cout<<a;
    

}


// void add(){ //defination
//     int a,b,c;
//     cout<<"Enter 2 intergers no.: "<<endl;
//     cin>>a>>b; 
//     c=a+b;
//     cout<<"\n Addition :"<<c<<endl;
// }
// void add(int a, int b){
//     int c=a+b;
//     cout<<"Addition: "<<c<<endl;
// }
// // without return without arg
// void fact(){
//     int a;
//     cout<<"Enter the number to find the Factorial: ";
//     cin>>a;
//     int fact=1;
//     for(int i=1;i<=a;i++){
//         fact= fact*i;
//     }
//     cout<<fact;
// }

// // without return with arg
// void fact(int a){
    
//     int fact=1;
//     for(int i=1;i<=a;i++){
//         fact= fact*i;
//     } 
//     cout<<fact;
// }

// with return without arg 

float add(){ //defination
    float a,b,c;
    cout<<"Enter 2 intergers no.: "<<endl;
    cin>>a>>b; 
    c=a+b;
   return c;
}
