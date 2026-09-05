#include<iostream>

using namespace std;
// 1 Answer the questions (i) and (iii) after going through the following class:
// class Seminar
// {
//  int time;
// public:
//  Seminar() //Function 1
//  {
//  time = 30;
//  cout << "Seminar starts now" << endl;
//  }
//  void lecture() //Function 2
//  {
//  cout << "Lectures in the seminar on" << endl;
//  }
//  Seminar(int duration) //Function 3
//  {
//  time = duration;
//  cout << "Seminar starts now" << endl;
//  }
//  ~Seminar() //Function 4
//  {
//  cout << "Thanks" << endl;
//  }
// };
// i. Write statements in C++ that would execute Function 1 and Function 3 of class
// Seminar.
// ii. In Object Oriented Programming, what is Function 4 referred as and when does it
// get invoked/called?
// iii. In Object Oriented Programming, which concept is illustrated by Function 1 and
// Function 3 together? 
// // que one 
// class Seminar
// {
//  int time;
// public:
//  Seminar() //Function 1
//  {
//  time = 30;
//  cout << "Seminar starts now" << endl;
//  }
//  void lecture() //Function 2
//  {
//  cout << "Lectures in the seminar on" << endl;
//  }
//  Seminar(int duration) //Function 3
//  {
//  time = duration;
//  cout << "Seminar starts now" << endl;
//  }
//  ~Seminar() //Function 4
//  {
//  cout << "Thanks" << endl;
//  }
// };

// int main(){
//     //first part
//     Seminar s1, s2(60);
//     s1.Seminar();
//     s2.Seminat(60);
//     //second part
//     // Destruction and  it invoke when it come out of the scope
//     //third part
//     // Default and parametirzed constructor and func overloading
// }

// 2 Answer the questions (i) and
// (ii) after going through the
// following class:
// class Test
// {
//  char paper[20];
//  int marks;
// public:
//  Test () //Function 1
//  {
//  strcpy (paper,
// "Computer");
//  marks = 0;
//  }
//  Test (char p[]) //Function 2
//  {
//  strcpy(paper, p);
//  marks = 0;
//  }
//  Test (int m) //Function 3
//  {

// strcpy(paper,"Computer");
//  marks = m;
//  }
//  Test (char p[], int
// m) // Function 4
//  {
//  strcpy (paper,
// p);
//  marks = m;
//  }
// };
// i. Write statements in C++ that
// would execute Function 1,
// Function 2, Function 3 and
// Function 4 of class Test.
// ii. Which feature of Object
// Oriented Programming is
// demonstrated using Function
// 1, Function 2, Function 3 and
// Function 4 together in the
// above class Test? 

// int main(){
//     //first part 
//     Test t1,t2('a'), t3(5), t4('b',5);

//     t1.Test()
//     t2.Test('a')
//     t3.Test(5)
//     t4.Test('b',5)

    // Second part 
    // function overloading and Polymorphism
// }

// 3.Consider the definition of the following class:
// class Sample
// {
// private:
//  int x;
//  double y;
// public :
//  Sample(); //Constructor 1
//  Sample(int); //Constructor 2
//  Sample(int, int); //Constructor 3
//  Sample(int, double); //Constructor 4
// };
// i. Write the definition of the constructor 1 so that the private member variables are initialized to
// 0.
// ii. Write the definition of the constructor 2 so that the private member variable x is initialized
// according to the value of the parameter, and the private member variable y is initialized to 0.
// iii. Write the definition of the constructors 3 and 4 so that the private
// member variables are initialized according to the values of the parameters.

// int main(){
//     Sample::Sample(){
//         x=0;
//         y=0;
//     }
//     //second part
//     Sample(int a){
//         x=a;
//         y=0;
//     }
//     //thrid part
//     Sample:Sample(int a, int b){
//         x=a;
//         y=b;
//     }
//     Sample:Sample(int a, double b){
//         x=a;
//         y=b;
//     }

// }
