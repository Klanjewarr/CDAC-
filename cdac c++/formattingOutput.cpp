#include <iostream>
#include <iomanip>
int main() {
 double pi = 3.14159265358979323846;
 int width = 15;
 std::cout << "Default format: " << std::setw(width) << pi << std::endl;
 std::cout << "Fixed-point notation: " << std::fixed << std::setw(width) << pi << std::endl;
 std::cout << "Scientific notation: " << std::scientific << std::setw(width) << pi << std::endl;
 std::cout << "Hexadecimal representation: " << std::hexfloat << std::setw(width) << pi << std::endl;
 std::cout << "Default format again: " << std::defaultfloat << std::setw(width) << pi << std::endl;
 // Reset stream formatting to defaults
 std::cout << std::resetiosflags(std::ios::scientific | std::ios::fixed | std::ios::hexfloat);
 std::cout << "Back to default format: " << std::setw(width) << pi << std::endl;
 // Setting precision
 int precision = 5;
 std::cout << "Setting precision to " << precision << ": " << std::fixed << std::setprecision(precision) << pi << std::endl;
 // Manipulating stream state
 std::cout << std::boolalpha << "Boolean value: " << true << std::endl;
 // Padding with setfill
 int num = 123;
 std::cout << "Padding with zeros: " << std::setw(10) << std::setfill('0') << num << std::endl;
 return 0;
}