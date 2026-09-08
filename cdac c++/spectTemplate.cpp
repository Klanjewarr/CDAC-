#include<iostream>

using namespace std;

template<class T>
class demo{
    public:
     demo(T x){
        cout<<x<<"Its an Class Template example"<<endl;
     }
};
int main(){
    demo<int> d1(7);
    demo<float>d2(5.6);
    demo<char>d3('n');
}