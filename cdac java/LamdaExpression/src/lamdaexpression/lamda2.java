package lamdaexpression;
import java.util.function.*;
public class lamda2 {
    public static void main(String[] args) {
        Predicate<Integer> predicate = n->n>0;//only returs T or F
        System.out.println(predicate.test(-10));
        
        Function<String, Integer> func=(a)->a.length();//take i/p and perform operation on that and give o/p
        System.out.println("Length: "+func.apply("Kanchan"));
        
        Consumer<String> con = n->System.out.println("Hello "+n); //accepts a single input argument and performs an action on it without returning any result (void)
        con.accept("Ninad");
        
        Supplier<Double> sup=()->Math.random(); //without input gives o/p 
        System.out.println(sup.get());
    }
}