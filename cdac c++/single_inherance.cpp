#include<iostream>
using namespace std;
class Base{
    public:
        void show(){
            cout<<"Hello from Class A"<<endl;
        }
};
class Derive: private Base{
    public:
            void disp(){
                show();
                    cout<<"Hello from Class B"<<endl; 
            }
};

int  main(){
    Derive d;
    d.disp();
    
}