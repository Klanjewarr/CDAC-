package com.library.model;

public class Student extends Member {

    public Student(int id, String name, String email) {
        super(id, name, email, MemberType.STUDENT);
    }

    @Override
    public int getMaxBooks() {
        return 3;
    }

    @Override
    public int getBorrowDays() {
        return 14;
    }

    @Override
    public double getFineRate() {
        return 2.0;
    }

    @Override
    public void displayDetails() {
        System.out.println("Student -> ID: " + id + ", Name: " + name + ", Email: " + email + " (Max Books: 3, Period: 14 days, Fine: Rs 2/day)");
    }
}
