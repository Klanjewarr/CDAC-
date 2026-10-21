package BinarySearchTree;

class Node {
    int value;
    Node left;
    Node right;

    public Node(int value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

public class BinarySearchTree1 {

    Node root;

    Node insert(Node root, int value) {
        if (root == null) {
            return new Node(value);
        }

        if (value < root.value) {
            root.left = insert(root.left, value);
        } else if (value > root.value) {
            root.right = insert(root.right, value);
        }

        return root;
    }
    
    void inorder(Node root)
    {
        if(root==null)
        {
            return;
        }
        inorder(root.left);
            System.out.println(root.value+"\t");
            inorder(root.right);
    }
    
     boolean search(Node root, int key) {
        if (root == null) {
            return false;
        }

        if (root.value == key) {
            return true;
        }

        if (root.value<key) {
            return search(root.right, key);
        } else {
            return search(root.left, key);
        }
    }

    // Delete
    Node remove(Node root, int key) {
        if (root == null) {
            return null;
        }

        if (root.value>key) {
            root.left = remove(root.left, key);
        } else if (root.value <key) {
            root.right = remove(root.right, key);
        } else {
            if (root.left == null && root.right == null) {
                return null;
            } else if (root.left == null) {
                return root.right;
            } else if (root.right == null) {
                return root.left;
            } else {
                int rtMin = rightMin(root.right);
                root.value = rtMin;
                root.right = remove(root.right, rtMin);
            }
        }

        return root;
    }

    // Find minimum in right subtree
    private int rightMin(Node root) {
        Node temp = root;

        while (temp.left != null) {
            temp = root.left;
        }

        return temp.value;
    }


    public static void main(String[] args) {
        BinarySearchTree1 bst = new BinarySearchTree1();

        System.out.println("Add"+100);
        bst.root=bst.insert(bst.root,100);
        System.out.println("Add"+200);
        bst.root=bst.insert(bst.root,200);
        System.out.println("Add"+50);
        bst.root=bst.insert(bst.root,50);
        System.out.println("Add"+60);
        bst.root=bst.insert(bst.root,60);
        System.out.println("Add"+10);
        bst.root=bst.insert(bst.root,10);
        System.out.println("Add"+250);
        bst.root=bst.insert(bst.root,250);
        System.out.println("Add"+150);
        bst.root=bst.insert(bst.root,150);
         System.out.println("Add"+300);
        bst.root=bst.insert(bst.root,300);    

        System.out.println("Inorder: ");
        bst.inorder(bst.root);
        System.out.println("");


        bst.root=bst.remove(bst.root, 200);

        System.out.print("Inorder Display: ");
        bst.inorder(bst.root);
        System.out.println("");
        
        System.out.println("Find"+500);
        if(bst.search(bst.root, 500)){
            System.out.println("Found");
        }
        else
        {
            System.out.println("Not Found");
        }
    }
}