package GarbageCollector;

public class UnreferencedObject {
    String name;
    public UnreferencedObject(String name){
    this.name=name;
    }
    public static void main(String[] args){
    new UnreferencedObject("Lawaris");
    
    System.gc();
    }
    
    protected void finalize() throws Throwable{
        System.out.println(this.name+"is Cleaning......");
    }
}