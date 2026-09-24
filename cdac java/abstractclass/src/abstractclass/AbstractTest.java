
package abstractclass;

public class AbstractTest {
static void showProps(LivingThings it){
System.out.println("properties of  "+it.getClass() .getName());
it.Eyes();
it.Mouth();
    it.Legs();
    
}    
   public static void main(String[] args) {
    showProps(new Animal()); 
//    Animal it= new Animal(),new Human();k
//    System.out.println("Properties of Human");
//    it.Eyes();
//it.Mouth();
//    it.Legs();
//    
//    System.out.println("=============================="); 
//  
//    System.out.println("Properties of Animal");
//    it.Eyes();
//it.Mouth();
//    it.Legs();
    
    
   }
}
