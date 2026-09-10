#include <iostream>
#include <vector>
int main() {
 std::vector<int> vec = {1, 2, 3, 4, 5};
 vec.push_back(6); // Add an element
 for (int i : vec) {
 std::cout << i << " "; // Output: 1 2 3 4 5 6
 }
 return 0;
}