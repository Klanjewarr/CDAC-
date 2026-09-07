// Function overloading
#include<iostream>
inline int mul(int a, int b){
    return(a*b);
}
inline int mul(int a, int b, int c){
    return(a*b*c);
}
inline float mul(int a, float b){
    return(a*b);
}
using namespace std;
int main(){
    int a,b,c;
    float d;
    cout<<"Enter 3 integer values and a float value: ";
    cin>>a>>b>>c>>d;

    int y= mul(a,b);
    cout<<"Multiplication = "<< y <<endl;

    int z=mul(a,b,c);
    cout<<"Multiplication = "<<z;

    cout<<"\n Multiply: "<<mul(a,d);

}