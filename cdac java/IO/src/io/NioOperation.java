package io;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class NioOperation {

    static void createDirectory() throws IOException {
        Path path = Paths.get(\"D:\\Aug26\\myNio\");
        Files.createDirectory(path);
        System.out.println(\"Directory Created\");
    }

    static void createFile() throws IOException {
        Path path = Paths.get(\"D:\\Aug26\\myNio\\Demo.txt\");
        Files.createFile(path);
        System.out.println(\"File Created\");
    }

    static void showFile() throws IOException {
        Path path = Paths.get(\"D:\\Aug26\\J2SE\\NetbeansJ2SE\\src\\excp\\CheckValidity.java\");
        List<String> data = Files.readAllLines(path);

        for (String line : data) {
            System.out.println(line);
        }
    }

    static void copyFile() throws IOException {
        Path pathr = Paths.get(\"D:\\Aug26\\J2SE\\NetbeansJ2SE\\src\\excp\\CheckValidity.java\");
        List<String> data = Files.readAllLines(pathr);

        Path pathw = Paths.get(\"D:\\Aug26\\myNio\\CheckValidity.java\");
        Files.write(pathw, data);
    }

    static void copyFile1() throws IOException {
        Path pathr = Paths.get(\"D:\\Aug26\\J2SE\\NetbeansJ2SE\\src\\excp\\CheckValidity.java\");
        Path pathw = Paths.get(\"D:\\Aug26\\myNio\\Check.java\");
        Files.copy(pathr, pathw);
    }

    static void moveFile() throws IOException {
        Path pathr = Paths.get(\"D:\\Aug26\\myNio\\Check.java\");
        Path pathw = Paths.get(\"D:\\Aug26\\CheckMove.java\");
        Files.move(pathr, pathw);
    }

    public static void main(String[] args) throws IOException {
        // createDirectory();
        // createFile();
        // showFile();
        // copyFile1();
        moveFile();
    }
}
