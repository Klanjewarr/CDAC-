#include <iostream>
#include <fstream>
#include <cstring>
using namespace std;

class Book {
    int bookid;
    char bname[30];

public:
    void setdetails(int x, const char y[]) {
        bookid = x;
        strcpy(bname, y);
    }

    void getdetails() {
        cout << "Book Id = " << bookid << endl;
        cout << "Book Name = " << bname << endl;
    }
};

int main() {
    Book b1, c1;

    // Write
    ofstream outf("book.txt", ios::binary);

    if (!outf) {
        cout << "File cannot be opened!" << endl;
        return 1;
    }

    b1.setdetails(1, "Computer");
    outf.write((char*)&b1, sizeof(b1));
    outf.close();

    // Read
    ifstream inf("book.txt", ios::binary);

    if (!inf) {
        cout << "File cannot be opened!" << endl;
        return 1;
    }

    inf.read((char*)&c1, sizeof(c1));
    inf.close();

    // Display
    c1.getdetails();

    return 0;
}