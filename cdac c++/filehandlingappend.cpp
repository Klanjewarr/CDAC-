#include<iostream>
#include<fstream>
using namespace std;

int main(){
    fstream f;
    ofstream fout;
    ifstream fin;
        fin.open("test.txt");
        fout.open("test.txt", ios::app);
    if(fin.is_open())
        fout<<"Append the data";
        cout<<"Data has been appended to file"<<endl;
        fin.close();
        fout.close();
        string word;
        f.open("test.txt");
        while(f>>word){
            cout<<word<<" ";
        }
        return 0;
}