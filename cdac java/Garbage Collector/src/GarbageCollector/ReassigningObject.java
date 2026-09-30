package GarbageCollector;

public class ReassigningObject {
 String objName;
 
 public ReassigningObject(String objName){
  this.objName= objName;
 }
 public static void main(String[] args){
 ReassigningObject o1= new ReassigningObject("O1");
 ReassigningObject o2= new ReassigningObject("O2");
 
 o1=o2;//Reassign 01 and eligible previous object
 System.gc();
 
 }
 @Override
 protected void finalize()throws Throwable{
     System.out.println(this.objName+" Original memory...");
 }
}