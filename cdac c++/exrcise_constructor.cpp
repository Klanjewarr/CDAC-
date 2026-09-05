#include<iostream>

using namespace std;

class Rectangle{
    private: int l,b;
    public:
        Rectangle(){//default
        int l=10; 
        int b=20;
        }
        Rectangle(int x,int y){//parameterized
            x=l;
            y=b;
        }
        Rectangle(Rectangle &obj){//copy
            l=obj.l;
            b=obj.b;
        }
         void show(){
            cout<<"Values of Length:"<<l<<endl;
            cout<<"values of Breadth: "<<b<<endl;
        }
        void area(){
            cout<<"Area of Reactangle is: "<<l*b<<endl;
        }
        ~Rectangle(){
            cout<<"Destructor ----><----"<<endl;
        }
};
int main(){
        Rectangle rect1, rect2;


}
