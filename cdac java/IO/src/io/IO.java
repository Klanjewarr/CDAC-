package io;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;


public class IO {
    
    static BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
    
    static void inputChar() throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        System.out.println("Enter characters, write 'q' to quit");
        char c;
        do{
        c=(char)br.read();
        System.out.print(c);
        }while(c!='q');
    }
     static void inputLine() throws IOException{
//         BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
        System.out.println("Enter statement , write 'stop' to quit");
        String str;
        do{
            str=br.readLine();
            System.out.println(str);
        }while(!str.equals("stop"));
    }
    
    static void inputPara() throws IOException{
//         BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
        System.out.println("Enter statement , write 'stop' to quit");
        String str[]=new String[100];
        for(int i=0;i<str.length;i++){
            str[i]=br.readLine();
            if(str[i].equals("stop"))
                break;
        }          
    
        System.out.println("Yout paragraph is");
        for(int i=0;i<str.length;i++){
            if(str[i].equals("stop"))
                break;
            System.out.println(str[i]);
        }
    }
    
    public static void main(String[] args) throws IOException {
        inputChar();
        inputLine();
        inputPara();
    }
}

