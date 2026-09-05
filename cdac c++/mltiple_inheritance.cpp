#include<iostream>
using namespace std;

class A{
    int a;
public:
    int getadd(){
        cout<<"Enter a";
        cin>>a;
        return a;
    }
};
class B{
    int b;
public: int get(){
    cout<<"Enter b: ";
    cin>>b;
}
};