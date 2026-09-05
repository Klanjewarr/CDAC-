#include <iostream>

using namespace std;

int main()
{

        // Switch Case

        // int a;
        // cout<<"-----------------------MENU---------------------"<<endl;
        // cout<<"1.TEA"<<endl;
        // cout<<"2.COFFEE"<<endl;
        // cout<<"3.Juice"<<endl;
        // cout<<"Enter Beverage you  want (1-3): ";
        // cin>>a;
        // switch(a){
        //     case 1: cout<<"Chai Leolo chai....."<<endl;
        //             break;
        //     case 2:cout<<"Coffe Leolo coffe....."<<endl;
        //             break;
        //     case 3:cout<<"Juice Leolo Juice....."<<endl;
        //             break;
        //     default: cout<<"Nhai hai mail";
        //                 break;
        // }

        // vowel or consunet

        //     char input;
        //     cout<<"Enter a alphbet: ";
        //     cin>>input;
        //     switch(input){
        //         case 'a': cout<<"vowel";
        //                 break;
        //         case 'e': cout<<"vowel";
        //                 break;
        //         case 'i': cout<<"vowel";
        //                 break;
        //         case 'o': cout<<"vowel";
        //                 break;
        //         case 'u': cout<<"vowel";
        //                 break;
        //         case 'A': cout<<"vowel";
        //                 break;
        //         case 'E': cout<<"vowel";
        //                 break;
        //         case 'I': cout<<"vowel";
        //                 break;
        //         case 'O': cout<<"vowel";
        //                 break;
        //         case 'U': cout<<"vowel";
        //                 break;
        //         default:cout<<"It is Consonant";
        //                 break;

        //     }

        // Celsius to Fahrenheit
        int input;
        float a;
        cout << "Choose the Option to convert:" << endl;
        cout << "1.Celsius to Fahrenheit" << endl;
        cout << "2.Fahrenheit to Celsius " << endl;
        cin >> input;

        switch (input)
        {
        case 1:
                cout << "Enter the Celsius temperature: ";
                cin >> a;
                cout << "Fahrenheit:" << (a * 1.8) + 32;
                break;
        case 2:
                cout << "Enter the Fahrenheit temperature: ";
                cin >> a;
                cout << "Celcius:" << (a - 32) / 1.8;

                break;

        default:
                cout << "Invalid";
                break;
        }

        // Add, mul, div, sub, mod

        int n;
        cout << "_________CALCULATOR_________" << endl;
        cout << "1.ADD" << endl;
        cout << "2.Sub" << endl;
        cout << "3.Multiply" << endl;
        cout << "4.Reminder" << endl;
        cin >> n;

        int a, b;
        switch (n)
        {
        case 1:
                cout << "Enter the first number: ";
                cin >> a;
                cout << "Enter the Second number: ";
                cin >> b;

                cout << "Your Sum is " << a + b;
                break;
        case 2:
                cout << "Enter the first number: ";
                cin >> a;
                cout << "Enter the Second number: ";
                cin >> b;

                cout << "Your Substraion is " << a - b;
                break;
        case 3:
                cout << "Enter the first number: ";
                cin >> a;
                cout << "Enter the Second number: ";
                cin >> b;

                cout << "Your Sum is " << a * b;
                break;
        case 4:
                cout << "Enter the first number: ";
                cin >> a;
                cout << "Enter the Second number: ";
                cin >> b;

                cout << "Your Reminder is " << a % b;
                break;

        default:
                cout<<"Invalid"<<endl;
                break;
        }
}