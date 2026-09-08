#include<iostream>

using namespace std;

template <class T>
T add(T a,T b)
{
    return a+b;
}
int main(){
    float x=7.45, y=43.34, z;
    z=add(x, y);
    cout<<"Addition = "<<z<<endl;
    int a=745, b=4334,c;
    c=add(a,b);
    cout<<"Addition = "<<x<<endl;
}