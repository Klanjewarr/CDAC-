#include <iostream>
using namespace std;

// 1. Armstrong - without return, without arg (takes its own input)
void armstrong(){
    int a;
    cout << "Enter number to check Armstrong: ";
    cin >> a;

    int og = a; 
    // og a ko sum me store karthe
    int sum = 0;

    while (a != 0) {//should not be equal to zero
        int n1 = a % 10;//single digit extract MOD USE KIYA
        sum += n1 * n1 * n1; //cube kiya
        a /= 10;//last digit remove
    }

    if (sum == og){
        cout << og << " is an Armstrong number" << endl;
    }
    else{
    cout << og << " is not an Armstrong number" << endl;
}
}

// 2. Factorial - with return, with arg
int factorial(int a){
    int fact = 1;               
    for (int i = 1; i <= a; i++) {
        fact = fact * i;
    }
    return fact;
}

// 3. Reverse - without return, with arg
void reverse(int a){
    int rev = 0;
    while (a != 0) {
        int n1 = a % 10; 
        rev = rev * 10 + n1;
        a /= 10;
    }
    cout << "Reversed number: " << rev << endl;
}

// 4. Palindrome - with return, without arg (takes its own input)
int palindrome(){
    int a;
    cout << "Enter number to check palindrome: ";
    cin >> a;

    int og = a;
    int rev = 0;
    while (a != 0) {
        int n1 = a % 10;
        rev = rev * 10 + n1;
        a /= 10;
    }

    return (og == rev);  //directly return check if else
}

int main()
{
    cout << "__________MENU___________" << endl;
    cout << "1. Armstrong (without return, without arg)" << endl;
    cout << "2. Factorial (with return, with arg)" << endl;
    cout << "3. Reverse (without return, with arg)" << endl;
    cout << "4. Palindrome (with return, without arg)" << endl;

    int ind;
    cout << "Enter the Option: ";
    cin >> ind;

    switch (ind)
    {
    case 1:
        armstrong();
        break;

    case 2: {
        int n;
        cout << "Enter number for factorial: ";
        cin >> n;
        int ans = factorial(n);
        cout << "Factorial: " << ans << endl;
        break;
    }

    case 3: {
        int n;
        cout << "Enter number to reverse: ";
        cin >> n;
        reverse(n);
        break;
    }

    case 4: {
        int result = palindrome();//it is giving 0 or 1
        if (result) //it can check direct conditon
            cout << "It is a palindrome" << endl;
        else
            cout << "It is not a palindrome" << endl;
        break;
    }

    default:
        cout << "Invalid Error";
        break;
    }

    return 0;
}