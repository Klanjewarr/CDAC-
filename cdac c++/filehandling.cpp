#include <fstream>
#include <iostream>
using namespace std;

int main() {
    int a;
    float b;
    char c;
    char name[20];

    ofstream outf("test.txt", ios::out | ios::binary);
    cout << "Enter a int, float, char, string values" << endl;
    cin >> a >> b >> c >> name;
    outf << a << endl << b << endl << c << endl << name << endl;
    outf.close();

    ifstream inf("test.txt", ios::in | ios::binary);
    inf >> a >> b >> c >> name;
    cout << a << endl;
    cout << b << endl;
    cout << c << endl;
    cout << name << endl;
    inf.close();
}