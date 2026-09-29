package exceptionhandling;

import java.util.Scanner;

public class CheckVoterValidity {
 void validAge(int age){
 if(age>=18){
     System.out.println("Congrats, You are Valid voter");
 }
 else{
 try{
 throw new VoterValidityException("You are kiddo.............");
 }
 catch(Exception e){
     System.out.println(e.getMessage());
 }
 }
 }
 public static void main(String[] args){
 CheckVoterValidity chk = new CheckVoterValidity();
 Scanner sc = new Scanner(System.in);
 System.out.println("Enter your age");
int age = sc.nextInt();
chk.validAge(age);
 }
}