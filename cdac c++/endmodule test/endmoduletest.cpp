#include <iostream>
using namespace std;

class Course
{
private:
    string course_name;
    double cost;

public:
    Course()
    {
        course_name = "";
        cost = 0.0;
    }
    Course(string name, double c)
    {
        course_name = name;
        cost = c;
    }
    string getName()
    {
        return course_name;
    }
    double getCost()
    {
        return cost;
    }
};

class Person
{
private:
    string name;
    string phone_number;

public:
    void setPerson(string n, string p)
    {
        name = n;
        phone_number = p;
    }
    string getName()
    {
        return name;
    }
    string getPhone()
    {
        return phone_number;
    }
};

class Student : public Person
{
private:
    int roll_no;
    Course courses_taken[10];
    int course_count;

public:
    Student()
    {
        roll_no = 0;
        course_count = 0;
    }
    void setRollNo(int r)
    {
        roll_no = r;
    }
    int getRollNo()
    {
        return roll_no;
    }
    void addCourse(Course c)
    {
        if (course_count < 10)
        {
            courses_taken[course_count] = c;
            course_count++;
        }
        else
        {
            cout << "Course list full for this student!" << endl;
        }
    }
    void showCourses()
    {
        if (course_count == 0)
        {
            cout << "No courses taken yet." << endl;
            return;
        }
        for (int i = 0; i < course_count; i++)
        {
            cout << i + 1 << ". " << courses_taken[i].getName() << " - Rs. " << courses_taken[i].getCost() << endl;
        }
    }
    void showStudentInfo()
    {
        cout << "Roll No: " << roll_no << endl;
        cout << "Name: " << getName() << endl;
        cout << "Phone: " << getPhone() << endl;
        cout << "Courses Taken:" << endl;
        showCourses();
    }
};

Course availableCourses[5] = {
    Course("PG Course", 80000),
    Course("Modular Course", 10000),
    Course("Pre-CAT Course", 15000),
    Course("Internship Course", 8000),
    Course("MS-CIT Course", 5000)
};

Student students[50];
int student_count = 0;

void addNewStudent()
{
    if (student_count >= 50)
    {
        cout << "Student limit reached!" << endl;
        return;
    }
    string name, phone;
    int roll;
    cout << "Enter Roll No: ";
    cin >> roll;
    cin.ignore();
    cout << "Enter Name: ";
    getline(cin, name);
    cout << "Enter Phone Number: ";
    cin >> phone;

    students[student_count].setRollNo(roll);
    students[student_count].setPerson(name, phone);
    student_count++;

    cout << "Student added successfully!" << endl;
}

void enrollInCourse()
{
    int roll;
    cout << "Enter Roll No of student: ";
    cin >> roll;

    int index = -1;
    for (int i = 0; i < student_count; i++)
    {
        if (students[i].getRollNo() == roll)
        {
            index = i;
            break;
        }
    }

    if (index == -1)
    {
        cout << "Student not found!" << endl;
        return;
    }

    cout << "Available Courses:" << endl;
    for (int i = 0; i < 5; i++)
    {
        cout << i + 1 << ". " << availableCourses[i].getName() << " - Rs. " << availableCourses[i].getCost() << endl;
    }

    int choice;
    cout << "Enter course number to enroll: ";
    cin >> choice;

    if (choice < 1 || choice > 5)
    {
        cout << "Invalid choice!" << endl;
        return;
    }

    students[index].addCourse(availableCourses[choice - 1]);
    cout << "Enrolled successfully!" << endl;
}

void displayStudentCourses()
{
    int roll;
    cout << "Enter Roll No: ";
    cin >> roll;

    int index = -1;
    for (int i = 0; i < student_count; i++)
    {
        if (students[i].getRollNo() == roll)
        {
            index = i;
            break;
        }
    }

    if (index == -1)
    {
        cout << "Student not found!" << endl;
        return;
    }

    students[index].showStudentInfo();
}

void displayAllStudents()
{
    if (student_count == 0)
    {
        cout << "No students added yet." << endl;
        return;
    }
    for (int i = 0; i < student_count; i++)
    {
        students[i].showStudentInfo();
        cout << "-----------------------------" << endl;
    }
}

int main()
{
    int choice;
    do
    {
        cout << "\n===== Course Enrollment System =====" << endl;
        cout << "1. Add New Student" << endl;
        cout << "2. Enroll in a New Course" << endl;
        cout << "3. Display Courses Taken by a Specific Student" << endl;
        cout << "4. Display All Students and Their Courses" << endl;
        cout << "5. Exit" << endl;
        cout << "Enter your choice: ";
        cin >> choice;

        switch (choice)
        {
        case 1:
            addNewStudent();
            break;
        case 2:
            enrollInCourse();
            break;
        case 3:
            displayStudentCourses();
            break;
        case 4:
            displayAllStudents();
            break;
        case 5:
            cout << "Exiting..." << endl;
            break;
        default:
            cout << "Invalid choice, try again!" << endl;
        }
    } while (choice != 5);

    return 0;
}