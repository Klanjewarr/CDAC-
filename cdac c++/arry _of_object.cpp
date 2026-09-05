// class
#include <iostream>

using namespace std;

class student
{
private:
    int id;
    char name[20];

public:
    void get()
    {
        cout << "\n Enter Studeent Id and Name: ";
        cin >> id >> name;
    }
    void put()
    {
        cout << "\n Student id: " << id;
        cout << "\n Student Name: " << name;
    }
};

int main()
{
    // student s[2];//array of an object
    // int i;
    // for(i=0;i<2;i++){
    //     s[i].get();
    //         s[i].put();
    // }

    // multiple object

    student s,o; // array of an object
    int i;
   s.get();
   s.put();
   o.get();
   o.put();
}