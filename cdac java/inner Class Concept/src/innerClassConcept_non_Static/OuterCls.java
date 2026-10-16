package innerClassConcept_non_Static;

public class OuterCls {
    
    int a =12;
    protected class InnerCls {
        void innerShow() {
            System.out.println("Inner class method called");
        }
    }
}