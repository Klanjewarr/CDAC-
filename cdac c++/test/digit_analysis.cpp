#include<iostream>
using namespace std;

int main(){
    int n;
    cout<<"Enter a Number: ";
    cin>>n;

    int count=0,sum =0;
    int lar=0, small=0;
    while(n>0){
        int x=n%10;//last digit
        count++;
        sum=sum+x;
        n=n/10; // single digit
        if(x>lar){
            lar=x;
        }
        else{
            small=x;
        }
       
    
    }

    cout<<"Number of digit: "<<count<<endl;
    cout<<"Sum of the Number is: "<<sum<<endl;
    cout<<"Largest digit is: "<<lar<<endl;
    cout<<"Smallest digit is: "<<small;

}