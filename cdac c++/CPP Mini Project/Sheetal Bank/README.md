# 🏦 Bank Management System (C++)

A clean, beginner-friendly Bank Management System developed in **C++** demonstrating fundamental Object-Oriented Programming (OOP) concepts, Single Inheritance, Encapsulation, Dynamic Arrays (STL Vector), and File Persistence.

---

## 🌟 Key Features

1. **Open New Account**: Create Savings or Current accounts with name, account number, and opening deposit.
2. **Deposit Money**: Add money to existing accounts and update balances in real time.
3. **Withdraw Money**: Withdraw funds with automatic balance validation ($500 minimum balance enforced for Savings).
4. **Check Balance & Account Details**: Display account details for any customer.
5. **Transfer Funds**: Safely transfer money between two accounts.
6. **Display All Accounts**: Print all registered bank accounts in a neat, aligned table.
7. **Persistent File Storage**: Automatically saves and loads all customer data to and from `accounts.txt`.

---

## 📁 Project Structure

```
MiniProjectCpp/
├── banking_system.cpp               # Clean, simplified C++ source code
├── banking_system.exe               # Compiled executable
├── run.bat                          # One-click compile & run script for Windows
├── CDAC_BASIC_NOTES.md              # Simple basic notes with Civil Engg analogies & Viva Q&A
├── cpp_concepts_used.txt            # Concept cheat sheet for quick reference
├── Banking_System_Presentation.pptx # Simple 8-slide presentation with speaker notes
├── PRESENTATION_GUIDE.md            # Exact slide-by-slide speaking script
├── accounts.txt                     # Permanent data storage file
└── README.md                        # Project documentation
```

---

## 🚀 How to Run the Project

### Option A: One-Click Run (Recommended)
Double-click [`run.bat`](file:///c:/Users/SIDDIQ%20KHATIB/Desktop/MiniProjectCpp/run.bat). It automatically compiles `banking_system.cpp` and launches the application.

### Option B: Using Command Prompt or PowerShell
```bash
# 1. Compile using g++
g++ -std=c++11 -Wall banking_system.cpp -o banking_system.exe

# 2. Run the application
.\banking_system.exe
```

---

## 🎓 C++ Concepts Used
- **Classes and Objects**: `Account` (Base class) and `BankAccount` (Derived class).
- **Encapsulation**: Private and protected data members with public getters and methods.
- **Inheritance**: Single inheritance (`class BankAccount : public Account`).
- **Function Overriding**: Custom `withdraw()` behavior in the child class.
- **STL Vector**: Dynamic storage using `std::vector<BankAccount>`.
- **File Handling**: Reading (`ifstream`) and writing (`ofstream`) to `accounts.txt`.
- **Stream Formatting**: Clean tabular outputs with `<iomanip>` (`setw`, `fixed`, `setprecision`).

See [`cpp_concepts_used.txt`](file:///c:/Users/SIDDIQ%20KHATIB/Desktop/MiniProjectCpp/cpp_concepts_used.txt) for detailed explanations and viva answers.
