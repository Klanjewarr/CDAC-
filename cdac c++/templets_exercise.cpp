#include <iostream>
using namespace std;
//it is just a template i didn't need int, float, etc
template <class T>
class Swap {
private:
    T a, b;

public:
    Swap(T x, T y) {
        a = x;
        b = y;
    }

    void swapNumbers() {
        T temp = a;
        a = b;
        b = temp;
    }

    void display() {
        cout << "a = " << a << endl;
        cout << "b = " << b << endl;
    }
};

int main() {

    Swap<int> s(10, 20);

    cout << "Before swapping:" << endl;
    s.display();

    s.swapNumbers();

    cout << "After swapping:" << endl;
    s.display();

    return 0;
}