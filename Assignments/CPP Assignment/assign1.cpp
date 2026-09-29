// // simplest version
// #include <iostream>
// #include <memory>
// #include <cstddef>

// template <typename T>
// class Stack {
// public:
//     Stack() : data_(std::make_unique<T[]>(capacity_)) {}

//     void push(const T& value) {
//         if (size_ < capacity_) data_[size_++] = value;
//     }
//     T pop() { return data_[--size_]; }
//     bool empty() const { return size_ == 0; }

// private:
//     std::size_t capacity_ = 8;
//     std::size_t size_ = 0;
//     std::unique_ptr<T[]> data_;
// };

// int main() {
//     Stack<int> s;
//     s.push(1);
//     s.push(2);
//     std::cout << s.pop() << "\n";  // prints 2
// }

// stack.cpp
// Build: g++ -std=c++17 -Wall -Wextra -Werror -o stack stack.cpp
#include <cstddef>
#include <iostream>
#include <memory>
#include <stdexcept>
#include <utility>

template <typename T>
class Stack {
public:
    Stack() = default;

    // Copying is not allowed: the stack exclusively owns its buffer.
    Stack(const Stack&) = delete;
    Stack& operator=(const Stack&) = delete;

    // Move constructor: steal the buffer, leave the source empty and valid.
    Stack(Stack&& other) noexcept
        : data_(std::move(other.data_)),
          size_(other.size_),
          capacity_(other.capacity_) {
        other.size_ = 0;
        other.capacity_ = 0;
    }

    // Move assignment: release our buffer, take the other's.
    Stack& operator=(Stack&& other) noexcept {
        if (this != &other) {
            data_ = std::move(other.data_);
            size_ = other.size_;
            capacity_ = other.capacity_;
            other.size_ = 0;
            other.capacity_ = 0;
        }
        return *this;
    }

    void push(T value) {
        if (size_ == capacity_) grow();
        data_[size_++] = std::move(value);
    }

    T pop() {
        if (size_ == 0) throw std::underflow_error("pop from empty Stack");
        return std::move(data_[--size_]);
    }

    const T& top() const {
        if (size_ == 0) throw std::underflow_error("top of empty Stack");
        return data_[size_ - 1];
    }

    bool empty() const { return size_ == 0; }
    std::size_t size() const { return size_; }

private:
    void grow() {
        std::size_t new_capacity = (capacity_ == 0) ? 4 : capacity_ * 2;
        auto new_data = std::make_unique<T[]>(new_capacity);
        for (std::size_t i = 0; i < size_; ++i) {
            new_data[i] = std::move(data_[i]);  // move elements, don't copy
        }
        data_ = std::move(new_data);
        capacity_ = new_capacity;
    }

    std::unique_ptr<T[]> data_;
    std::size_t size_ = 0;
    std::size_t capacity_ = 0;
};

// ---------- Test helpers ----------

// Element type that counts how often it is copied and moved.
struct Tracker {
    static int copies;
    static int moves;
    int id = 0;

    Tracker() = default;
    explicit Tracker(int i) : id(i) {}
    Tracker(const Tracker& o) : id(o.id) { ++copies; }
    Tracker(Tracker&& o) noexcept : id(o.id) { ++moves; }
    Tracker& operator=(const Tracker& o) {
        id = o.id;
        ++copies;
        return *this;
    }
    Tracker& operator=(Tracker&& o) noexcept {
        id = o.id;
        ++moves;
        return *this;
    }
};
int Tracker::copies = 0;
int Tracker::moves = 0;

Stack<int> makeStack() {
    Stack<int> s;
    s.push(10);
    s.push(20);
    s.push(30);
    return s;  // returned by move (or elided), never copied
}

int failures = 0;
#define CHECK(cond)                                                    \
    do {                                                               \
        if (!(cond)) {                                                 \
            std::cout << "FAIL line " << __LINE__ << ": " #cond "\n";  \
            ++failures;                                                \
        }                                                              \
    } while (0)

int main() {
    // Test 1: the required line. No copy is possible, since the copy
    // constructor is deleted: this line would not compile otherwise.
    Stack<int> s = makeStack();
    CHECK(s.size() == 3);
    CHECK(s.top() == 30);

    // Test 2: force the move constructor to run and check the source.
    Stack<int> moved = std::move(s);
    CHECK(moved.size() == 3);
    CHECK(s.empty());  // NOLINT: moved-from state is valid but empty here
    CHECK(moved.pop() == 30);
    CHECK(moved.pop() == 20);
    CHECK(moved.pop() == 10);
    CHECK(moved.empty());

    // Test 3: move assignment.
    Stack<int> a = makeStack();
    Stack<int> b;
    b = std::move(a);
    CHECK(b.size() == 3);
    CHECK(a.empty());

    // Test 4: moving the stack moves the buffer, not the elements.
    // Growth relocates elements by move, and still never copies them.
    {
        Tracker::copies = 0;
        Tracker::moves = 0;
        Stack<Tracker> t;
        for (int i = 0; i < 10; ++i) t.push(Tracker(i));  // forces grow()

        int moves_before = Tracker::moves;
        Stack<Tracker> t2 = std::move(t);  // buffer stolen
        CHECK(Tracker::moves == moves_before);  // 0 element moves here
        CHECK(Tracker::copies == 0);
        CHECK(t2.size() == 10);
    }

    // Test 5: empty-stack errors are reported, not undefined behavior.
    {
        Stack<int> e;
        bool threw = false;
        try {
            e.pop();
        } catch (const std::underflow_error&) {
            threw = true;
        }
        CHECK(threw);
    }

    if (failures == 0) std::cout << "All tests passed\n";
    return failures == 0 ? 0 : 1;
}