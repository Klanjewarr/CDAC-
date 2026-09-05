#include <iostream>

using namespace std;

class student
{
private:
    int admno;
    char name[20];
    float eng;
    float math;
    float sci;
    float total;

    float ctotal()
    {
        return (eng + math + sci);
    }

public:
    void takeData()
    {
        cout << "\n Enter Student Id: ";
        cin >> admno;
        cout << "\n Enter Student Name: ";
        cin >> name;
        cout << "\n Enter Marks in English: ";
        cin >> eng;
        cout << "\n Enter Marks in Math: ";
        cin >> math;
        cout << "\n Enter Marks in Science: ";
        cin >> sci;
        total = ctotal();
    }
    void ShowData()
    {
        cout << "\nYour Name is: " << name << endl;
        cout << "\nYour Student Id is: " << admno << endl;
        cout << "\nYour mark in English: " << eng << endl;
        cout << "\nYour mark in Maths: " << math << endl;
        cout << "\nYour mark in Science: " << sci << endl;
        cout << "\nYour total Marks in three Subject is " << total << endl;
    }
};

int main()
{
    student s;
    s.takeData();
    s.ShowData();
}