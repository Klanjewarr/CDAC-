#include<iostream>

using namespace std;

class demo{
    private:
      int a, b;
    public:
        demo(){//default constructor
            a=10;
            b=20;
        }
        demo(int x, int y)//parametized construtor
        {
            x=a;
            y=b;
        }
        demo(demo &ob){//copy constructor
            a=ob.a;
            b=ob.b;
        }
        void show(){
            cout<<"Values of A:"<<a<<endl;
            cout<<"values of B: "<<b<<endl;
        }
        ~demo(){//destructor
            cout<<"Destructor called...."<<endl;
        }
};
    int main(){
        demo d,d1(2,3),d2(d);
        d.show();
        d1.show();
        d2.show();
}