package fr.uge;


public class test {

	
	
	
	public static void main(String[] args) {
		String s = "papopuppoipupupo";
		String recherche = "po";
		int indexStart = 0;
		int taille = recherche.length();
		int compteur = 0;
		int indexTrouve;
		while(indexStart<s.length() && (indexTrouve = s.indexOf(recherche,indexStart)) != -1) {
			compteur++;
			
			indexStart=taille+indexTrouve;
		}
		System.out.println(compteur);
	}

}
