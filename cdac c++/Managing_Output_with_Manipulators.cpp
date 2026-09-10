#include <iostream>
#include <iomanip>
int main() {
 double pi = 3.14159;
 std::cout << std::setprecision(3) << std::fixed << pi << std::endl;
 return 0;
}
