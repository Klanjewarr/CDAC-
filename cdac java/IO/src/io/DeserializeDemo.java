package io;

import java.io.FileInputStream;
import java.io.ObjectInputStream;

public class DeserializeDemo {

    public static void main(String[] args) {
        Student stud = null;

        try (FileInputStream fin = new FileInputStream(\"stud.ser\");
             ObjectInputStream oin = new ObjectInputStream(fin)) {

            stud = (Student) oin.readObject();

            stud.course = "Python";

            stud.studentInfo();

        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }
}
