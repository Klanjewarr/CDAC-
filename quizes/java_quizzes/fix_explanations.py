import json

with open('all_parsed_questions.json', 'r', encoding='utf-8') as f:
    qs = json.load(f)

# Comprehensive dictionary of accurate, topic-specific explanations for mismatched questions
ACCURATE_EXPLANATIONS = {
    53: """`count` is declared as a `static int` variable inside `MyClass`, meaning there is only one shared copy of `count` in memory across all instances of `MyClass`.
1. Initially, `count = 0`.
2. `new MyClass()` (first instance) executes the constructor `count++`, incrementing `count` to 1.
3. `new MyClass()` (second instance) executes the constructor again, incrementing `count` to 2.
4. `System.out.println(MyClass.count)` accesses the shared static member and prints 2.""",

    56: """In subclass constructors, `super(...)` is used to explicitly invoke the parameterized constructor of the immediate superclass (`Parent(int x)`).
Here, `super(x)` passes the argument `x` from `Child(int x, int y)` up to `Parent(int x)`, initializing the inherited instance variable `x` of the `Parent` class.""",

    71: """In Java, when a concrete (non-abstract) class implements an interface, it contracts to provide complete method bodies (implementations) for all abstract methods declared in that interface.
If it fails to implement even one abstract method, the compiler flags an error unless the class itself is declared `abstract`.""",

    74: """The `protected` access specifier allows members (methods and fields) to be accessible:
1. Within all classes in the same package.
2. Within subclasses (derived classes) even if they reside in different packages.
This makes `protected` the standard access modifier for base-class methods designed to be inherited and optionally overridden by subclasses.""",

    83: """The `final` keyword in Java prevents modification:
1. A `final` variable cannot be reassigned (constant).
2. A `final` class cannot be subclassed/extended.
3. A `final` method cannot be overridden by any subclass.
Attempting to override a final method generates a compile-time error: 'cannot override ... overridden method is final'.""",

    85: """In Java:
- **Compile-time (Static) Polymorphism** is achieved via **Method Overloading** (methods with the same name but different parameter signatures within the same class/hierarchy), because which method to call is bound at compile time based on reference types and arguments.
- **Runtime (Dynamic) Polymorphism** is achieved via **Method Overriding** (invoking an overridden instance method via a superclass reference), where dispatch is determined at runtime based on the actual object instance.""",

    86: """In Java:
- **Runtime (Dynamic) Polymorphism** is also known as **Method Overriding** or **Dynamic Method Dispatch**. At runtime, Java inspects the actual object type on the heap to decide which overridden version of the instance method to execute.
- **Method Overloading** represents compile-time (static) polymorphism.""",

    88: """**Downcasting** is casting a superclass reference down to a subclass type (e.g., `(Dog) animal`).
- In Java, downcasting requires an explicit cast `(Subclass) ref`.
- If the actual object on the heap is NOT an instance of the target subclass (or its descendants), JVM throws a runtime `ClassCastException`.
- (Choice B notes potential mismatch/failure if the object is not of the expected subclass type). To prevent this, always test with `instanceof` before downcasting.""",

    89: """**Upcasting** is casting a subclass reference up to a superclass type (e.g., `Animal a = new Dog();`).
- Upcasting is always widening and type-safe in Java, so it is performed automatically (implicitly) without requiring an explicit cast operator.
- Note that via the superclass reference, only methods/members declared in the superclass (or overridden) can be accessed directly; subclass-specific members become inaccessible through that superclass reference without downcasting.""",

    101: """To safely perform downcasting and avoid a runtime `ClassCastException`, Java provides the `instanceof` operator.
It evaluates whether the runtime object belongs to or implements the specified type:
```java
if (animal instanceof Dog) {
    Dog d = (Dog) animal; // completely safe from ClassCastException
}
```""",

    114: """In Java's access control hierarchy:
- `private`: Accessible only within the same class.
- `default (package-private)`: Accessible only within the same package.
- `protected`: Accessible within the same package AND by subclasses in different packages.
- `public`: Accessible from anywhere across all packages.""",

    116: """`java.lang.Runnable` is a core functional interface in Java representing an executable task.
- It contains a single abstract method: `public abstract void run();`
- Any class implementing `Runnable` can have its `run()` method executed asynchronously by passing an instance to a `Thread` constructor (`new Thread(runnable).start()`) or an `ExecutorService`.""",

    119: """The `java.util.Set` interface represents an unordered collection that contains **no duplicate elements** (guaranteeing element uniqueness based on `equals()` and `hashCode()`).
- In contrast, `List` permits duplicates and preserves indexed insertion order.
- `Map` stores key-value pairs (keys are unique, values can duplicate).
- `Queue` represents a collection designed for holding elements prior to processing (FIFO).""",

    122: """In Java, sorting can be handled via two interfaces:
- `Comparable<T>`: Defines the natural ordering of objects internally via `compareTo(T o)`.
- `Comparator<T>`: Defines custom, external sorting logic based on multiple or different criteria via `compare(T o1, T o2)`. Multiple `Comparator` implementations can be created for the same class (e.g. SortByName, SortByAge, SortByPrice).""",

    123: """For collections containing elements that implement `Comparable<T>` (natural ordering), Java provides the utility method `Collections.sort(List<T> list)` from `java.util.Collections`.
It sorts the specified list into ascending order according to the natural ordering of its elements.""",

    128: """All variables declared inside a Java interface are implicitly:
`public static final`
- `public`: Accessible anywhere the interface is accessible.
- `static`: Associated with the interface itself, not with any implementing instance.
- `final`: Constants that must be initialized with a value at declaration and cannot be reassigned.""",

    132: """`@FunctionalInterface` is an informative annotation introduced in Java 8 used to indicate that an interface declaration is intended to be a **Functional Interface** (an interface with exactly one abstract method).
While not strictly required for a functional interface, using `@FunctionalInterface` instructs the Java compiler to verify and issue an error if the interface does not satisfy SAM (Single Abstract Method) requirements.""",

    135: """Introduced in Java 8, `default` methods allow interfaces to declare methods with a concrete body/implementation:
```java
default void log(String msg) {
    System.out.println(msg);
}
```
**Purpose:** They provide backward compatibility, allowing new methods to be added to existing interfaces without breaking legacy classes that already implement the interface.""",

    136: """By specification, a **Functional Interface** (Single Abstract Method or SAM interface) must contain **exactly one abstract method**.
It may contain any number of `default` methods, `static` methods, or declarations of public methods inherited from `java.lang.Object` (such as `equals`, `toString`), but exactly one abstract method of its own.""",

    # Bonus corrections for other questions in bank:
    45: """`Shape shape = new Circle(); shape.draw(); shape.display();`
1. `shape.draw()` invokes `Circle.draw()` via dynamic method dispatch (runtime polymorphism), printing 'Drawing a circle.'.
2. `shape.display()` is an inherited concrete method from `Shape`, printing 'Displaying shape.'.
Together they output: 'Drawing a circle. Displaying shape.'.""",

    47: """In `ThisKeyword`, `this.a = a;` and `this.b = b;` assign the method parameters (3 and 5) to the instance variables.
`System.out.println(this.a + this.b);` computes `3 + 5 = 8` and prints 8.""",

    49: """`person2 = person1;` copies the object reference of `person1` ("Alice") into `person2`.
Both reference variables now point to the exact same `Person` object on the heap, so `person2.name` prints 'Alice'.""",

    50: """`Animal animal = new Dog(); animal.makeSound();`
Through dynamic method dispatch, the JVM executes the overridden method `makeSound()` belonging to the actual runtime object `Dog` on the heap, printing 'Dog barks.'.""",

    52: """Calling `makeSound()` on an object of `Dog` directly invokes `Dog.makeSound()`, which prints 'Dog barks.'.""",

    91: """**Encapsulation** hides internal implementation details and protects an object's state by keeping data fields `private` and exposing safe access via public getter/setter methods.""",

    93: """A method **override** occurs when a subclass defines an instance method with the **same name, return type (or covariant), and parameter list (signature)** as a method in its superclass.""",

    94: """Encapsulation is crucial in OOP because it prevents unauthorized or direct external access to the internal state of a class, ensuring data validation, integrity, and loose coupling.""",

    95: """The feature allowing a subclass to provide a specific implementation of a method defined in its superclass is **polymorphism** (specifically, runtime polymorphism via method overriding).""",

    96: """The process where a subclass provides its own specific implementation for an inherited method from its superclass is called **Method Overriding**.""",

    97: """The `super` keyword in Java allows a subclass to invoke an overridden superclass method (`super.methodName()`) or call the superclass constructor (`super()`).""",

    98: """`Grandparent` -> `Parent extends Grandparent` -> `Main extends Parent` (or uses Parent) represents a **Multilevel Inheritance** hierarchy.""",

    99: """In encapsulation, access modifiers (`private`, `default`, `protected`, `public`) control the **visibility and accessibility** of classes, variables, and methods across classes and packages.""",

    102: """The `public` access modifier makes methods accessible from any class or package across the entire application.""",

    104: """In encapsulation, data members are kept `private`. Range constraints and validations are enforced using conditional logic (`if/else`) inside setter methods before updating the fields.""",

    105: """The access modifier used when no keyword is specified is **package-private (default)**, which restricts visibility exclusively to classes within the same package.""",

    108: """If a Java file omits the `package` declaration at the top, its classes are placed into the **default (unnamed) package**.""",

    110: """`private` members of a superclass are encapsulated within that class and are **not inherited** or directly accessible by subclasses.""",

    111: """In standard Java encapsulation, instance variables are declared `private`, and their corresponding getter and setter methods are declared `public` for controlled external access.""",

    112: """`Animal a = new Dog();` is an example of **Upcasting** (assigning a subclass `Dog` reference to a superclass `Animal` reference type).""",

    113: """The primary benefit of inheritance in OOP is **code reusability**, allowing child classes to inherit attributes and methods from existing parent classes without duplicate code.""",

    115: """When multiple subclasses inherit from a single common superclass (e.g., `Dog extends Animal` and `Cat extends Animal`), it is called **Hierarchical Inheritance**."""
}

# Update all parsed questions with accurate explanations
updated_count = 0
for qid, new_exp in ACCURATE_EXPLANATIONS.items():
    sq = str(qid)
    if sq in qs:
        # Preserve review note if present
        rev = qs[sq].get('review', '')
        full_exp = new_exp
        if rev:
            full_exp += '\n\n[CDAC Review Note]: ' + rev
            
        qs[sq]['correctExplanation'] = full_exp
        qs[sq]['wrongExplanation'] = full_exp
        updated_count += 1

print(f"Updated {updated_count} questions with clean, accurate explanations.")

with open('all_parsed_questions.json', 'w', encoding='utf-8') as f:
    json.dump(qs, f, indent=2)
