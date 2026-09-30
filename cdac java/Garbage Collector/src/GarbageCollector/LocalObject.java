package GarbageCollector;

public class LocalObject {
 String name;
 
 public LocalObject(String name){
  this.name = name;
 
 }
 void createObject(){
 LocalObject lo=new LocalObject("Local");
         }
    public static void main(String[] args) {
        LocalObject mainObj=new LocalObject("Main");
        mainObj.createObject();
        System.gc();
    }
    
    protected void finalize() throws Throwable{
        System.out.println(this.name+"object is cleaning......");
    }
}