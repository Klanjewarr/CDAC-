package Graphs;
import java.util.*;

public class GraphBFS {
public void bfs(int arr[][], int source) {
        int V = arr.length;
        Queue<Integer> q = new LinkedList<>();
        boolean isVisited[] = new boolean[V];
        
        q.add(source);
        isVisited[source] = true;
        
        while (!q.isEmpty()) {
            int node = q.poll();
            System.out.println("Visited Node : " + node);
            for (int index = 0; index < V; index++) {
                if (arr[node][index] == 1 && !isVisited[index]) {
                    q.add(index);
                    isVisited[index] = true;
                }
            }
        }
    }

    public static void main(String[] args) {
        int arr[][] = {
            {0,1,1,1,0},
            {1,0,0,1,1},
            {1,0,0,1,0},
            {1,1,1,0,1},
            {0,1,0,1,0}
        };
        GraphBFS obj = new GraphBFS();
        obj.bfs(arr, 0);
    }}