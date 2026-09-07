// uniary operator  
#include<iostream>
using namespace std;

class op{
    int a,b;
    public:
    op(){ //default constructior
        a=10;
        b=20;
    }
    void operator ++(){
        a=++a;
        b=b+1;
    }
    void show(){
        cout<<"value of a= "<<a<<endl<<"Value of b= "<<b<<endl;
    }
};

int main(){
    op o;
    o.show();
    ++o;//calling
    o.show();
    return 0;
}