#include<iostream>
using namespace std;

class shape{
    protected: int I;
    public:
    void getdata(){
        cin>>I;
    }
    virtual float area()=0;
};
class square: public shape
{
    public: float area(){
        return(I*I);
    }
};
class circle: public shape{
    public: float area(){
        return(3.14*I*I);
    }
};
int main(){
    square s;
    cout<<"____________Square__________"<<endl;
    cout<<"Enter the side: ";
    s.getdata();
    float y=s.area();
    cout<<"Area of Square = "<<y<<endl;
    circle c;
    cout<<"_________Circle_________"<<endl<<"Enter the radius";
    c.getdata();
    float z = c.area();
    cout<<"Area of circle= "<<z<<endl;
}