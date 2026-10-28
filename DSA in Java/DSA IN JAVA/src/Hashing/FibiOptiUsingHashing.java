package Hashing;

import java.util.HashMap;

public class FibiOptiUsingHashing {

    // 1) Normal recursive Fibonacci: O(2^n)
    static long fibNormal(int n) {
        if (n <= 1)
            return n;
        return fibNormal(n - 1) + fibNormal(n - 2);
    }

    // 2) Optimized using hashing (memoization with HashMap): O(n)
    static long fibHash(int n, HashMap<Integer, Long> memo) {
        if (n <= 1)
            return n;

        // already computed? return it directly
        if (memo.containsKey(n))
            return memo.get(n);

        long result = fibHash(n - 1, memo) + fibHash(n - 2, memo);
        memo.put(n, result);   // store for future use
        return result;
    }

    public static void main(String[] args) {
        int n = 50;

        // ---- Normal method ----
        long start = System.nanoTime();
        long r1 = fibNormal(n);
        long end = System.nanoTime();
        System.out.println("Normal  Fibo of " + n + " = " + r1);
        System.out.println("Normal  time    : " + (end - start) / 1_000_000.0 + " ms");

        System.out.println("--------------------------------------");

        // ---- Hashing (memoized) method ----
        HashMap<Integer, Long> memo = new HashMap<>();
        start = System.nanoTime();
        long r2 = fibHash(n, memo);
        end = System.nanoTime();
        System.out.println("Hashing Fibo of " + n + " = " + r2);
        System.out.println("Hashing time    : " + (end - start) / 1_000_000.0 + " ms");
    }
}