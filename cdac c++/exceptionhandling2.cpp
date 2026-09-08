#include <iostream>
using namespace std;

int main() {
    int age;

    cout << "Enter your age: ";
    cin >> age;

    try {
        if (age < 18) {
            throw "You are not eligible to vote";
        }

        cout << "You are eligible to vote." << endl;
    }
    catch (const char* msg) {
        cout << msg << endl;
    }

    return 0;
}