#include<iostream>
using namespace std;
class Circle
{
private:
        int r;
        float area;
public:
        void get_radius();
        void cir_area();
};

void Circle::get_radius(){
    cout<<"\nnter the radius of a Circle";
    cin>>r;
}
void Circle::cir_area(){//scope resolution
    area = 3.14*r*r;
    cout<<"\n Area of a Circle: "<<area;
}

int main(){
    Circle O;//creating a object of O
    O.get_radius();
    O.cir_area();
}
