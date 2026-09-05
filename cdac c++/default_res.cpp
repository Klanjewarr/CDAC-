#include<iostream>

using namespace std;

class Orange{
    private:
        string org, cat;
    public:
        void fun(string org, string cat="Meow");
};
void Orange::fun(string org, string cat){
            cout<<cat;
        }

int  main(){
 Orange c;
 c.fun( string cat);
}