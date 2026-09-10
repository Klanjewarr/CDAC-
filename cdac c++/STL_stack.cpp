#include <iostream>
#include <stack>
int main() {
 std::stack<int> stk;
 stk.push(1);
 stk.push(2);
 std::cout << stk.top() << std::endl; // Output: 2
 stk.pop();
 std::cout << stk.top() << std::endl; // Output: 1
 return 0;
}