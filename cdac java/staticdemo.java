class StaticDemo{
	static int x;
	static boolean b;
	public static void main(String ar[])
	{
		StaticDemo sd1=new StaticDemo();
		StaticDemo sd2=new StaticDemo();
		StaticDemo sd3=new StaticDemo();
		
		//System.out.println(b);
		/*sd1.x=sd1.x+1;
		System.out.println(sd1.x);
		sd2.x=sd2.x+1;
		System.out.println(sd2.x);
		sd3.x=sd3.x+1;
		System.out.println(sd3.x);*/
		
		/*x=x+1;
		System.out.println(x);
		x=x+1;
		System.out.println(x);
		x=x+1;
		System.out.println(x);*/
		
		StaticDemo.x=StaticDemo.x+1;
		System.out.println(StaticDemo.x);
		StaticDemo.x=StaticDemo.x+1;
		System.out.println(StaticDemo.x);
		StaticDemo.x=StaticDemo.x+1;
		System.out.println(StaticDemo.x);

		
	}
}