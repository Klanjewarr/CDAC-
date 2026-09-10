#include <iostream>
#include <typeinfo>
class Base {
public:
 virtual ~Base() {}
};
class Derived : public Base {};
int main() {
 Base* b = new Derived();
 std::cout << "Type: " << typeid(*b).name() << std::endl; // Outputs the type name
 delete b;
 return 0;
}