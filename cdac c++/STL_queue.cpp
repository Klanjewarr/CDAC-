#include <iostream>
#include <queue>
int main() {
 std::queue<int> q;
 q.push(1);
 q.push(2);
 std::cout << q.front() << std::endl; // Output: 1
 q.pop();
 std::cout << q.front() << std::endl; // Output: 2
 return 0;
}
