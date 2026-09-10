#include <iostream>
#include <exception>
class Base {
public:
 virtual ~Base() {}
};
class Derived : public Base {};
int main() {
 Base* b = new Derived();
 Derived* d = dynamic_cast<Derived*>(b);
 if (d) {
 std::cout << "Successful downcast!" << std::endl;
 } else {
 std::cout << "Downcast failed!" << std::endl;
 }
 delete b;
 return 0;
}
