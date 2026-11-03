package DummyData;

import java.util.*;



public class Data {

    static int no = 100000;

    public static int[] arrDataSorted() {
        List<Integer> lst = new ArrayList<>(no);
        for (int i = 0; i < no; i++) {
            lst.add(i);
        }
        int arr[] = new int[no];
        for (int i = 0; i < no; i++) {
            arr[i] = lst.get(i);
        }
        return arr;
    }

    public static int[] arrDataUnsorted() {
        List<Integer> lst = new ArrayList<>(no);
        for (int i = 0; i < no; i++) {
            lst.add(i);
        }
        Collections.shuffle(lst);
       int arr[] = new int [no];
        for (int i = 0; i < no; i++) {
            arr[i] = lst.get(i);
        }
        return arr;
    }
}
