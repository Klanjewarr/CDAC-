package io;

import java.io.Serializable;

public class Student implements Serializable {
    int rollNo;
    String name;
    static String course;
    transient long phNo; // It will not persist in secondary memory

    public Student(int rollNo, String name, String course, long phNo) {
        this.rollNo = rollNo;
        this.name = name;
        this.course = course;
        this.phNo = phNo;
    }

    void studentInfo() {
        System.out.println("Roll Number : " + this.rollNo);
        System.out.println("Student Name : " + this.name);
        System.out.println("Course Opted : " + this.course);
        System.out.println("Student Phone : " + this.phNo);
    }
}
