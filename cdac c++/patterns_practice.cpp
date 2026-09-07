#include<iostream>

using namespace std;

int main(){
    //triangle pattern
    int n;
    cout<<"Enter the size: "<<endl;
    cin>>n;
   
    for (int row=0;row<=n;row++){
        for(int col=0;col<row+1;col++){
            cout<<"* ";
        }
        cout<<endl;
    }
    cout<<endl;
    cout<<endl;
  
    //filpped simple pyrmaid pattern
    for (int row=0; row<=n;row++){
        for(int col=0;col<=n-row;col++){
            cout<<"* ";
        }
        cout<<endl;
    }
    cout<<endl;
    cout<<endl;
    //simple pyramid

    for (int row = 0; row < n; row++) {
    // spaces
        for (int col = 0; col < n - row - 1; col++) {
        cout << " ";
    }
    // stars
        for (int col = 0; col < row + 1; col++) {
        cout << "* ";
    }
    cout << endl;
}
    cout<<endl;
    cout<<endl;


    //half diamond pattern


 for (int row=0;row<=n;row++){
        for(int col=0;col<row+1;col++){
            cout<<"* ";
        }
        cout<<endl;
    }
      for (int row=0; row<=n;row++){
        for(int col=0;col<=n-row-1;col++){
            cout<<"* ";
        }
        cout<<endl;
    }
}
    cout<<endl;
    cout<<endl;

    //Inverted pyramid

 for (int row = 0; row < n; row++) {
    // spaces
    for (int col = 0; col <row ; col++) {
        cout << " ";
    }
    // stars
    for (int col = 0; col < n-row; col++) {
        cout << "* ";
    }
    cout << endl;
}