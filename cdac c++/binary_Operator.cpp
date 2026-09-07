#include<iostream>
using namespace std;

class demo{
    int a,b;
    public:
    void getdata(){
        cout<<"enter the value of a and b : ";
        cin>>a>>b;
    }
    void putdata(){
        cout<<"Values of a= "<<a<<endl<<"Value of b= "<<b<<endl;
    }
    demo operator +(demo x){
        demo m;
        m.a= a +x.a;
        m.b=b+x.b;
        return m;
    }
};

int main(){
    demo d1,d2,d3;
    d1.getdata();//a=2, b=3
    d2.getdata();//a=2, b=5
    d3 =d1+d2; //calling
    d3.putdata();
}