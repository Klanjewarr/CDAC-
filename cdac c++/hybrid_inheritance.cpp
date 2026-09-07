#include <iostream>
using namespace std;

// 1. Base Class
class Vehicle {
public:
    int speed;
    Vehicle() { 
        cout << "1. Vehicle constructor called." << endl; 
    }
    void showVehicle() {
        cout << "This is a vehicle." << endl;
    }
};

// 2. Intermediate Class 1 (Virtual Inheritance)
class Car : virtual public Vehicle {
public:
    Car() { 
        cout << "2. Car constructor called." << endl; 
    }
};

// 3. Intermediate Class 2 (Virtual Inheritance)
class Boat : virtual public Vehicle {
public:
    Boat() { 
        cout << "3. Boat constructor called." << endl; 
    }
};

// 4. Hybrid Class (Multiple Inheritance)
class AmphibiousVehicle : public Car, public Boat {
public:
    AmphibiousVehicle() { 
        cout << "4. AmphibiousVehicle constructor called." << endl; 
    }
};

int main() {
    cout << "Creating an Amphibious Vehicle:" << endl;
    AmphibiousVehicle amphi;
    
    cout << "\nAccessing Base Class Method:" << endl;
    // Without 'virtual' inheritance, this line would cause an error!
    amphi.showVehicle(); 
    
    // We can also safely access base class variables
    amphi.speed = 100; 

    return 0;
}