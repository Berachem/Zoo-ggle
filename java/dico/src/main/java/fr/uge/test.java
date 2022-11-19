package fr.uge;

public class test {

	static String patate = "{\"title\" : \"Cheval\",\"definitions\":{\"nom\" : [\" Nom de famille.\", \" lexique Septième signe ou année du zodiaque chinois.\", \" lexique personne née durant l’année du Cheval du zodiaque chinois.\"],\"verbe\" : []}}\r\n"
			+ "{\"title\" : \"cheval\",\"definitions\":{\"nom\" : [\" info lex Grand mammifère périssodactyle de la famille des équidés, habituellement domestiqué et employé comme monture ou comme bête de trait, de somme.\", \" par métonymie lexique viande de cet animal.\", \" courant Appellation courante de cheval-vapeur, puissance mécanique équivalente à 748 watts.\", \" courant cheval fiscal, dont l’abréviation est cv ou CV.\", \" argot héroïne (drogue).\", \" lexique Appareil gymnique, utilisé pour deux agrès différents : le cheval d’arçons et le saut de cheval.\", \" péjoratif Synonyme parfois utilisé pour désigner une personne.\", \" meubles héraldiques meuble représentant l’animal du même nom dans les armoiries. Il est généralement représenté de profil et passant.\", \" lexique Pièce de certains jeux comme les petits chevaux, et parfois le cavalier aux échecs à cause de la forme de la pièce.\", \" Défaut du marbre consistant en une cavité emplie de matière pulvérulente, terreux. (Note : on dit aussi une cendrure.)\", \" cheval.\", \" cheval.\"],\"verbe\" : []}}\r\n"
			;
	
	private static StringBuilder changeLine(StringBuilder retour,int numberOfSpace,boolean inList) {
		retour.append("\n");
		for(int j=0;j<numberOfSpace;j++) {
			retour.append(" ");
		}
		if(inList) {
			retour.append("-");
		}
		
		return retour;
	}
	
	public static String jsonToYaml(String json) {
		
		StringBuilder retour = new StringBuilder();
		int numberOfSpace=0;
		boolean inList = false;
		boolean inWord = false;
		
		for(int i = 0;i<json.length();i++) {
			char lettre = json.charAt(i);
			
			if(lettre == '{') {
				if(numberOfSpace == 0) {
					retour.append("\n---");
				}
				retour = test.changeLine(retour, numberOfSpace, inList);
				numberOfSpace++;
				
			}else if(lettre == '}') {
				numberOfSpace--;
				
			}else if(lettre == ':') {
				retour.append(": ");
				
			}else if(lettre == '"') {
				inWord = !inWord;
			}else if(lettre == ','){
				retour = test.changeLine(retour, numberOfSpace, inList);
				
			}else if(lettre == '['){
				numberOfSpace++;
				inList = true;
				retour = test.changeLine(retour, numberOfSpace, inList);
				
			}else if(lettre == ']') {
				numberOfSpace--;
				inList = false;
				
			}else if(inWord && (Character.isAlphabetic(lettre) || lettre == ' ')) {
				retour.append(lettre);
				
			}
			
		}
		
		return retour.toString();
		
		
	}
	
	
	public static void main(String[] args) {
		System.out.println(test.jsonToYaml(patate));
	}

}
