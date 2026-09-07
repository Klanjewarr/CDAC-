#include<iostream>
using namespace std;

class demo{
    friend void show();
};
void show(){
    cout<<"Welcome to Friend Function...";
 }
int main(){
    show();
}

