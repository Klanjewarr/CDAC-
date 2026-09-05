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

int main(){
    student s,*p;
    p=&s;
    p->get();//->arrow operator use to access the pointer
    p->put();
// . oprator is also called membership operator used to access the object

}