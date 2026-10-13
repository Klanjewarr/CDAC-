package thread.demo;

public class ThreadDemo extends Thread{
    public void run(){
//    if(this.getName().equals("First"))
    for(int i=1;i<10;i++){
     try{
     sleep(1000);
     }catch(InterruptedException ex){
         System.err.println(ex.getMessage());
     }
    }
    }

        public static void main(String[] args) {
        
    }
    
}
