#include <iostream>
#include <fstream>
#include <string>
#include <iomanip>
#include <cstring>

// Custom structure acting as our database schema table
// struct helps to group a user-defined data type that allows you to group multiple related variables of different data types under a single name.
struct Student {
    int id;
    char name[50]; // Fixed-size char array makes binary file writing straightforward
    int age;
    double gpa;
};

// Helper function to safely clear bad input from std::cin
void clearInputBuffer() {
    std::cin.clear();
    std::cin.ignore(10000, '\n');
}

// CREATE Operation: Appends a single record onto the end of our binary file
void addStudent() {
    std::ofstream outFile("student_db.dat", std::ios::binary | std::ios::app);
    if (!outFile) {
        std::cout << "\n❌ Error: Could not open the database file.\n";
        return;
    }

    Student s;
    std::cout << "\n--- Add New Student Record ---\n";
    
    std::cout << "Enter Student ID (Integer): ";
    while (!(std::cin >> s.id)) {
        std::cout << "❌ Invalid input. Enter an integer for ID: ";
        clearInputBuffer();
    }
    clearInputBuffer();

    std::cout << "Enter Name: ";
    std::cin.getline(s.name, 50);

    std::cout << "Enter Age: ";
    while (!(std::cin >> s.age)) {
        std::cout << "❌ Invalid input. Enter an integer for Age: ";
        clearInputBuffer();
    }

    std::cout << "Enter GPA (0.0 - 4.0): ";
    while (!(std::cin >> s.gpa)) {
        std::cout << "❌ Invalid input. Enter a decimal number for GPA: ";
        clearInputBuffer();
    }

    // Write the raw struct block data directly to the disk
    outFile.write(reinterpret_cast<char*>(&s), sizeof(Student));
    outFile.close();
    std::cout << "\n✅ Record saved successfully!\n";
}

// READ Operation: Traverses the file block-by-block and visualizes data
void displayAll() {
    std::ifstream inFile("student_db.dat", std::ios::binary);
    if (!inFile) {
        std::cout << "\n📂 Database is empty or no records exist yet.\n";
        return;
    }

    Student s;
    std::cout << "\n==================================================\n";
    std::cout << std::left << std::setw(10) << "ID" 
              << std::setw(25) << "Name" 
              << std::setw(8) << "Age" 
              << std::setw(8) << "GPA" << "\n";
    std::cout << "==================================================\n";

    // Read sequentially till EOF (End Of File) is triggered
    while (inFile.read(reinterpret_cast<char*>(&s), sizeof(Student))) {
        std::cout << std::left << std::setw(10) << s.id 
                  << std::setw(25) << s.name 
                  << std::setw(8) << s.age 
                  << std::setw(8) << std::fixed << std::setprecision(2) << s.gpa << "\n";
    }
    std::cout << "==================================================\n";
    inFile.close();
}

// UPDATE Operation: Searches target block, calculates file pointer offset, overwrites data
void updateStudent() {
    std::fstream file("student_db.dat", std::ios::binary | std::ios::in | std::ios::out);
    if (!file) {
        std::cout << "\n📂 Database file not found.\n";
        return;
    }

    int searchId;
    std::cout << "\nEnter Student ID to Update: ";
    while (!(std::cin >> searchId)) {
        std::cout << "❌ Invalid input. Enter a valid ID number: ";
        clearInputBuffer();
    }
    clearInputBuffer();

    Student s;
    bool found = false;

    while (file.read(reinterpret_cast<char*>(&s), sizeof(Student))) {
        if (s.id == searchId) {
            found = true;
            std::cout << "\nRecord Found! Current Data: " << s.name << " (Age: " << s.age << ", GPA: " << s.gpa << ")\n";
            std::cout << "Enter New Name: ";
            std::cin.getline(s.name, 50);

            std::cout << "Enter New Age: ";
            while (!(std::cin >> s.age)) {
                std::cout << "❌ Invalid input. Enter integer for Age: ";
                clearInputBuffer();
            }

            std::cout << "Enter New GPA: ";
            while (!(std::cin >> s.gpa)) {
                std::cout << "❌ Invalid input. Enter decimal for GPA: ";
                clearInputBuffer();
            }

            // Calculate negative byte jump backward to rewrite this exact record slot
            int offset = -1 * static_cast<int>(sizeof(Student));
            file.seekp(offset, std::ios::cur);
            file.write(reinterpret_cast<char*>(&s), sizeof(Student));
            break;
        }
    }
    file.close();

    if (found) std::cout << "\n✅ Record updated successfully!\n";
    else std::cout << "\n❌ Record with ID " << searchId << " not found.\n";
}

// DELETE Operation: Creates a temporary array state excluding the targeted deletion ID
void deleteStudent() {
    std::ifstream inFile("student_db.dat", std::ios::binary);
    if (!inFile) {
        std::cout << "\n📂 Database file not found.\n";
        return;
    }

    int searchId;
    std::cout << "\nEnter Student ID to Delete: ";
    while (!(std::cin >> searchId)) {
        std::cout << "❌ Invalid input. Enter a valid ID number: ";
        clearInputBuffer();
    }
    clearInputBuffer();

    std::ofstream outFile("temp.dat", std::ios::binary);
    Student s;
    bool found = false;

    // Filter out target record during stream transfer
    while (inFile.read(reinterpret_cast<char*>(&s), sizeof(Student))) {
        if (s.id == searchId) {
            found = true; 
        } else {
            outFile.write(reinterpret_cast<char*>(&s), sizeof(Student));
        }
    }
    inFile.close();
    outFile.close();

    // Remove legacy database file and map temporary clone to take its place
    std::remove("student_db.dat");
    std::rename("temp.dat", "student_db.dat");

    if (found) std::cout << "\n✅ Record deleted successfully!\n";
    else std::cout << "\n❌ Record with ID " << searchId << " not found.\n";
}

// Driver Orchestrator System
int main() {
    int choice = 0;
    
    do {
        std::cout << "\n=================================\n";
        std::cout << "    STUDENT DATABASE SYSTEM      \n";
        std::cout << "=================================\n";
        std::cout << "1. Add New Student Record\n";
        std::cout << "2. View All Student Records\n";
        std::cout << "3. Update Student Record\n";
        std::cout << "4. Delete Student Record\n";
        std::cout << "5. Exit Database\n";
        std::cout << "=================================\n";
        std::cout << "Choose an option (1-5): ";

        if (!(std::cin >> choice)) {
            std::cout << "❌ Invalid selection. Please enter a number.\n";
            clearInputBuffer();
            continue;
        }

        switch (choice) {
            case 1: addStudent(); break;
            case 2: displayAll(); break;
            case 3: updateStudent(); break;
            case 4: deleteStudent(); break;
            case 5: std::cout << "\nShutting down database engine... Goodbye!\n"; break;
            default: std::cout << "❌ Out of range selection. Try numbers between 1-5.\n";
        }
    } while (choice != 5);

    return 0;
}
