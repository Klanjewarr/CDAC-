#include<iostream>
using namespace std;
int count =0;
class alpha{
    public:
        alpha(){
            count++;
            cout<<"No of Object created:"<<count<<endl;
        }
        ~alpha(){
            cout<<"No of object destroyed "<<count<<endl;
            count--;
        }
};
int main(){
    cout<<"Enter Main ";
    alpha a1,a2,a3,a4;
    {
        cout<<"Enter Block -1"<<endl;
        alpha a5;
    }
    {
        cout<<"Enter Block -2"<<endl;
        alpha a6;
    }
    {
        cout<<"ReEnter  main"<<endl;
    }
}