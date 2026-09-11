#include<iostream>

using namespace std;

int main(){
    int n=5;

    for (int row =0; row<n;row++){
        for(int col=0;col<n-row;col++){
            cout<<col+1<<" ";
        }
        cout<<endl;
    }
cout<<endl;
     for (int row =0; row<n;row++){
        for(int col=0;col<=row;col++){
            if(col==0){
                cout<<"A"<<" ";
            }
            else if(col==1){
                cout<<"B"<<" ";
            }
            else if(col==2){
                cout<<"C"<<" ";
            }
            else if(col==3){
                cout<<"D"<<" ";
            }
            else{
                cout<<"E"<<" ";
            }
        }
        cout<<endl;
        // asci value
    }
}