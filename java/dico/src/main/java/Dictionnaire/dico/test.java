package Dictionnaire.dico;

public class test {

	public static boolean isNormalized(String word) {
		
		for(int i=0;i<word.length();i++) {
			char c = word.charAt(i);
			if(c<'A' || c>'Z') {
				return false;
			}
		}
		
		return true;
		
	}
	
	
	public static void main(String[] args) {
		System.out.println(test.isNormalized("BÁBOU"));
	}

}
