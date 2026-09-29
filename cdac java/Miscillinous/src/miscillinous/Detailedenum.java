package miscillinous;


enum Course{
Java (50000),
Python(40000),
Sql(30000);

int price;
private Course(int price){
    this.price=price;
}
public int getPrice(){
 return price;
 }
}
public class Detailedenum {
    public static void main(String[] args) {
        Course crs = Course.Python;
        System.err.println(crs);
        System.err.println(crs.getPrice());
    }
}