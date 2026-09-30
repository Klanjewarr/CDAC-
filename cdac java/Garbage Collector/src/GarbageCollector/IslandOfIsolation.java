package GarbageCollector;

public class IslandOfIsolation {
 String name;
 IslandOfIsolation i;
 public IslandOfIsolation(String name){
     this.name=name;
 }
 
    public static void main(String[] args) {
        IslandOfIsolation o1 = new IslandOfIsolation("O1");
        IslandOfIsolation o2 = new IslandOfIsolation("O2");
        
        o1.i=o2;
        o2.i=o1;
        
        o1=null;
        o2=null;
        
        System.gc();
    }
    
    protected void finalize()throws Throwable{
        System.out.println(this.name+"is cleaning.....");
    }
}