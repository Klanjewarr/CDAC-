#include <iostream>
using namespace std;

int main(){
    // sum of two vairables
    double p;
    cout<<"Enter the Basic Salary: ";
    cin>> p;
    
    // cout<<"Enter the second angle: ";
    // cin>> r;
    // cout<<"Enter the third number: ";
    // cin>> t;
    // double area= p*r*t ;
    // cout<<"Area of circle is: "<<area ;

    // double add = p+r;
    // double sub = p-r;
    // double mul = p*r;
    // double div = p/r;
    // int mod = int(p)%int(r);

    // cout<<"\n add:"<<add;
    // cout<<"\n sub:"<<sub;
    // cout<<"\n mul: "<<mul;
    // cout<<"\n div: "<<div;
    // cout<<"\n mod: "<<mod;

    float pf = 0.20*p;
    float da = 0.40*p;
    float hra = 0.25*p;
    float ta = 0.30*p;

    cout<<"\nGross Salary is: "<<p+da+hra+ta;
    cout<<"\nNet Salary is:"<<p+da+hra+ta-pf;
    cout<<"\nPF is "<<pf;

}