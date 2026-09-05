#include<iostream>

using namespace std;

int main(){
    // // 2d matrix a[i][j]

    // int a[2][2],i,j;
    // cout<<"Enter elements for the matrix:"<<endl;
    // for(i=0;i<2;i++){
    //     for(j=0;j<2;j++){
    //         cin>>a[i][j];
    //     }
    // }
    
    // cout<<"_________MATRIX___________"<<endl;
    // for(i=0;i<2;i++){
    //     for(j=0;j<2;j++){
    //         cout<<" "<<a[i][j];
    //     }
    //     cout<<endl;
    // }

    // // Additon
    // int a[2][2],row1,col1;
    // // 2d matrix a[i][j]
    // cout<<"Enter elements for the matrix one:"<<endl;
    // for(row1=0;row1<2;row1++){
    //     for(col1=0;col1<2;col1++){
    //         cin>>a[row1][col1];
    //     }
    // }
    // int row2, col2;
    // // 2d matrix a[i][j]
    // cout<<"Enter elements for the matrix two:"<<endl;
    // for(row2=0;row2<2;row2++){
    //     for(col2=0;col2<2;col2++){
    //         cin>>a[row2][col2];
    //     }
    // }
    
    // cout<<"_________ADD_MATRIX___________"<<endl;
    // int i, j;
    // for(i=0;i<2;i++){
    //     for(j=0;j<2;j++){
    //         cout<<a[i][j]+a[i][j]<<" ";
    //     }
    //     cout<<endl;
    // }

    //  // Transpose
    //  int row, col;
    //  cout<<"Enter the no. of rows: ";
    //  cin>>row;
    //  cout<<"Enter the no. of cols: ";
    //  cin>>col;
    // int a[row][col],row1,col1;
    // // 2d matrix a[i][j]
    // cout<<"Enter elements for the matrix one:"<<endl;
    // for(row1=0;row1<row;row1++){
    //     for(col1=0;col1<col;col1++){
    //         cin>>a[row1][col1];
    //     }
    // }
    
    // cout<<"_________MATRIX___________"<<endl;
    // int i, j;
    // for(i=0;i<row;i++){
    //     for(j=0;j<col;j++){
    //         cout<<a[i][j]<<" ";
    //     }
    //     cout<<endl;
    // }
    // cout<<"_________Transpose_MATRIX___________"<<endl;
    
    // for(i=0;i<col;i++){
    //     for(j=0;j<row;j++){
    //         cout<<a[j][i]<<" ";
    //     }
    //     cout<<endl;
    // }

        // Multiplication

     int row, col; //taking input
     cout<<"Enter the no. of rows: ";
     cin>>row;
     cout<<"Enter the no. of cols: ";
     cin>>col;

    int a[row][col],row1,col1;
    // 2d matrix a[i][j]
    cout<<"Enter elements for the matrix one:"<<endl;
    for(row1=0;row1<row;row1++){
        for(col1=0;col1<col;col1++){
            cin>>a[row1][col1];
        }
    }
    int b[row][col],row2, col2;
    // 2d matrix a[i][j]
    cout<<"Enter elements for the matrix two:"<<endl;
    for(row2=0;row2<row;row2++){
        for(col2=0;col2<col;col2++){
            cin>>b[row2][col2];
        }
    }
    
    cout<<"_________Multiplication_MATRIX___________"<<endl;
    // Multtplication basic formula is c[i][j]=c[i][j]+a[i][k]*b[k][j];
    int i, j, c[row][col];
    for(i=0;i<row;i++){
        for(j=0;j<col;j++){
            c[i][j]=0;
            for(int k=0;k<col;k++)//k is to chage the second col of the same row
            c[i][j]=c[i][j]+a[i][k]*b[k][j];
        }
    }

    // printin
    for(i=0;i<row;i++){
        for(j=0;j<col;j++){
            cout<<c[i][j]<<" ";
        }
        cout<<endl;
    }


}