package com.library.model;

public class Faculty extends Member {

    public Faculty(int id, String name, String email) {
        super(id, name, email, MemberType.FACULTY);
    }

    @Override
    public int getMaxBooks() {
        return 5;
    }

    @Override
    public int getBorrowDays() {
        return 30;
    }

    @Override
    public double getFineRate() {
        return 1.0;
    }

    @Override
    public void displayDetails() {
        System.out.println("Faculty -> ID: " + id + ", Name: " + name + ", Email: " + email + " (Max Books: 5, Period: 30 days, Fine: Rs 1/day)");
    }
}
