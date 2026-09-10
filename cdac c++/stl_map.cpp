#include <iostream>
#include <map>
int main() {
 std::map<std::string, int> m;
 m["Alice"] = 25;
 m["Bob"] = 30;
 std::cout << "Alice's age: " << m["Alice"] << std::endl; // Output: 25
 return 0;
}