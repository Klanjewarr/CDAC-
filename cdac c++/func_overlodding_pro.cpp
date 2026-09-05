#include <iostream>

using namespace std;

// class Arthimetic{
//     private:
//         int a, b;
//         float r;
//     public:

//         void area(int a,int b ){
//             int c=a*b;
//             cout<<"The Area of Rectangle: "<<c ;
//         }
//         void area(float r){
//             cout<<"\n Area of Circle: "<<r*3.14;
//         }
// };

// int main(){
//     int a,b;
//     float r;
//     Arthimetic num;
//     cout<<"Enter the Length: ";
//             cin>>a;
//             cout<<"Enter the Breadth: ";
//             cin>>b;
//     num.area(a,b);
//     cout<<"Enter the radius: ";
//             cin>>r;
//     num.area(r);
// }

// same func print() is being

class draft
{
private:
    int a;
    float b;
    string c;

public:
    void print(int a);
    void print(float b);
    void print(string c);
};

void draft::print(int a)
{
    a=10;
    cout<<a;
}
void draft::print(float b)
{
    b=10;
    cout<<b;
}
void draft::print(string c)
{
    a=10;
    cout<<a;
}

