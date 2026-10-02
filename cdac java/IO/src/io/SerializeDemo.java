package io;

import java.io.FileOutputStream;
import java.io.ObjectOutputStream;

public class SerializeDemo {

    public static void main(String[] args) {
        Student student = new Student(102, "Suresh", "Java", 9032145465L);
        String fileName = "stud.ser";

        try {
            FileOutputStream fout = new FileOutputStream(fileName);
            ObjectOutputStream oout = new ObjectOutputStream(fout);
            oout.writeObject(student);
            System.out.println("Student Object is Serialized");
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }
}
