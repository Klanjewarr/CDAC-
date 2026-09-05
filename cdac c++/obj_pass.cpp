#include<iostream>

using namespace std;

class Test
{
private:
   int a,b;
public:
void set(int x, int y){
    a=x;
    b=y;
}
void add(Test ob){
    int x,y; 
    x=a+ob.a;
    y=b+ob.b;
    cout<<"X ="<<x<<endl;
    cout<<"Y ="<<y<<endl;
}//end of class
};

int main(){
    Test t1, t2;
    t1.set(10,20);
    t2.set(30,40);
    t1.add(t2);
    return 0;
}
