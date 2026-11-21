import json

cpp_questions = [
    {
        "num": 1,
        "section": "Fundamentals & Class Design",
        "difficulty": "Moderate",
        "question": "Which statement best describes a class in C++ and how does it differ from a struct?",
        "code": "",
        "options": {
            "A": "Structs cannot have member functions; classes can",
            "B": "Classes support inheritance; structs do not",
            "C": "They are completely different — classes use heap memory, structs use stack memory",
            "D": "Same feature set; default access differs"
        },
        "answer": "D",
        "highYield": True,
        "concept": "Class vs Struct Access Specifiers",
        "explanation": "In C++, `class` and `struct` are virtually identical in runtime capabilities. Both can have member functions, constructors, destructors, inheritance, and access specifiers. The only language-level difference is the default access specifier: members and base inheritance default to `private` in a `class`, whereas they default to `public` in a `struct`. By modern C++ convention, `struct` is typically used for Plain Old Data (POD) / passive data with little behavior, while `class` is used for encapsulated state with active behavior."
    },
    {
        "num": 2,
        "section": "Fundamentals & Class Design",
        "difficulty": "Moderate",
        "question": "Which statement best characterizes access specifiers in C++ and what are they?",
        "code": "",
        "options": {
            "A": "Keywords controlling whether a function is inlined by the compiler",
            "B": "Specifiers for network access permissions in distributed programs",
            "C": "Keywords specifying which CPU register a variable is stored in",
            "D": "public, protected, and private member visibility"
        },
        "answer": "D",
        "highYield": False,
        "concept": "Encapsulation & Access Specifiers",
        "explanation": "Access specifiers enforce encapsulation in C++:\n• `public`: Members are accessible from any code outside the class.\n• `protected`: Members are accessible within the class itself and by derived classes, but hidden from the general outside public.\n• `private`: Members are strictly hidden from outside access — only the class's own member functions and friends can access them.\nA class can have multiple sections of each specifier in any order."
    },
    {
        "num": 3,
        "section": "Constructors & Lifecycle",
        "difficulty": "Moderate",
        "question": "Which statement best describes a constructor in C++ and what are its key properties?",
        "code": "",
        "options": {
            "A": "Special no-return initializer called on object creation",
            "B": "A static function that creates objects using the new keyword",
            "C": "A function that allocates heap memory for objects",
            "D": "A function called when an object is destroyed"
        },
        "answer": "A",
        "highYield": True,
        "concept": "Constructor Mechanics",
        "explanation": "A constructor is a special member function that initializes a newly created object. Key properties:\n1. It shares the exact same name as the class.\n2. It has NO return type (not even `void`).\n3. It is called automatically when an object is instantiated (on the stack, heap, or as a global/static).\n4. Constructors can be overloaded to provide different ways of initializing an object.\n5. If no constructor is declared in the class, the compiler synthesizes a default no-argument constructor."
    },
    {
        "num": 4,
        "section": "Fundamentals & Class Design",
        "difficulty": "Moderate",
        "question": "Which statement best describes an object in C++ and how is it different from a class?",
        "code": "",
        "options": {
            "A": "A class has behavior; an object has only data",
            "B": "Class is type; object is runtime instance",
            "C": "Objects and classes are the same — just different C++ keywords",
            "D": "Objects are stored on the stack; classes are stored in code memory"
        },
        "answer": "B",
        "highYield": False,
        "concept": "Type vs Instance Relationship",
        "explanation": "A `class` is a blueprint, user-defined type, or schema. Declaring a class definition allocates no memory for object state. An `object` is an actual concrete runtime instance of that class type that occupies memory in the stack, heap, or static data segment. Each non-static member variable is duplicated per object instance, while member function code is shared in the code segment."
    },
    {
        "num": 5,
        "section": "OOP Mechanics & Pointers",
        "difficulty": "Moderate",
        "question": "Which statement best describes the this pointer in C++?",
        "code": "",
        "options": {
            "A": "Implicit pointer to the current object",
            "B": "A pointer to the class's virtual function table",
            "C": "A pointer pointing to the next object in memory",
            "D": "A constant pointer to the parent class object"
        },
        "answer": "A",
        "highYield": True,
        "concept": "The this Pointer",
        "explanation": "Inside any non-static member function, `this` is an implicit pointer holding the memory address of the calling object (`ClassName* const`). Key uses:\n1. Disambiguating shadowed member variables: `this->x = x;`\n2. Method chaining: returning `*this` by reference (`ClassName&`).\n3. Passing the current object to external functions: `notify(this);`.\nNote: `this` is NOT available in static member functions because static functions execute without an instance context."
    },
    {
        "num": 6,
        "section": "Constructors & Lifecycle",
        "difficulty": "Moderate",
        "question": "Which statement best describes a destructor in C++ and when is it called?",
        "code": "",
        "options": {
            "A": "A function storing the object's state before deletion",
            "B": "~Class() cleanup function called on destruction",
            "C": "A function called before object creation to validate parameters",
            "D": "A function that clears all member variables to zero"
        },
        "answer": "B",
        "highYield": True,
        "concept": "Destructors & RAII",
        "explanation": "A destructor is a special member function named `~ClassName()` used to release resources (closing file descriptors, freeing heap memory, releasing locks) following the RAII (Resource Acquisition Is Initialization) idiom. Key rules:\n1. It takes no arguments and has no return value.\n2. A class can have only ONE destructor (destructors CANNOT be overloaded).\n3. It is called automatically when: (a) a stack object goes out of scope, (b) `delete` is called on a heap pointer, or (c) the program terminates for global/static objects.\n4. Base class destructors MUST be declared `virtual` if objects are deleted via base pointers!"
    },
    {
        "num": 7,
        "section": "Pointers & References",
        "difficulty": "Moderate",
        "question": "Which statement best describes the difference between int& ref = x and int* ptr = &x in C++?",
        "code": "",
        "options": {
            "A": "References are always const; pointers can be modified",
            "B": "Reference is alias; pointer stores address",
            "C": "Pointers use stack memory; references use heap memory",
            "D": "References and pointers are identical — just different syntax"
        },
        "answer": "B",
        "highYield": True,
        "concept": "References vs Pointers",
        "explanation": "In C++:\n• A reference (`int& ref = x;`) is an alias for an existing variable. It must be initialized upon declaration, cannot be NULL, and cannot be reseated to refer to another object. Accessing `ref` directly accesses `x` without explicit dereferencing.\n• A pointer (`int* ptr = &x;`) is an independent variable that stores the memory address of another variable. It can be uninitialized, can be `nullptr`, can be reassigned to point to different addresses, and requires explicit dereferencing with `*ptr` to access the target value."
    },
    {
        "num": 8,
        "section": "Polymorphism & Functions",
        "difficulty": "Moderate",
        "question": "Which statement best describes function overloading in C++?",
        "code": "",
        "options": {
            "A": "Calling a function before it is defined (forward declaration)",
            "B": "Same name with different parameter lists",
            "C": "A function calling itself recursively",
            "D": "Redefining a function in a derived class"
        },
        "answer": "B",
        "highYield": False,
        "concept": "Compile-Time Polymorphism / Overloading",
        "explanation": "Function overloading allows multiple functions in the same scope to share the same identifier (name) as long as their parameter lists (arity, types, or order of types) differ. This is an example of compile-time (static) polymorphism. Note: Overloading CANNOT be based solely on different return types — the signature must differ in parameter types or count."
    },
    {
        "num": 9,
        "section": "Fundamentals & Class Design",
        "difficulty": "Moderate",
        "question": "Which statement best characterizes the four pillars of OOP in C++?",
        "code": "",
        "options": {
            "A": "Classes, Objects, Functions, Pointers",
            "B": "Public, Private, Protected, Friend",
            "C": "Polymorphism, Templates, Streams, Exceptions definition",
            "D": "Encapsulation, abstraction, inheritance, polymorphism"
        },
        "answer": "D",
        "highYield": False,
        "concept": "Core OOP Principles",
        "explanation": "The foundational four pillars of Object-Oriented Programming are:\n1. **Encapsulation**: Bundling data and methods operating on that data into a single unit (class) and restricting direct access (private/protected).\n2. **Abstraction**: Hiding internal implementation complexity and exposing only essential interfaces.\n3. **Inheritance**: Deriving new classes from existing classes to reuse code and establish hierarchical 'is-a' relationships.\n4. **Polymorphism**: The ability of a message or function call to be processed in different ways based on the runtime or compile-time type of the receiver."
    },
    {
        "num": 10,
        "section": "Syntax & Scoping",
        "difficulty": "Moderate",
        "question": "Which statement best describes the scope resolution operator :: in C++?",
        "code": "",
        "options": {
            "A": "Separates multiple inheritance class names",
            "B": "A pointer-to-member operator",
            "C": "Used for type casting between pointer types definition",
            "D": "Resolves scope like class, global, or namespace access"
        },
        "answer": "D",
        "highYield": True,
        "concept": "Scope Resolution Operator (::)",
        "explanation": "The scope resolution operator `::` explicitly qualifies which scope an identifier belongs to:\n1. **Namespace qualification**: `std::cout`, `boost::filesystem`.\n2. **Class member definition outside the class body**: `void MyClass::display() { ... }`.\n3. **Static member access**: `MyClass::staticCount`.\n4. **Global scope access**: `::x` accesses a global variable `x` shadowed by a local variable `x`.\n5. **Bypassing virtual dispatch**: `Base::virtualFunc()` explicitly calls the base version."
    },
    {
        "num": 11,
        "section": "Functions & Parameters",
        "difficulty": "Moderate",
        "question": "Which statement best describes a default argument in C++ functions?",
        "code": "",
        "options": {
            "A": "A keyword defaulting a constructor to its compiler-generated version",
            "B": "Optional trailing parameter value in declaration",
            "C": "A return value used when the function cannot compute a result",
            "D": "The zero-initializer applied to uninitialized variables"
        },
        "answer": "B",
        "highYield": False,
        "concept": "Default Function Arguments",
        "explanation": "Default arguments allow function parameters to take predefined values if omitted by the caller at the call site. Critical rules:\n1. All default arguments must be trailing (from right to left). Once a parameter has a default value, all subsequent parameters to its right must also have defaults: `void f(int a, int b = 10, int c = 20);`.\n2. Default arguments are typically specified in the function declaration (header), not repeated in the definition."
    },
    {
        "num": 12,
        "section": "Functions & Performance",
        "difficulty": "Moderate",
        "question": "Which statement best describes an inline function in C++?",
        "code": "",
        "options": {
            "A": "A function that runs faster by being stored in the CPU's instruction cache",
            "B": "A function defined within the class body (which is implicitly inline)",
            "C": "A function defined inside another function",
            "D": "Hint to expand small function at call site"
        },
        "answer": "B",
        "highYield": True,
        "concept": "Inline Functions & One Definition Rule",
        "explanation": "An inline function requests the compiler to replace function calls with the actual function body code to eliminate call overhead (stack frame setup, return jumps). In C++, member functions defined *inside* the class declaration body are **implicitly inline**. Furthermore, the `inline` keyword allows defining functions in headers without violating the One Definition Rule (ODR) across multiple translation units."
    },
    {
        "num": 13,
        "section": "Class Design & Friends",
        "difficulty": "Moderate",
        "question": "Which statement best describes a friend function in C++?",
        "code": "",
        "options": {
            "A": "A member function of a derived class accessing base class private members",
            "B": "A static member function with elevated access privileges",
            "C": "Non-member allowed to access class internals",
            "D": "A function that calls another function frequently"
        },
        "answer": "C",
        "highYield": True,
        "concept": "Friend Functions & Classes",
        "explanation": "A `friend` function is a non-member function granted explicit access to the `private` and `protected` members of a class using the `friend` declaration inside the class body. Key properties to remember:\n1. Friendship is NOT mutual (if A is a friend of B, B is not automatically a friend of A).\n2. Friendship is NOT inherited (friends of a base class are not friends of derived classes).\n3. Friendship is NOT transitive (a friend of a friend is not a friend).\n4. Essential for overloading binary operators where the left operand is not an object of the class (e.g. `operator<<(ostream&, const MyClass&)`)."
    },
    {
        "num": 14,
        "section": "Static Members & Memory",
        "difficulty": "Moderate",
        "question": "Which statement best describes static member variable in C++?",
        "code": "",
        "options": {
            "A": "A member variable that cannot be modified after initialization",
            "B": "A variable allocated on the stack that persists between function calls",
            "C": "A member variable that is faster to access than regular members",
            "D": "One shared class-level variable for all objects"
        },
        "answer": "D",
        "highYield": True,
        "concept": "Static Data Members",
        "explanation": "A `static` member variable belongs to the class itself rather than to individual instances. Key facts:\n1. Exactly ONE copy exists in the program's static/global data segment, shared among all instances.\n2. It exists even before any objects of the class are instantiated.\n3. It must be defined (and optionally initialized) outside the class in global scope (unless declared `inline static` in C++17).\n4. Accessed via class name: `ClassName::staticVar` or via an instance `obj.staticVar`."
    },
    {
        "num": 15,
        "section": "Const Correctness",
        "difficulty": "Moderate",
        "question": "Which statement best describes a const member function in C++?",
        "code": "",
        "options": {
            "A": "A function whose parameters are all const references",
            "B": "A function that returns a const value",
            "C": "Member function promising not to modify object state",
            "D": "A static member function that cannot be overridden"
        },
        "answer": "C",
        "highYield": True,
        "concept": "Const Member Functions & this pointer",
        "explanation": "A `const` member function (appended with `const` after parameter parentheses: `int getVal() const`) guarantees that it will not modify any non-static data members of the calling object. Inside this function, the `this` pointer type is `const ClassName* const`. Rules:\n1. `const` objects can ONLY call `const` member functions.\n2. Data members marked with the `mutable` specifier can still be modified inside a `const` member function (useful for caching or mutex locking)."
    },
    {
        "num": 16,
        "section": "Functions & Parameters",
        "difficulty": "Moderate",
        "question": "Which statement best describes the difference between pass by value, pass by reference, and pass by pointer in C++?",
        "code": "",
        "options": {
            "A": "References are always faster than pointers; pointers are always faster than values",
            "B": "Pass by pointer creates a copy of the pointer; pass by reference creates a copy of the reference",
            "C": "Copy, alias, or address-based parameter passing",
            "D": "They are identical — the compiler chooses the mechanism"
        },
        "answer": "C",
        "highYield": False,
        "concept": "Parameter Passing Semantics",
        "explanation": "The three parameter passing models in C++:\n• **Pass by Value** (`void f(int v)`): Creates an independent copy of the argument; modifications do not affect caller.\n• **Pass by Reference** (`void f(int& r)`): Binds an alias directly to the original argument; changes affect the original, with zero copy overhead.\n• **Pass by Pointer** (`void f(int* p)`): Copies the memory address of the argument; caller's variable can be modified by dereferencing `*p`. Supports passing `nullptr`."
    },
    {
        "num": 17,
        "section": "Operator Overloading",
        "difficulty": "Moderate",
        "question": "Which statement best describes operator overloading in C++ and what operators cannot be overloaded?",
        "code": "",
        "options": {
            "A": "Custom operator behavior; some operators stay non-overloadable",
            "B": "Redefining the meaning of user-defined words in the program concept",
            "C": "Only arithmetic operators (+, -, *, /) can be overloaded",
            "D": "All operators can be overloaded in C++"
        },
        "answer": "A",
        "highYield": True,
        "concept": "Operator Overloading Constraints",
        "explanation": "Operator overloading allows programmers to provide intuitive, customized behavior for existing C++ operators when applied to user-defined types. You CANNOT create new operators (e.g. `**`), and cannot alter precedence or arity.\n**Crucial CDAC Exam Rule:** The following operators CANNOT be overloaded:\n1. Scope resolution operator: `::`\n2. Member selection (dot): `.`\n3. Member pointer selector: `.*`\n4. Ternary conditional operator: `?:`\n5. `sizeof`\n6. `typeid`"
    },
    {
        "num": 18,
        "section": "Syntax & Scoping",
        "difficulty": "Moderate",
        "question": "Which statement best describes a namespace in C++ and why is it used?",
        "code": "",
        "options": {
            "A": "A CPU memory region reserved for the program's code",
            "B": "A file organization mechanism similar to Java packages",
            "C": "Named scope that prevents identifier collisions",
            "D": "A special type of class that holds only static members"
        },
        "answer": "C",
        "highYield": False,
        "concept": "Namespaces & Collision Avoidance",
        "explanation": "A namespace is a declarative region providing a named scope to identifiers (functions, classes, variables) to prevent name collisions when combining multiple libraries. For example, standard library tools reside in `namespace std`. Best practice: Never put `using namespace std;` in header files to avoid namespace pollution for consumers."
    },
    {
        "num": 19,
        "section": "Pointers & References",
        "difficulty": "Moderate",
        "question": "Which statement best describes a reference parameter vs const reference in C++?",
        "code": "",
        "options": {
            "A": "They are identical — const is optional decoration",
            "B": "Const references are slower because they require validity checks concept definition",
            "C": "Const references can bind to r-values (temporaries); non-const references cannot",
            "D": "Mutable reference vs read-only reference"
        },
        "answer": "C",
        "highYield": True,
        "concept": "Const Reference & Temporary Binding",
        "explanation": "A non-const lvalue reference (`int& ref = 42;`) fails to compile because an lvalue reference cannot bind to a temporary/r-value. In contrast, a **const lvalue reference** (`const int& ref = 42;`) is legally allowed to bind to temporary r-values, extending the lifetime of the temporary to match the lifetime of the reference! This is why functions taking heavy objects by const reference (`void print(const std::string& s)`) can accept both named variables and string literals like `print(\"hello\");`."
    },
    {
        "num": 20,
        "section": "Memory Management",
        "difficulty": "Moderate",
        "question": "Which statement best describes the difference between new / delete and stack allocation in C++?",
        "code": "",
        "options": {
            "A": "Stack objects cannot be objects of classes; heap objects can",
            "B": "new and delete are deprecated in modern C++ — use malloc/free",
            "C": "new is only for arrays; delete is for single objects",
            "D": "Automatic stack lifetime vs manual heap lifetime"
        },
        "answer": "D",
        "highYield": True,
        "concept": "Stack vs Heap Lifetime",
        "explanation": "• **Stack Allocation**: Extremely fast (stack pointer adjustment), deterministic automatic lifetime — destructors execute automatically when scope exits. Stack size is fixed and limited (~1-8MB).\n• **Heap Allocation (`new` / `delete`)**: Dynamic size determined at runtime, survives function returns, but requires manual deallocation via `delete` / `delete[]`. Failure to delete causes memory leaks; deleting twice causes double-free undefined behavior. In modern C++, prefer smart pointers (`std::unique_ptr`, `std::shared_ptr`)."
    },
    {
        "num": 21,
        "section": "Code Tracing & Lifecycle",
        "difficulty": "Hard",
        "question": "What does this code print?",
        "code": "#include <iostream>\nclass Box {\n    int w, h;\npublic:\n    Box(int w, int h) : w(w), h(h) {}\n    int area() const { return w * h; }\n};\nint main() {\n    Box b1(3, 4);\n    Box b2 = b1;\n    b2 = Box(5, 6);\n    std::cout << b1.area() << \" \" << b2.area() << std::endl;\n}",
        "options": {
            "A": "12 12",
            "B": "12 30",
            "C": "Compile error",
            "D": "30 30"
        },
        "answer": "B",
        "highYield": True,
        "concept": "Copy Construction vs Copy Assignment",
        "explanation": "Tracing the execution:\n1. `Box b1(3, 4);` creates `b1` with `w=3, h=4`. Area = 12.\n2. `Box b2 = b1;` calls the compiler-generated default copy constructor. `b2` is an independent object with copies of `w=3, h=4`.\n3. `b2 = Box(5, 6);` creates a temporary Box with `w=5, h=6` (area=30) and copy-assigns it into `b2`. `b1` remains completely untouched!\n4. `b1.area()` is 12, and `b2.area()` is 30. Result: `12 30`."
    },
    {
        "num": 22,
        "section": "Static Members & Memory",
        "difficulty": "Hard",
        "question": "What does this code print?",
        "code": "#include <iostream>\nclass Counter {\n    static int count;\npublic:\n    Counter() { ++count; }\n    ~Counter() { --count; }\n    static int getCount() { return count; }\n};\nint Counter::count = 0;\nint main() {\n    Counter a, b;\n    {\n        Counter c;\n        std::cout << Counter::getCount() << \" \";\n    }\n    std::cout << Counter::getCount() << std::endl;\n}",
        "options": {
            "A": "3 2",
            "B": "2 2",
            "C": "3 3",
            "D": "2 3"
        },
        "answer": "A",
        "highYield": True,
        "concept": "Static Counter & Nested Block Scope",
        "explanation": "Step-by-step trace:\n1. `Counter a, b;` instantiates two objects in `main()`. Constructor executes twice -> `count` becomes 2.\n2. An inner block `{ ... }` begins. `Counter c;` is instantiated on the stack -> Constructor executes -> `count` becomes 3.\n3. `std::cout << Counter::getCount() << \" \";` outputs `3 `.\n4. Closing brace `}` of the inner block is hit. The local object `c` goes out of scope -> `~Counter()` destructor runs -> `count` decrements to 2.\n5. Outside the block, `std::cout << Counter::getCount();` prints `2`. Final output: `3 2`."
    },
    {
        "num": 23,
        "section": "Pointers & References",
        "difficulty": "Hard",
        "question": "What does this code print?",
        "code": "#include <iostream>\nvoid swap(int& a, int& b) {\n    int temp = a;\n    a = b;\n    b = temp;\n}\nint main() {\n    int x = 10, y = 20;\n    swap(x, y);\n    std::cout << x << \" \" << y << std::endl;\n}",
        "options": {
            "A": "10 20",
            "B": "10 10",
            "C": "20 10",
            "D": "20 20"
        },
        "answer": "C",
        "highYield": False,
        "concept": "Pass-by-Reference Swapping",
        "explanation": "Because `swap(int& a, int& b)` takes parameters by reference, `a` is an alias for `x` and `b` is an alias for `y`. Inside `swap`, swapping `a` and `b` directly modifies the memory locations of `x` and `y`. Therefore, `x` becomes 20 and `y` becomes 10. Output is `20 10`."
    },
    {
        "num": 24,
        "section": "Constructors & Lifecycle",
        "difficulty": "Hard",
        "question": "What does this code print?",
        "code": "#include <iostream>\nclass Rectangle {\n    double w, h;\npublic:\n    Rectangle(double w = 1.0, double h = 1.0) : w(w), h(h) {}\n    double area() { return w * h; }\n};\nint main() {\n    Rectangle r1;\n    Rectangle r2(5.0);\n    Rectangle r3(3.0, 4.0);\n    std::cout << r1.area() << \" \" << r2.area() << \" \" << r3.area() << std::endl;\n}",
        "options": {
            "A": "1 5 12",
            "B": "0 0 12",
            "C": "Compile error — default and non-default constructors conflict",
            "D": "1 1 12"
        },
        "answer": "A",
        "highYield": True,
        "concept": "Constructors with Default Arguments",
        "explanation": "A constructor where ALL parameters have default values serves simultaneously as a default (0-argument) constructor, a 1-argument constructor, and a 2-argument constructor:\n1. `r1;` uses defaults `w=1.0, h=1.0` -> `area = 1.0 * 1.0 = 1`.\n2. `r2(5.0);` supplies `w=5.0`, uses default `h=1.0` -> `area = 5.0 * 1.0 = 5`.\n3. `r3(3.0, 4.0);` supplies both -> `area = 3.0 * 4.0 = 12`.\nOutput: `1 5 12`."
    },
    {
        "num": 25,
        "section": "Constructors & Lifecycle",
        "difficulty": "Hard",
        "question": "What does this code print?",
        "code": "#include <iostream>\nclass MyClass {\n    int val;\npublic:\n    MyClass(int v) : val(v) { std::cout << \"C\" << v << \" \"; }\n    ~MyClass() { std::cout << \"D\" << val << \" \"; }\n};\nint main() {\n    MyClass a(1);\n    MyClass b(2);\n    MyClass c(3);\n    std::cout << \"end \";\n}",
        "options": {
            "A": "C1 C2 C3 end D3 D2 D1",
            "B": "C1 C2 C3 D1 D2 D3 end",
            "C": "C1 C2 C3 end D1 D2 D3",
            "D": "D3 D2 D1 C1 C2 C3 end"
        },
        "answer": "A",
        "highYield": True,
        "concept": "LIFO Construction and Destruction Order",
        "explanation": "Golden Rule of C++ Object Lifecycle on the Stack:\n1. Objects are constructed in the exact order of declaration: `a(1)` prints `C1 `, then `b(2)` prints `C2 `, then `c(3)` prints `C3 `.\n2. The statement `std::cout << \"end \";` prints `end `.\n3. At function exit, objects on the stack are destroyed in **exact reverse order of construction (LIFO - Last In, First Out)**! Hence `c` is destroyed first (`D3 `), then `b` (`D2 `), then `a` (`D1 `).\nFinal output: `C1 C2 C3 end D3 D2 D1`."
    },
    {
        "num": 26,
        "section": "Pointers & References",
        "difficulty": "Hard",
        "question": "What does this code print?",
        "code": "#include <iostream>\nint global = 10;\nvoid modify(int* p) { *p = 20; }\nvoid noModify(int* p) { p = nullptr; }\nint main() {\n    int x = 5;\n    modify(&x);\n    std::cout << x << \" \";\n    noModify(&x);\n    std::cout << x << \" \" << global << std::endl;\n}",
        "options": {
            "A": "5 20 10",
            "B": "20 20 10",
            "C": "20 20 10",
            "D": "20 20 0"
        },
        "answer": "C",
        "highYield": True,
        "concept": "Pointer Dereference vs Pointer Reassignment",
        "explanation": "• `modify(&x)` receives the address of `x`. Dereferencing `*p = 20;` alters the memory location of `x`. So `x` becomes 20. Prints `20 `.\n• `noModify(&x)` receives a copy of the pointer address in local parameter `p`. Setting `p = nullptr;` only modifies the local parameter copy `p`, leaving original `x` and caller's pointers completely unchanged!\n• Output continues: `20` and `global` (which is 10). Output: `20 20 10`."
    },
    {
        "num": 27,
        "section": "Operator Overloading",
        "difficulty": "Hard",
        "question": "What does this code print?",
        "code": "#include <iostream>\nclass Point {\npublic:\n    int x, y;\n    Point(int x, int y) : x(x), y(y) {}\n    Point operator+(const Point& other) const {\n        return Point(x + other.x, y + other.y);\n    }\n};\nint main() {\n    Point p1(1, 2), p2(3, 4);\n    Point p3 = p1 + p2;\n    std::cout << p3.x << \" \" << p3.y << std::endl;\n}",
        "options": {
            "A": "4 6",
            "B": "1 2",
            "C": "3 4",
            "D": "Compile error"
        },
        "answer": "A",
        "highYield": False,
        "concept": "Binary Operator Overloading (+)",
        "explanation": "The expression `p1 + p2` translates to the member function invocation `p1.operator+(p2)`. In `operator+`, `x + other.x = 1 + 3 = 4` and `y + other.y = 2 + 4 = 6`. A new `Point(4, 6)` is returned and assigned to `p3`. Prints `4 6`."
    },
    {
        "num": 28,
        "section": "Syntax & Scoping",
        "difficulty": "Hard",
        "question": "What does this code print?",
        "code": "#include <iostream>\nnamespace A {\n    int x = 10;\n    namespace B {\n        int x = 20;\n        void show() { std::cout << x << \" \" << A::x << std::endl; }\n    }\n}\nint main() {\n    A::B::show();\n    std::cout << A::x << std::endl;\n}",
        "options": {
            "A": "10 20, 10",
            "B": "10 10, 20",
            "C": "20 20, 10",
            "D": "20 10, 10"
        },
        "answer": "D",
        "highYield": False,
        "concept": "Nested Namespaces & Scope Resolution",
        "explanation": "Inside `A::B::show()`:\n1. Plain `x` refers to `B`'s innermost enclosed `x = 20`.\n2. `A::x` explicitly qualifies and accesses outer namespace `A`'s `x = 10`.\n3. Hence `show()` prints `20 10`.\n4. In `main()`, `A::x` accesses `10`. Total output: `20 10` followed by `10`."
    },
    {
        "num": 29,
        "section": "Polymorphism & Virtual Functions",
        "difficulty": "Hard",
        "question": "What does this code print?",
        "code": "#include <iostream>\nclass Animal {\npublic:\n    void speak() { std::cout << \"Animal \"; }\n};\nclass Dog : public Animal {\npublic:\n    void speak() { std::cout << \"Dog \"; }\n};\nint main() {\n    Animal* a = new Dog();\n    a->speak();\n    Dog* d = (Dog*)a;\n    d->speak();\n    delete a;\n}",
        "options": {
            "A": "Animal Dog",
            "B": "Dog Animal",
            "C": "Dog Dog",
            "D": "Animal Animal"
        },
        "answer": "A",
        "highYield": True,
        "concept": "Non-Virtual Early / Static Binding",
        "explanation": "Because `speak()` is NOT declared `virtual` in `Animal`, late binding / dynamic dispatch is disabled. The compiler binds method calls statically based purely on the **pointer's declared compile-time type**:\n• `a` is of type `Animal*` -> `a->speak()` calls `Animal::speak()`, printing `Animal `.\n• `d` is cast to `Dog*` -> `d->speak()` calls `Dog::speak()`, printing `Dog `.\nIf `virtual` had been present on `Animal::speak()`, both calls would have dispatched dynamically to `Dog::speak()`."
    },
    {
        "num": 30,
        "section": "Recursion & Algorithms",
        "difficulty": "Hard",
        "question": "What does this code print?",
        "code": "#include <iostream>\nvoid process(int n, int result = 1) {\n    if (n <= 1) { std::cout << result; return; }\n    process(n - 1, n * result);\n}\nint main() {\n    process(5);\n}",
        "options": {
            "A": "5",
            "B": "120",
            "C": "1",
            "D": "Compile error — recursion with default args not allowed"
        },
        "answer": "B",
        "highYield": False,
        "concept": "Tail-Recursive Factorial with Accumulator",
        "explanation": "This is tail-recursive factorial computation using an accumulator parameter (`result`):\n• `process(5, 1)` calls `process(4, 5 * 1 = 5)`\n• calls `process(3, 4 * 5 = 20)`\n• calls `process(2, 3 * 20 = 60)`\n• calls `process(1, 2 * 60 = 120)`\n• Base condition `n <= 1` is reached; prints `result`, which is 120."
    },
    {
        "num": 31,
        "section": "Constructors & Lifecycle",
        "difficulty": "Advanced",
        "question": "What does this code print?",
        "code": "#include <iostream>\nclass Resource {\n    int id;\npublic:\n    Resource(int i) : id(i) { std::cout << \"R\" << id << \" \"; }\n    Resource(const Resource& r) : id(r.id) { std::cout << \"CR\" << id << \" \"; }\n    ~Resource() { std::cout << \"~R\" << id << \" \"; }\n};\nResource makeResource() { return Resource(2); }\nint main() {\n    Resource r1(1);\n    Resource r2 = makeResource();\n}",
        "options": {
            "A": "R1 R2 ~R2 ~R1",
            "B": "R1 CR1 R2 CR2 ~R2 ~R1 concept definition behavior",
            "C": "R1 R2 CR2 ~R2 ~R2 ~R1",
            "D": "Output depends on RVO (Return Value Optimization)"
        },
        "answer": "D",
        "highYield": True,
        "concept": "Return Value Optimization (RVO) & Copy Elision",
        "explanation": "In C++, when a function returns a temporary object by value, the compiler is allowed (and in C++17 mandated under Guaranteed Copy Elision) to construct the object directly into the storage of the caller's target variable (`r2`), bypassing the copy/move constructor altogether!\n• With RVO: Output is `R1 R2 ~R2 ~R1` (or `~R1 ~R2` on unwinding).\n• Without RVO (`-fno-elide-constructors`): A temporary is constructed, then copy-constructed into `r2`, printing `CR2` and destroying the intermediate temporary.\nHence, the exact diagnostic output depends on Return Value Optimization."
    },
    {
        "num": 32,
        "section": "Memory & Deep Copy",
        "difficulty": "Advanced",
        "question": "What does this code print?",
        "code": "#include <iostream>\n#include <cstring>\nclass MyStr {\n    char* data;\npublic:\n    MyStr(const char* s) {\n        data = new char[strlen(s) + 1];\n        strcpy(data, s);\n        std::cout << \"C \";\n    }\n    MyStr(const MyStr& other) {\n        data = new char[strlen(other.data) + 1];\n        strcpy(data, other.data);\n        std::cout << \"CC \";\n    }\n    ~MyStr() { delete[] data; std::cout << \"D \"; }\n    const char* get() const { return data; }\n};\nint main() {\n    MyStr s1(\"hello\");\n    MyStr s2(s1);\n    std::cout << s2.get() << \" \";\n}",
        "options": {
            "A": "C CC hello D D",
            "B": "C CC D hello",
            "C": "C CC hello D",
            "D": "C D CC hello D"
        },
        "answer": "A",
        "highYield": True,
        "concept": "Deep Copy Construction & Destruction",
        "explanation": "Execution walkthrough:\n1. `MyStr s1(\"hello\");` invokes the parameterized constructor -> allocates heap memory -> prints `C `.\n2. `MyStr s2(s1);` invokes the user-defined copy constructor -> allocates separate heap buffer for `s2` (deep copy) -> prints `CC `.\n3. `std::cout << s2.get() << \" \";` outputs `hello `.\n4. Reaching the end of `main()`, stack unwinds in LIFO order:\n   - `s2` is destroyed first -> `delete[] data` -> prints `D `.\n   - `s1` is destroyed second -> `delete[] data` -> prints `D `.\nTotal combined output: `C CC hello D D`."
    },
    {
        "num": 33,
        "section": "Memory & Rule of Three",
        "difficulty": "Advanced",
        "question": "What is the issue with this code and what will likely happen?",
        "code": "class BadClass {\n    int* data;\npublic:\n    BadClass(int n) { data = new int[n]; }\n    ~BadClass() { delete[] data; }\n    // No copy constructor or copy assignment operator\n};\nint main() {\n    BadClass a(10);\n    BadClass b = a; // shallow copy\n    // Both a and b destructor try to delete[] the same pointer\n}",
        "options": {
            "A": "Memory leak — only one delete[] is called",
            "B": "Works correctly — both objects share the data array safely",
            "C": "Compile error — copy is not allowed without explicit copy constructor",
            "D": "Double-free causes undefined behavior"
        },
        "answer": "D",
        "highYield": True,
        "concept": "Rule of Three & Double-Free Bug",
        "explanation": "When a class manages a raw resource (pointer) and fails to implement a custom copy constructor, the compiler provides a default memberwise copy constructor (shallow copy). Here, `b.data` receives the exact same memory address as `a.data`.\nWhen `main()` exits, `b`'s destructor deletes the heap array. Then `a`'s destructor runs and attempts to `delete[]` the *already freed memory*! This is a **double-free error**, resulting in undefined behavior / immediate runtime crash (SIGABRT). This is why the **Rule of Three** states: If you need a custom Destructor, you almost certainly need a custom Copy Constructor and Copy Assignment Operator."
    },
    {
        "num": 34,
        "section": "Pointers & Arrays",
        "difficulty": "Advanced",
        "question": "What is the output?",
        "code": "#include <iostream>\nint main() {\n    int arr[] = {10, 20, 30, 40, 50};\n    int* p = arr + 1;\n    std::cout << *p << \" \";\n    p += 2;\n    std::cout << *p << \" \";\n    std::cout << *(arr + 4) << \" \";\n    std::cout << arr[3] << std::endl;\n}",
        "options": {
            "A": "10 30 50 40",
            "B": "11 13 14 13",
            "C": "20 40 50 40",
            "D": "20 40 50 40"
        },
        "answer": "D",
        "highYield": True,
        "concept": "Pointer Arithmetic & Array Offsets",
        "explanation": "Array indexing and pointer arithmetic:\n1. `arr` points to index 0 (`10`).\n2. `p = arr + 1` points to index 1 (`arr[1] = 20`). `*p` prints `20`.\n3. `p += 2` advances the pointer by 2 integers to index 3 (`arr[3] = 40`). `*p` prints `40`.\n4. `*(arr + 4)` accesses index 4 (`arr[4] = 50`). Prints `50`.\n5. `arr[3]` accesses index 3 (`40`). Prints `40`.\nResult: `20 40 50 40`."
    },
    {
        "num": 35,
        "section": "Operator Overloading",
        "difficulty": "Advanced",
        "question": "What does this code print?",
        "code": "#include <iostream>\nclass Counter {\n    int n;\npublic:\n    Counter(int n = 0) : n(n) {}\n    Counter& operator++() { ++n; return *this; } // prefix\n    Counter operator++(int) { Counter t = *this; ++n; return t; } // postfix\n    int get() const { return n; }\n};\nint main() {\n    Counter c(5);\n    Counter a = ++c;\n    Counter b = c++;\n    std::cout << a.get() << \" \" << b.get() << \" \" << c.get() << std::endl;\n}",
        "options": {
            "A": "6 7 7",
            "B": "6 6 7",
            "C": "5 6 7",
            "D": "6 6 8"
        },
        "answer": "B",
        "highYield": True,
        "concept": "Prefix vs Postfix Increment Overloading",
        "explanation": "Crucial distinction between prefix and postfix increment:\n1. `c` starts at 5.\n2. `++c` (prefix): increments `c` to 6 first, then returns reference to `c`. Hence `a` gets 6.\n3. `c++` (postfix): saves old copy of `c` (which is 6), increments `c` to 7, and returns the old copy (6). Hence `b` gets 6.\n4. After this, `c` holds 7.\n5. Printing `a.get()`, `b.get()`, `c.get()` gives `6 6 7`."
    },
    {
        "num": 36,
        "section": "Data Structures & Stack",
        "difficulty": "Expert",
        "question": "What does this code print?",
        "code": "#include <iostream>\nconst int MAX = 5;\nclass Stack {\n    int data[MAX];\n    int top;\npublic:\n    Stack() : top(-1) {}\n    bool push(int v) {\n        if (top >= MAX - 1) return false;\n        data[++top] = v;\n        return true;\n    }\n    int pop() { return (top < 0) ? -1 : data[top--]; }\n    int peek() const { return (top < 0) ? -1 : data[top]; }\n};\nint main() {\n    Stack s;\n    s.push(10); s.push(20); s.push(30);\n    std::cout << s.pop() << \" \" << s.peek() << \" \";\n    s.push(40);\n    std::cout << s.pop() << std::endl;\n}",
        "options": {
            "A": "30 20 20",
            "B": "30 20 40",
            "C": "30 10 40",
            "D": "10 20 40"
        },
        "answer": "B",
        "highYield": False,
        "concept": "Stack Operations LIFO Mechanics",
        "explanation": "Tracing array-based stack:\n1. Push 10 (`top=0, [10]`), Push 20 (`top=1, [10, 20]`), Push 30 (`top=2, [10, 20, 30]`).\n2. `s.pop()` removes and returns `data[2] = 30`. `top` decrements to 1. Prints `30 `.\n3. `s.peek()` inspects current top element without removing: `data[1] = 20`. Prints `20 `.\n4. `s.push(40)` inserts at `data[++top] = data[2] = 40`.\n5. `s.pop()` removes and returns `data[2] = 40`. Prints `40`.\nFinal output: `30 20 40`."
    },
    {
        "num": 37,
        "section": "Polymorphism & Virtual Destructors",
        "difficulty": "Expert",
        "question": "What does this code demonstrate and what is wrong?",
        "code": "#include <iostream>\nclass Base {\npublic:\n    ~Base() { std::cout << \"~Base \"; }\n};\nclass Derived : public Base {\n    int* resource;\npublic:\n    Derived() { resource = new int[100]; }\n    ~Derived() { delete[] resource; std::cout << \"~Derived \"; }\n};\nint main() {\n    Base* p = new Derived();\n    delete p;\n}",
        "options": {
            "A": "Only ~Base — Derived destructor NOT called, causing memory leak; fix: make ~Base() virtual",
            "B": "Compile error — cannot delete through Base pointer concept definition behavior",
            "C": "Prints ~Base ~Derived — both destructors called",
            "D": "Prints ~Derived ~Base — in correct order"
        },
        "answer": "A",
        "highYield": True,
        "concept": "Virtual Destructor Mandate",
        "explanation": "Because `~Base()` is NOT declared `virtual`, deleting an object of derived type through a pointer to base (`Base* p = new Derived(); delete p;`) results in **static dispatch**. Only `~Base()` is executed! `~Derived()` is never called, leaving `resource` unfreed on the heap (memory leak) and failing to clean up derived state.\n**The Universal Rule:** Any class intended to be used polymorphically as a base class MUST declare its destructor `virtual`: `virtual ~Base() {}`."
    },
    {
        "num": 38,
        "section": "Static Variables & Recursion",
        "difficulty": "Expert",
        "question": "What does this code print?",
        "code": "#include <iostream>\nint compute(int n) {\n    static int callCount = 0;\n    ++callCount;\n    if (n <= 0) return callCount;\n    return compute(n - 1);\n}\nint main() {\n    std::cout << compute(3) << \" \";\n    std::cout << compute(2) << std::endl;\n}",
        "options": {
            "A": "1 1",
            "B": "3 2",
            "C": "4 7",
            "D": "4 3"
        },
        "answer": "C",
        "highYield": True,
        "concept": "Static Local Variables Across Recursive Invocations",
        "explanation": "A `static` local variable inside a function is initialized only ONCE when control first passes through its declaration, and retains its value across all subsequent calls.\n1. First call `compute(3)`:\n   - `compute(3)` -> `callCount = 1`\n   - `compute(2)` -> `callCount = 2`\n   - `compute(1)` -> `callCount = 3`\n   - `compute(0)` -> `callCount = 4`. Returns `callCount = 4`.\n   Prints `4 `.\n2. Second call `compute(2)` (starts with `callCount = 4` from previous call!):\n   - `compute(2)` -> `callCount = 5`\n   - `compute(1)` -> `callCount = 6`\n   - `compute(0)` -> `callCount = 7`. Returns `callCount = 7`.\n   Prints `7`.\nOutput: `4 7`."
    },
    {
        "num": 39,
        "section": "Operator Overloading & Linear Algebra",
        "difficulty": "Expert",
        "question": "What does this code print?",
        "code": "#include <iostream>\nclass Matrix2x2 {\n    double a, b, c, d;\npublic:\n    Matrix2x2(double a, double b, double c, double d) : a(a), b(b), c(c), d(d) {}\n    Matrix2x2 operator*(const Matrix2x2& m) const {\n        return Matrix2x2(a*m.a + b*m.c, a*m.b + b*m.d, c*m.a + d*m.c, c*m.b + d*m.d);\n    }\n    double det() const { return a * d - b * c; }\n};\nint main() {\n    Matrix2x2 I(1, 0, 0, 1);\n    Matrix2x2 A(2, 3, 1, 4);\n    Matrix2x2 B = A * I;\n    std::cout << B.det() << \" \" << (A * A).det() << std::endl;\n}",
        "options": {
            "A": "8 25",
            "B": "5 5",
            "C": "5 25",
            "D": "8 8"
        },
        "answer": "C",
        "highYield": False,
        "concept": "Matrix Determinant & Multiplicative Property",
        "explanation": "Determinant calculation:\n• Determinant of `A(2, 3, 1, 4)` is `a*d - b*c = 2*4 - 3*1 = 8 - 3 = 5`.\n• `I` is the 2x2 identity matrix. `B = A * I = A`. Therefore `B.det() = A.det() = 5`.\n• For matrix multiplication, `det(A * A) = det(A) * det(A) = 5 * 5 = 25`.\nPrints `5 25`."
    },
    {
        "num": 40,
        "section": "Pointers & Linked Structures",
        "difficulty": "Expert",
        "question": "What does this code print?",
        "code": "#include <iostream>\nstruct Node {\n    int val;\n    Node* next;\n    Node(int v, Node* n = nullptr) : val(v), next(n) {}\n};\nint sumList(Node* head) {\n    if (!head) return 0;\n    return head->val + sumList(head->next);\n}\nint main() {\n    Node* list = new Node(1, new Node(2, new Node(3, new Node(4, new Node(5)))));\n    std::cout << sumList(list) << std::endl;\n}",
        "options": {
            "A": "14",
            "B": "1",
            "C": "15",
            "D": "5"
        },
        "answer": "C",
        "highYield": True,
        "concept": "Recursive Traversal of Linked List",
        "explanation": "The nodes form the linked list `1 -> 2 -> 3 -> 4 -> 5 -> nullptr`.\nThe recursive function `sumList` evaluates:\n`1 + sumList(2 -> 3 -> 4 -> 5)`\n`= 1 + 2 + sumList(3 -> 4 -> 5)`\n`= 1 + 2 + 3 + 4 + 5 + sumList(nullptr)`\n`= 1 + 2 + 3 + 4 + 5 + 0 = 15`.\nPrints `15`."
    }
]

with open("c:/Users/kanch/Desktop/cdac/quizes/cpp_quiz/all_cpp_questions.json", "w", encoding="utf-8") as f:
    json.dump(cpp_questions, f, indent=2, ensure_ascii=False)

print(f"Successfully wrote {len(cpp_questions)} C++ questions to all_cpp_questions.json")
