#include<iostream>

using namespace std;
class student{
    private: int id;
            char name[20];
    public: void get();
            void show();
    class address
    {
    private:
        char city[20], state[20];
    public:
            void getadd();
            void showadd();
    };
  
    };
    
void student :: get(){
    cout<<"Enter Student Id and Name: ";
    cin>>id>>name;
}
void student:: show(){
    cout<<"Student Id: "<<id;
    cout<<"Student Name: "<<name;
}
void student::address::getadd(){
    cout<<"Enter the city and state";
    cin>>city>>state;

}
int main(){
    student s;
    student::address a;
    s.get();
    a.getadd();
    s.show();
    a.showadd();
    return 0;
}