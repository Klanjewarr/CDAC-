#include<iostream>

inline int Addition(int x=10, int y=20){
    return(x+y);
}
using namespace std;
int main(){
    int num1, num2;
    cout<<"Enter two Numbers";
    cin>>num1>>num2;
    cout<<"\n Sum ="<<Addition();
    cout<<"\n sum= "<<Addition(num1);
    cout<<"\n Sum= "<<Addition(num1, num2);
}