#include<iostream>


using namespace std;

int main(){
    int num;
    cout<<"Enter the number to check the divisibilty: ";
    cin>>num;
    if(num%8==0&&num%5==0){
        cout<<"The "<<num<<" is divisible by 8 and 5";
    }
    else if(num%8==0){
        cout<<"The "<<num<<" is dividble by 8";
    }
    else if(num%5==0){
        cout<<"The "<<num<<" is dividble by 5";
    }
    else{
        cout<<"The "<<num<<" is neither divible by 8 and 5";
    }
}