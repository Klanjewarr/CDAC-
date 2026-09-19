import java.util.*;

class Loops {
    int n;

    void getiteration() {
        Scanner sc = new Scanner(System.in);
        System.out.println("Please enter the iteration: ");
        n = sc.nextInt();
    }

    int forloop() {
        int i;
        for (i = 0; i < n; i++) {
            System.out.println(i);
        }
        return i; // returns after loop ends
    }

    int whileloop() {
        int i = 0;
        while (i < n) {
            System.out.println(i);
            i++;
        }
        return i;
    }

    void dowhile() {
        int i = 0;
        do {
            System.out.println(i);
            i++;
        } while (i < n);
    }

    public static void main(String ar[]) {
        Loops l = new Loops();
        l.getiteration();
		System.out.println("For Loop: ");
        l.forloop();
		System.out.println("While Loop: ");
        l.whileloop();
		System.out.println("Do while Loop: ");
        l.dowhile();
    }
}