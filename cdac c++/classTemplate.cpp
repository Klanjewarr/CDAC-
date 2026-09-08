#include<iostream>
using namespace std;

template <class T>
class sample{
    private: 
    T first, second;
    public:
    sample(T a,T b){
        first = a;
        second= b;
    }
    T bigger();
};
template <class T>
T sample<T>::bigger(){
    return(first>second ? first:second);
}
int main(){
    sample<float> s(2.3,4.5);
    cout<<s.bigger();
    sample<char> c('e','t');
    cout<<c.bigger();
}