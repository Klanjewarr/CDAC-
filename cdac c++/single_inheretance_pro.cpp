// #include <iostream>
// using namespace std;
// class engine{
//     public: 
//     void start()
//     {
//         cout<<"\n Start the Engine of the car ";
//     }
// };
// class Car:private engine
// {
//     public:
//     void turnonkey()
//     {
//         cout<<"\n Starting the car with key"<<endl;
//         start();
//     }
// };
// int main()
// {
//     Car c;
//     c.turnonkey();
//     return 0;
// }

#include<iostream>
using namespace std;
class emp{
    public:
        void get(){
            string n, email;
           int m;
           cout<<"Enter the Name: ";
           cin>>n;
           cout<<"Enter the Mobile ";
           cin>>m;
           cout<<"Enter the email: ";
           cin>>email;
          
        }
};
class Salary: private emp{
    public:
            int salary(){
                  int s,pf;
                  cout<<"Enter your Salary is: ";
                  cin>>s;
                  return s;
            }
            void calculate(){
                int s=salary();
                cout<<"Net Salary is: "<<s;

            }
            void disp(){
                get();
                int d=salary();
                cout<<"Your Salary is :"<<d;
                calculate();
            }
};

int  main(){
   Salary s;
   s.disp();
    
}