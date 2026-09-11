#include <iostream>
using namespace std;

int main() {

    string name[5];
    int price[5];
    int quantity[5];
    int choice;

    // Input 5 products
    for (int i = 0; i < 5; i++) {
        cout << "Enter name, price, quantity: ";
        cin >> name[i] >> price[i] >> quantity[i];
    }


        // Menu
        cout << "\n----- Welcome to Shop -----" << endl;
        cout << "1. Display the products" << endl;
        cout << "2. Search the product" << endl;
        cout << "3. Calculate total inventory value" << endl;
        cout << "4. Find the most expensive product" << endl;
        cout << "5. Products with quantity below 5" << endl;
        cout << "6. Exit" << endl;

        cout << "Enter your choice: ";
        cin >> choice;

        switch (choice) {

            case 1:
                for (int i = 0; i < 5; i++) {
                    cout << name[i] << " ";
                         
                }
                break;

            case 2: {
                string searchName;
                cout << "Enter product name to search: ";
                break;
            }

            case 3: {
                int total = 0;

                for (int i = 0; i < 5; i++) {
                    total = total + price[i] * quantity[i];
                }

                cout << "Total inventory value: " << total << endl;
                break;
            }

            case 4: {
                int max = price[0];
                int index = 0;

                for (int i = 1; i < 5; i++) {
                    if (price[i] > max) {
                        max = price[i];
                        index = i;
                    }
                }

                cout << "Most expensive product: "
                     << name[index] << endl;
                cout << "Price: " << max << endl;

                break;
            }

            case 5:
                cout << "Products with quantity below 5:" << endl;

                for (int i = 0; i < 5; i++) {
                    if (quantity[i] < 5) {
                        cout << name[i] << endl;
                    }
                }

                break;

            case 6:
                cout << "Thank You for the visit!" << endl;
                return 0;

            default:
                cout << "Invalid choice!" << endl;
        }
    

    return 0;
}