#include <iostream>
#include <string>
#include <vector>
#include <fstream>
#include <sstream>
#include <iomanip>

using namespace std;

// ============================================================================
// 1. BASE CLASS: Account (Demonstrates Encapsulation)
// ============================================================================
class Account {
protected:
    int accountNumber;
    string accountHolder;
    double balance;

public:
    // Constructor with default parameters
    Account(int accNo = 0, string name = "", double initBal = 0.0)
        : accountNumber(accNo), accountHolder(name), balance(initBal) {}

    virtual ~Account() {}

    // Getters for read-only access
    int getAccountNumber() const { return accountNumber; }
    string getAccountHolder() const { return accountHolder; }
    double getBalance() const { return balance; }

    // Method to deposit money
    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            cout << "Successfully deposited $" << fixed << setprecision(2) << amount
                 << " | Balance: $" << balance << endl;
        } else {
            cout << "Invalid deposit amount!" << endl;
        }
    }

    // Virtual withdraw method (can be overridden in derived classes)
    virtual bool withdraw(double amount) {
        if (amount <= 0) {
            cout << "Invalid withdrawal amount!" << endl;
            return false;
        }
        if (amount > balance) {
            cout << "Insufficient funds! Current balance: $" << fixed << setprecision(2) << balance << endl;
            return false;
        }
        balance -= amount;
        cout << "Successfully withdrawn $" << fixed << setprecision(2) << amount
             << " | Balance: $" << balance << endl;
        return true;
    }
};

// ============================================================================
// 2. DERIVED CLASS: BankAccount (Demonstrates Inheritance & Overriding)
// ============================================================================
class BankAccount : public Account {
private:
    string accountType; // "Savings" or "Current"

public:
    // Constructor calling base class constructor
    BankAccount(int accNo = 0, string name = "", string type = "Savings", double initBal = 0.0)
        : Account(accNo, name, initBal), accountType(type) {}

    string getAccountType() const { return accountType; }

    // Overridden withdraw method: enforces $500 minimum balance for Savings
    bool withdraw(double amount) override {
        if (amount <= 0) {
            cout << "Withdrawal amount must be greater than zero!" << endl;
            return false;
        }
        if (accountType == "Savings" && (balance - amount < 500.0)) {
            cout << "Withdrawal failed! Savings accounts require a minimum balance of $500.00." << endl;
            cout << "Current Balance: $" << fixed << setprecision(2) << balance << endl;
            return false;
        }
        // Reuse base class withdraw logic
        return Account::withdraw(amount);
    }

    // Display account details
    void displayAccount() const {
        cout << "----------------------------------------" << endl;
        cout << "Account Number : " << accountNumber << endl;
        cout << "Account Holder : " << accountHolder << endl;
        cout << "Account Type   : " << accountType << endl;
        cout << "Current Balance: $" << fixed << setprecision(2) << balance << endl;
        cout << "----------------------------------------" << endl;
    }
};

// ============================================================================
// 3. HELPER FUNCTIONS & FILE HANDLING
// ============================================================================

// Search for account index by account number (-1 if not found)
int findAccountIndex(const vector<BankAccount>& accounts, int accNo) {
    for (size_t i = 0; i < accounts.size(); i++) {
        if (accounts[i].getAccountNumber() == accNo) return (int)i;
    }
    return -1;
}

// Safely read an integer from console
int getIntegerInput(const string& prompt) {
    int value;
    cout << prompt;
    while (!(cin >> value)) {
        cin.clear();
        cin.ignore(1000, '\n');
        cout << "Invalid input! " << prompt;
    }
    cin.ignore(1000, '\n');
    return value;
}

// Safely read a double amount from console
double getDoubleInput(const string& prompt) {
    double value;
    cout << prompt;
    while (!(cin >> value)) {
        cin.clear();
        cin.ignore(1000, '\n');
        cout << "Invalid amount! " << prompt;
    }
    cin.ignore(1000, '\n');
    return value;
}

// Load accounts from text file
void loadAccountsFromFile(vector<BankAccount>& accounts, const string& filename) {
    accounts.clear();
    ifstream inFile(filename);
    if (!inFile.is_open()) {
        accounts.push_back(BankAccount(1001, "Aarav Sharma", "Savings", 5000.0));
        accounts.push_back(BankAccount(1002, "Priya Patel", "Savings", 3200.0));
        accounts.push_back(BankAccount(1003, "TechNova Solutions", "Current", 15000.0));
        return;
    }

    string line;
    while (getline(inFile, line)) {
        if (line.empty()) continue;
        stringstream ss(line);
        string accNoStr, name, type, balStr;
        if (getline(ss, accNoStr, '|') && getline(ss, name, '|') &&
            getline(ss, type, '|') && getline(ss, balStr, '|')) {
            accounts.push_back(BankAccount(stoi(accNoStr), name, type, stod(balStr)));
        }
    }
    inFile.close();

    if (accounts.empty()) {
        accounts.push_back(BankAccount(1001, "Aarav Sharma", "Savings", 5000.0));
        accounts.push_back(BankAccount(1002, "Priya Patel", "Savings", 3200.0));
        accounts.push_back(BankAccount(1003, "TechNova Solutions", "Current", 15000.0));
    }
}

// Save accounts back to text file
void saveAccountsToFile(const vector<BankAccount>& accounts, const string& filename) {
    ofstream outFile(filename);
    if (!outFile.is_open()) {
        cout << "Error: Unable to save data to file!" << endl;
        return;
    }
    for (const auto& acc : accounts) {
        outFile << acc.getAccountNumber() << "|"
                << acc.getAccountHolder() << "|"
                << acc.getAccountType() << "|"
                << fixed << setprecision(2) << acc.getBalance() << "\n";
    }
    outFile.close();
}

// ============================================================================
// 4. BANK OPERATIONS
// ============================================================================

// 1. Create a New Account
void createNewAccount(vector<BankAccount>& accounts) {
    cout << "\n--- CREATE NEW ACCOUNT ---" << endl;
    int accNo = getIntegerInput("Enter Account Number: ");

    if (findAccountIndex(accounts, accNo) != -1) {
        cout << "Error: Account number already exists!" << endl;
        return;
    }

    cout << "Enter Account Holder Name: ";
    string name;
    getline(cin, name);
    if (name.empty()) {
        cout << "Error: Name cannot be empty!" << endl;
        return;
    }

    cout << "Select Type: (1) Savings  (2) Current: ";
    int typeChoice = getIntegerInput("");
    string type = (typeChoice == 2) ? "Current" : "Savings";

    double initialDeposit = getDoubleInput("Enter Initial Deposit ($): ");
    if (type == "Savings" && initialDeposit < 500.0) {
        cout << "Error: Minimum opening balance for Savings is $500.00!" << endl;
        return;
    }

    accounts.push_back(BankAccount(accNo, name, type, initialDeposit));
    cout << "Account created successfully for " << name << "!" << endl;
}

// 2. Deposit Money
void depositMoney(vector<BankAccount>& accounts) {
    cout << "\n--- DEPOSIT MONEY ---" << endl;
    int accNo = getIntegerInput("Enter Account Number: ");
    int index = findAccountIndex(accounts, accNo);

    if (index == -1) {
        cout << "Error: Account not found!" << endl;
        return;
    }

    cout << "Holder: " << accounts[index].getAccountHolder()
         << " | Balance: $" << fixed << setprecision(2) << accounts[index].getBalance() << endl;
    double amount = getDoubleInput("Enter Amount to Deposit ($): ");
    accounts[index].deposit(amount);
}

// 3. Withdraw Money
void withdrawMoney(vector<BankAccount>& accounts) {
    cout << "\n--- WITHDRAW MONEY ---" << endl;
    int accNo = getIntegerInput("Enter Account Number: ");
    int index = findAccountIndex(accounts, accNo);

    if (index == -1) {
        cout << "Error: Account not found!" << endl;
        return;
    }

    cout << "Holder: " << accounts[index].getAccountHolder()
         << " | Type: " << accounts[index].getAccountType()
         << " | Balance: $" << fixed << setprecision(2) << accounts[index].getBalance() << endl;
    double amount = getDoubleInput("Enter Amount to Withdraw ($): ");
    accounts[index].withdraw(amount);
}

// 4. Check Account Balance / Details
void checkAccountDetails(const vector<BankAccount>& accounts) {
    cout << "\n--- CHECK ACCOUNT DETAILS ---" << endl;
    int accNo = getIntegerInput("Enter Account Number: ");
    int index = findAccountIndex(accounts, accNo);

    if (index == -1) {
        cout << "Error: Account not found!" << endl;
        return;
    }
    accounts[index].displayAccount();
}

// 5. Transfer Funds Between Two Accounts
void transferMoney(vector<BankAccount>& accounts) {
    cout << "\n--- TRANSFER FUNDS ---" << endl;
    int senderAcc = getIntegerInput("Enter Sender Account Number: ");
    int senderIdx = findAccountIndex(accounts, senderAcc);
    if (senderIdx == -1) {
        cout << "Error: Sender account not found!" << endl;
        return;
    }

    int receiverAcc = getIntegerInput("Enter Receiver Account Number: ");
    if (senderAcc == receiverAcc) {
        cout << "Error: Cannot transfer to the same account!" << endl;
        return;
    }

    int receiverIdx = findAccountIndex(accounts, receiverAcc);
    if (receiverIdx == -1) {
        cout << "Error: Receiver account not found!" << endl;
        return;
    }

    cout << "Transfer from " << accounts[senderIdx].getAccountHolder()
         << " to " << accounts[receiverIdx].getAccountHolder() << endl;

    double amount = getDoubleInput("Enter Transfer Amount ($): ");
    if (accounts[senderIdx].withdraw(amount)) {
        accounts[receiverIdx].deposit(amount);
        cout << "Transfer completed successfully!" << endl;
    } else {
        cout << "Transfer failed due to balance limits." << endl;
    }
}

// 6. Display All Accounts
void displayAllAccounts(const vector<BankAccount>& accounts) {
    cout << "\n=============================================================" << endl;
    cout << "                 ALL REGISTERED BANK ACCOUNTS                " << endl;
    cout << "=============================================================" << endl;

    if (accounts.empty()) {
        cout << "No accounts registered." << endl;
        return;
    }

    cout << left << setw(10) << "ACC NO"
         << setw(22) << "ACCOUNT HOLDER"
         << setw(12) << "TYPE"
         << right << setw(15) << "BALANCE ($)" << endl;
    cout << "-------------------------------------------------------------" << endl;

    for (const auto& acc : accounts) {
        cout << left << setw(10) << acc.getAccountNumber()
             << setw(22) << acc.getAccountHolder()
             << setw(12) << acc.getAccountType()
             << right << setw(15) << fixed << setprecision(2) << acc.getBalance() << endl;
    }
    cout << "-------------------------------------------------------------" << endl;
    cout << "Total Active Accounts: " << accounts.size() << endl;
}

// ============================================================================
// 5. MAIN FUNCTION & MENU LOOP
// ============================================================================
int main() {
    const string filename = "accounts.txt";
    vector<BankAccount> accounts;

    // Load existing accounts on startup
    loadAccountsFromFile(accounts, filename);

    int choice = 0;
    while (true) {
        cout << "\n========================================" << endl;
        cout << "       BANK MANAGEMENT SYSTEM           " << endl;
        cout << "========================================" << endl;
        cout << "1. Open New Account" << endl;
        cout << "2. Deposit Money" << endl;
        cout << "3. Withdraw Money" << endl;
        cout << "4. Check Account Balance / Details" << endl;
        cout << "5. Transfer Funds" << endl;
        cout << "6. Display All Accounts" << endl;
        cout << "7. Save & Exit" << endl;
        cout << "========================================" << endl;

        choice = getIntegerInput("Enter choice (1-7): ");

        switch (choice) {
            case 1:
                createNewAccount(accounts);
                saveAccountsToFile(accounts, filename);
                break;
            case 2:
                depositMoney(accounts);
                saveAccountsToFile(accounts, filename);
                break;
            case 3:
                withdrawMoney(accounts);
                saveAccountsToFile(accounts, filename);
                break;
            case 4:
                checkAccountDetails(accounts);
                break;
            case 5:
                transferMoney(accounts);
                saveAccountsToFile(accounts, filename);
                break;
            case 6:
                displayAllAccounts(accounts);
                break;
            case 7:
                saveAccountsToFile(accounts, filename);
                cout << "\nData saved. Thank you for using Bank Management System!\n";
                return 0;
            default:
                cout << "Invalid choice! Please select 1 to 7." << endl;
                break;
        }
    }

    return 0;
}
