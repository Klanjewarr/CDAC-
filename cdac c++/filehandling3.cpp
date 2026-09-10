#include<iostream>
#include<fstream>
using namespace std;

int main(){
    ofstream fout;
    fout.open("country");
    fout<<"United States of America\n";
    fout<<"United Kingdom\n";
    fout<<"South Korea\n";
    fout.close();
    const int n=80;
    char line[n];
    ifstream inf;
    inf.open("country.txt");
    cout<<"\nContents of capital file\n";
    while(inf){
        inf.getline(line, n);
        cout<<line<<"\n";
    }
    inf.close();
}