#include<iostream>
#include<stdio.h>

using namespace std;

int main(){
    // Grade Calculator
    float grades,eng,hin,mar,sci,mat;
    cout<<"Enter Your Marks in English: ";
    cin>>eng;
    cout<<"Enter Your Marks in Hindi: ";
    cin>>hin;
    cout<<"Enter Your Marks in Marathi: ";
    cin>>mar;
    cout<<"Enter Your Marks in Science: ";
    cin>>sci;
    cout<<"Enter Your Marks in Maths: ";
    cin>>mat;
    grades=((eng+hin+mar+sci+mat)/500)*100;
    cout<<"Your Percentage is:"<<grades<<endl;

    if (grades >= 90 && grades >= 100) {
        cout << "Your Grades are Exceptional: A+";
    }
    else if (grades >= 80 && grades < 90) {
        cout << "Your Grades are Excellent: A";
    }
    else if (grades >= 70 && grades < 80) {
        cout << "Your Grades are Good: B";
    }
    else if (grades >= 60 && grades < 70) {
        cout << "Your Grades are Satisfactory: C";
    }
    else if (grades >= 50 && grades < 60) {
        cout << "Your Grades are Barely acceptable: D";
    }
    else if (grades >= 0 && grades < 50) {
        cout << "Your Grades are Unacceptable: F";
    }
    else {
        cout << "Invalid percentage entered.";
    }
}