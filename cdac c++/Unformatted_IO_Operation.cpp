#include <iostream>
#include <string>
int main() {
 std::string name;
 std::cout << "Enter your name: ";
 std::getline(std::cin, name); // Read a line of text
 std::cout << "Hello, " << name << "!" << std::endl;
 return 0;
}