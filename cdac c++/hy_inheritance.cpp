#include <iostream>
using namespace std;

// Base class 1 student
class Student
{
private:
    char sname[30];

public:
    void studentname()
    {
        cout << "Enter the student name: ";
        cin >> sname;
    }

    void showName()
    {
        cout << "Student Name: " << sname << endl;
    }
};

// Base class 2 subject
class Subject
{
protected:              // protected hai kyu ki derived ko access chiaye
    int m1, m2, m3, m4, m5;

public:
    void submark()
    {
        cout << "Enter the marks in English: ";
        cin >> m1;
        cout << "Enter the marks in Maths: ";
        cin >> m2;
        cout << "Enter the marks in Science: ";
        cin >> m3;
        cout << "Enter the marks in Marathi: ";
        cin >> m4;
        cout << "Enter the marks in History: ";
        cin >> m5;
    }
};

// derived subject se
class physEdu : public Subject
{
private:
    int p1;

public:
//physical edu ke marks liye
    void phyedu()
    {
        cout << "Enter the marks in Physical Education: ";
        cin >> p1;
    }

    int getPhyMarks()
    {
        return p1;
    }
};

// Derived  Student se aur  Subject (Multiple inheritance)
// Combined with physEdu also deriving from Subject ye hua  Hybrid inheritance
class Result : public Student, public physEdu
{
private:
    int total, percentage;

public:
    void res()
    {
        total = m1 + m2 + m3 + m4 + m5 + getPhyMarks();
        percentage = total / 6;   // phy edu ko jod ke 6 sub hue

        showName();
        cout << "Total Marks: " << total << endl;
        cout << "Percentage: " << percentage << "%" << endl;
    }
};

int main()
{
    Result r;
    r.studentname();   //  Student se
    r.submark();       // Subject (physEdu hoke) se
    r.phyedu();        // physEdu se
    r.res();           // Result se

    return 0;
}