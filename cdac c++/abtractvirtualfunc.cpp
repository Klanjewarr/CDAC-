#include<iostream>
using namespace std;

class Base{
    public:
    void display(){
        cout<<"display of base is called"<<endl;
    }
    virtual void show()=0;
};
class Derived:public Base {
    public:
    void show(){
        cout<<"show of base is called ";
    }
};
int main(){
    Derived d;
    d.display();
    d.show();

}