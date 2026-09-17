class Demo{ //nothing is define means it is default
	int x=10;
	static int y=20;
	
	void add(){
	int z=x+y;
	System.out.println("Z= "+z);
	}
	
	public static void main (String arg[]){
	Demo d1 = new Demo();
	Demo d2 = new Demo();
	Demo d3 = new Demo();
	
	y= 500;
	System.out.println(Test1.s1);
	d1.add();
	d2.add();
	d3.add();
	}
	
}