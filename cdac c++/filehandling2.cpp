#include<iostream>
#include<fstream>
#include<string>
#include<stdio.h>

using namespace std;



int main(){
    char str[80];
    cout<<"Enter a String\n";
    gets(str);
    int len=strlen(str);
    fstream file;
    file.open("fileName.txt", ios::in|ios::out);
    for(int i=0;i<len;i++){
        file.put(str[i]);
    }
        file.seekg(0);
    char ch;
    while(file){
        file.get(ch);
        cout<<ch;
    }
    file.close();
    return 0;
}

// #include <iostream>
// #include <fstream>
// #include <cstring>

// using namespace std;

// int main() {
//     char str[80];

//     cout << "Enter a String\n";
//     cin.getline(str, 80);

//     int len = strlen(str);

//     fstream file;
//     file.open("fileName.txt", ios::in | ios::out | ios::trunc);

//     if (!file) {
//         cout << "Error opening file.\n";
//         return 1;
//     }

//     // Write string to file
//     for (int i = 0; i < len; i++) {
//         file.put(str[i]);
//     }

//     // Make sure data is written
//     file.flush();

//     // Move read pointer to beginning
//     file.seekg(0);

//     // Read and display file contents
//     char ch;
//     while (file.get(ch)) {
//         cout << ch;
//     }

//     file.close();

//     return 0;
// }