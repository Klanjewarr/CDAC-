#include <iostream>
using namespace std;

class sample
{
    int a;
    public:
    sample()
    {
        a = 10;
    }
    friend void add();
};

class demo
{
    int b;
    public:
    demo()
    {
        b = 20;
    }
    friend void add();
};

void add()
{
    sample s;
    demo d;
    int c = s.a + d.b;
    cout<<"Addition is : "<<c;
}
int main()
{
    add();
    return 0;

}