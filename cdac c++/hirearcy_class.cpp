#include<iostream>

using namespace std;
class student{
    char name[20];
    char add[20];
    public: 
    void getdata()
    {
        cout<<"\n Enter name of Student :"<<endl;
        cin>>name;
        cout<<"\n Enter address of Student: "<<endl;
        cin>>add;
    }
    void show(){
        cout<<"Student name = "<<name<<endl;
        cout<<"\nAddress of Student ="<<add<<endl;
    }
};

class commerce:public student{
    char c1[20],c2[20],c3[20];
    public:
    void get()
    {
        getdata();
        cout<<"Enter three subject of commerce student\n";
        cin>>c1>>c2>>c3;
    }
    void display(){
        show();
        cout<<"\n Subjects of commerce student = "<<endl<<c1<<endl<<c2<<endl<<c3<<endl;
    }
};
class science:public student{
    char s1[20],s2[20],s3[30];
    public:
    void getin(){
        getdata();
        cout<<"Enter three subjects of science student";
        cin>>s1>>s2>>s3;
    }
    void showdata(){
        show();
        cout<<"subject of science "<<endl<<s1<<endl<<s3<<endl<<s3;
    }
};
int main(){
    cout<<"Enter details for the commerce stream: ";
    commerce c;
    c.get();
    c.display();
    cout<<"Enter Student details for the science stream";
    science s;
    s.getin();
    s.showdata();
    
}