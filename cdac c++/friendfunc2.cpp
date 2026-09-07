#include<iostream>
using namespace std;

class demo{
    int a,b;
    public:
    friend void show();
};
void show(){
demo d;
cout<<"Enter a and n";
cin>>d.a>>d.b;
cout<<"Value of a = "<<d.a<<endl<<"Value of b= "<<d.b;
}
int main(){
    show();
    return 0;
}