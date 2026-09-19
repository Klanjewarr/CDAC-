class RouteFinder{
	public void route(String desti){
		System.out.println("You are moving to "+desti);
	}
	public void route(String src,String desti){
		System.out.println("You are moving to "+desti+" from "+src);
	}
	public void route(String src,String via,String desti){
		System.out.println("You are moving to "+desti+" from "+src+" via "+via);
	}
		
}