package lamdaexpression;

@FunctionalInterface
interface TestInter {

    void isEven(int no);
}

class UseInter implements TestInter {

    @Override
    public void isEven(int no) {
        System.out.println(no % 2 == 0);
//        return no % 2 == 0;
    }
}

public class LamdaExpression {

    public static void main(String[] args) {
//        TestInter t1 = new UseInter();
//        System.out.printIn(t1.isEven(10))
        TestInter t1  =n->System.out.println(n%2==0);
        t1.isEven(1232);
    }

}
