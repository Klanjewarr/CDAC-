#include<iostream>

using namespace std;
class num{
    protected:
    int a;
    public:
    void getdata(){
        cout<<"Enter a number";
        cin>>a;
    }
};
class squar: public num
{
    protected: int b;
    public: void squ(){
        b=a*a;
        cout<<"Square of number: "<<b;
    }
};
class cube: public squar{
    public: int c;
    void cub(){
        getdata();
        squ();
        c=b*a;
        cout<<"Cube if number = "<<c;

    }
};

int main(){
    cube cu;
    cu.cub();
    return 0;
}