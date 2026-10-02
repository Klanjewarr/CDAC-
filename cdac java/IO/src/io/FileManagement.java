package io;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class FileManagement {
    static FileInputStream fin;
    // static FileOutputStream fout;

    static void readFile() {
        int i;
        try {
            fin = new FileInputStream(\"D:\\Aug26\\J2SE\\NetbeansJ2SE\\src\\excp\\CheckValidity.java\");
            do {
                i = fin.read();
                System.out.print((char) i);
            } while (i != -1);
        } catch (Exception e) {
            System.err.println(e.getMessage());
        } finally {
            try {
                fin.close();
            } catch (IOException ex) {
                System.err.println(ex.getMessage());
            }
        }
    }

    static void copyFile() {
        int i;
        try (FileInputStream fin = new FileInputStream(\"D:\\Aug26\\chicago.jpg\");
             FileOutputStream fout = new FileOutputStream(\"copiedCicago.png\")) {
            do {
                i = fin.read();
                fout.write(i);
            } while (i != -1);
            System.out.println(\"File Copied\");
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }

    public static void main(String[] args) {
        // readFile();
        copyFile();
    }
}
