// class
#include <iostream>

using namespace std;

// class student
// {
// private:
//     int id;
//     char name[20];

// public:
//     void get()
//     {
//         cout << "\n Enter Studeent Id and Name: ";
//         cin >> id >> name;
//     }
//     void put()
//     {
//         cout << "\n Student id: " << id;
//         cout << "\n Student Name: " << name;
//     }
// };

// class rectangle with data member length and breadth having 2 func for input and calculate area of rectangle

class rectangle
{
private:
    int l;
    int b;
public:
    void getLandB()
    {
        cout << " Enter the Lenght of the Rectangle: ";
        cin >> l;
        cout << "Enter the Breadth of the Rectangle: ";
        cin >> b;
    }
    void areaRect()
    {
        cout << "Area of Rectangle is: " << l * b;
    }
};

int main()
{
    // student s;
    rectangle r;
    r.getLandB();
    r.areaRect();
}