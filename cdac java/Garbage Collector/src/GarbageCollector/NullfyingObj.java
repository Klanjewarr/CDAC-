package GarbageCollector;

public class NullfyingObj {
   String objName;
    public NullfyingObj(String objName){
        this.objName=objName;
    }
    public static void main(String[] args) {
        NullfyingObj obj= new NullfyingObj("obj");
        obj=null;//Nullifying the object and make eligible for Garbage Collector
        System.gc();
    }
    @Override
    protected void finalize() throws Throwable{
        System.err.println(this.objName+"is cleaning...");
        }
}