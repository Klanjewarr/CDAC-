package Graphs;

import java.util.*;

public class GraphDFS {
    public void dfs(int[][] arr, int source) {
        int V = arr.length;
        Stack<Integer> stack = new Stack<>();
        boolean isVisited[] = new boolean[V];

        stack.push(source);
        isVisited[source] = true;

        while (!stack.isEmpty()) {
            int node = stack.pop();
                System.out.println("Visited Node : " + node);
                isVisited[node] = true;
            for (int index = 0; index < V; index++) {
                if (arr[node][index] == 1 && !isVisited[index]) {
                    stack.push(index);
                    isVisited[index] = true;
                }
            }
        }
    }

    public static void main(String[] args) {
        int[][] arr = {
            {0, 1, 1, 1, 0},
            {1, 0, 0, 1, 1},
            {1, 0, 0, 1, 0},
            {1, 1, 1, 0, 1},
            {0, 1, 0, 1, 0}
        };

        GraphDFS obj = new GraphDFS();
        obj.dfs(arr, 0);
    }
}