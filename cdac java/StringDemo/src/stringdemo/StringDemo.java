package stringdemo;

public class StringDemo {

    static void testImmutablity() {
        String str = "Ramesh";
        String str1 = "Ramesh";
        String str2 = new String("Ramesh");
        String str3 = new String("Ramesh");

        System.out.println("str==str1" + (str == str1));
        System.out.println("str==str2" + (str == str2));
        System.out.println("str3==str12" + (str3 == str2));
        System.out.println("*********************");
        System.out.println("str.equals(str1)" + (str.equals(str1)));
        System.out.println("str.equals(str2)" + (str.equals(str2)));
        System.out.println("str3.equals(str2)" + (str3.equals(str2)));

    }

    static void testStrMethods() {
        String str = "Avul Pakir Jainulabdeen Abdul Kalam was an Indian aerospace"
                + " engineer and science administrator who served as president of India from 2002"
                + " to 2007. The Government of India honoured him with the Padma Bhushan in 1981 "
                + "and the Padma Vibhushan in 1990";
        String s1 = "    Sachin     ";
        String s2 = "Tendulkar";
        String s3 = "My Name is Khan";
        System.out.println("s1.concat(s2)" + s1.concat(s2));
        System.out.println("Search 'India' " + str.indexOf("India", 166));
        System.out.println("Search 'India' " + str.lastIndexOf("India"));
        System.out.println("Character at postion " + str.charAt(165));
        
        System.out.println("" + s1.repeat(3));
//        System.err.println(""+s1.);
        System.out.println("*******"+s1+"*******");
        System.out.println("*******"+s1.stripLeading()+"**********");
        System.out.println("********"+s1.stripTrailing()+"**********");
        System.out.println("*********"+s1.trim()+"*********");
        
        
        String arr[] =s3.split(" ");
        for(String s:arr){ //for each
            System.out.println(s);
        }
        
        System.out.println("No of words in str "+ str.split(" ").length);

    }

    public static void main(String[] args) {
        testImmutablity();
        testStrMethods();
    }

}
