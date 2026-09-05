#include<iostream>
#include<stdio.h>

using namespace std;

int main(){
    char str[20];
    cout<<"\n Enter any String: ";
    gets(str);
    int i=0;
    for(; str[i]!='\0';i++){

    }
    //reverse of str
    for(;i>=0;i--){
        cout<<""<<str[i]<<endl;
    }
    cout<<"Length of a String is : "<<i;
}