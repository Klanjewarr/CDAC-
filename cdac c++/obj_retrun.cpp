#include<iostream>

using namespace std;

class Test
{
private:
    int a,b;
    public: 
        void set (int x, int y){
            a=x;
            b=y;
        }
        Test add(Test x2){
            Test t3;
            t3.a=a+x2.a;
            t3.b=b+x2.b;
            return t3;
        }
        void disp(){
            cout<<"A= "<<a<<endl;
            cout<<"B= "<<b<<endl;
        }

};//end of class

int main(){
    Test t1, t2, t4;
    cout<<"\n__________T1 Values___________"<<endl;
    t1.set(10,20);
    t1.disp();
    cout<<"\n _________T2 Valuse___________"<<endl;
    t2.set(30,40);
    t2.disp();
    cout<<"\n__________T3 Values___________"<<endl;
    t4 = t1.add(t2);
    t4.disp();
}
