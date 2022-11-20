package fr.uge.jdict;

import java.io.File;
import java.io.RandomAccessFile;
import java.util.ArrayList;
import java.util.List;
import fr.uge.DictionaryMaker;

public class DictionarySearcher {
	
	
	/**
	 * Fonction qui lit un mot dans un enregistrment json/normalisé
	 * 
	 * @param reader : le fichier json dans lequel la lecture se fait
	 * @param beginOffset : l'offset de début de l'enregistrement
	 * @param endOffset : l'offset de fin de l'enregistrement
	 * @param isNormalized : indique ce le mot à lire est normalisé ou non
	 * @return le mot contenu dans l'enregistrement
	 */
	public static String readAword(RandomAccessFile reader,long beginOffset,long endOffset,boolean isNormalized ) {
		
		StringBuilder enregistrement = new StringBuilder();
		boolean inWord = false;
		
		try {
		
			reader.seek(beginOffset);
			long pointeur = beginOffset;
			while((pointeur = reader.getFilePointer()) != endOffset) {
				char lettre = reader.readChar();
				if(lettre == ':') {//le premier : indique que l'on vien de passer le parametre "titre"
					if(isNormalized) {
						break;
					}
					inWord = true;
					continue;
				}
				if(lettre == ',') {
					break;
				}
				
				if((inWord || isNormalized) && lettre!='"') {
					enregistrement.append(lettre);
				}
				
			}
		}catch(Exception e) {
			e.printStackTrace();
			return ""; //Le calcul du pire des cas n'est pas exact (parfois il est trop grand de 1), 
					   //il arrive donc parfois qu'un dépassement arrive
					   //mais seulement dans les cas ou le mots n'est pas dans le dictionnaire
		}/*catch(Exception e) {
			e.printStackTrace();
		}*/
		
		if(isNormalized) {
			return enregistrement.toString();
		}
		
		
		return enregistrement.substring(1);//on enlève le premier espace
	}
	
	/**
	 * Fonction qui fait la recherche dichotomique d'un mot et renvoie les offsets de ce dernier
	 * 
	 * @param word : le mot à chercher
	 * @param isNormalized : indique si le mot à chercher est normalisé ou non
	 * @param numberOfCouple : le nombre de couple
	 * @param coupleSize : la taille d'un couple
	 * @param lexReader : le fichier index binaire
	 * @param wordReader : le fichier ou se lis le mot
	 * @return une Liste des offsets de début et fin du mot
	 */
	public static List<Long> dichotomicSearch(String word,boolean isNormalized ,long numberOfCouple,long coupleSize,RandomAccessFile lexReader,RandomAccessFile wordReader ){
		//mise en place de variables utiles
		long pireDesCas = Math.round(Math.log(numberOfCouple)/Math.log(2))+12;//L'algorithme est en théorie O(Log(n)) mais pas exactement à l'execution
		long compteur = 0;
		
		try {
		
			//mise en place des premiers offsets
			lexReader.seek(lexReader.getFilePointer()+((numberOfCouple/2)*coupleSize));
			long middleWordBegin = lexReader.readLong();
			long middleWordEnd = lexReader.readLong();
			
			
			//boucle de recherche
			String readedWord="";
			while((compteur<=pireDesCas) && !(readedWord = DictionarySearcher.readAword(wordReader, middleWordBegin, middleWordEnd,isNormalized)).equals(word)) {
				//verification du mot central
				numberOfCouple /= 2;
				if(numberOfCouple<=1) {
					numberOfCouple=2; //on veut toujours bouger d'au moins un
				}
				
				//actualisation des offsets
				if(readedWord.compareTo(word)>=0) {
					lexReader.seek(lexReader.getFilePointer() - ((numberOfCouple/2)+1)*coupleSize);
					middleWordBegin = lexReader.readLong();
					middleWordEnd = lexReader.readLong();
				}else {
					lexReader.seek(lexReader.getFilePointer() + ((numberOfCouple/2)-1)*coupleSize);
					middleWordBegin = lexReader.readLong();
					middleWordEnd = lexReader.readLong();
				}
				compteur ++;
			}
		
			
			//lecture de l'enregistrement
			if(readedWord.equals(word)) {
				return List.of(middleWordBegin,middleWordEnd);
			}
			return new ArrayList<Long>();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return new ArrayList<Long>();
	}
	
	
	/**
	 * Fonction qui récupère la postion du mot dans le dico.lex
	 * 
	 * @param word : mot à chercher
	 * @return l'offset de debut et de fin du mot recherché, une liste vide en cas de probleme
	 */
	public static List<Long> getTheNormalizedWordOffset(String word,String path) {
		
		//normalisation
		String normalizedWord = DictionaryMaker.normalize(word);
		
		//initialisation des fichiers
		File semiDico = new File(path+"semi.lex");
		File lexFile = new File(path+".lex");
		
		try {
			
			//initialisation des reader
			RandomAccessFile semiReader = new RandomAccessFile(semiDico,"rw");
			RandomAccessFile lexReader = new RandomAccessFile(lexFile,"rw");
			
			//variable utiles
			long coupleSize = 16; //un long fait 8 bits donc 2 long font 16 logiquement
			long lengthFichier = lexReader.length(); //je suppose qu'il me renvoie le nombre de bit
			long numberOfCouple = lengthFichier/coupleSize;
			
			//recuperation du resultat
			List<Long> retour = DictionarySearcher.dichotomicSearch(normalizedWord, true, numberOfCouple, coupleSize, lexReader, semiReader);
			
			//fermeture des Reader
			semiReader.close();
			lexReader.close();
			
			return retour;
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ArrayList<Long>();
	}
	
	/**
	 * Fonction qui indique si un mot est normalisé
	 * 
	 * @param word : le mot a verifier
	 * @return true si le mot est normalizé false sinon
	 */
	public static boolean isNormalized(String word) {
		
		for(int i=0;i<word.length();i++) {
			char c = word.charAt(i);
			if(c<'A' || c>'Z') {
				return false;
			}
		}
		
		return true;
		
	}
	
	/**
	 * Affiche toutes les possibilitées d'un mot normalisé
	 * 
	 * @param offsets : la liste des offsets de début et de fin de l'enregistrement du mot normalisé
	 */
	public static String allTheWordsFromNormalized(List<Long> offsets,String path){
		
		//preparation des fichier
		File semiDicoFile = new File(path+"semi.lex");
		File jsonFile = new File(path+".json");
		
		//preparation de divers variables
		long offsetBegin = offsets.get(0);
		long offsetEnd = offsets.get(1);
		
		try {
			//ouverture de fichier
			RandomAccessFile semiDico = new RandomAccessFile(semiDicoFile,"rw");
			RandomAccessFile json = new RandomAccessFile(jsonFile,"rw");
			
			//actualisation de la position
			DictionarySearcher.readAword(semiDico, offsetBegin, offsetEnd, true);
			long position = semiDico.getFilePointer();
			long length = offsetEnd - offsetBegin - (position - offsetBegin);
			long numberOfCouple = length/16;
			
			//ecriture du retour
			StringBuilder print =  new StringBuilder();
			for(int i=0;i<numberOfCouple;i++) {
				
				//preparation des variables de lecture
				long wordBegin = semiDico.readLong();
				long wordEnd = semiDico.readLong();
				json.seek(wordBegin);
				
				
				//lecture du mot
				long pointer = wordBegin;
				while((pointer = json.getFilePointer()) != wordEnd) {
					print.append(json.readChar());
				}
			}
			
			//ecriture du mot
			return print.toString();
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return "Ceci ne devrait pas apparaitre";
	}
	
	
	/**
	 * Affiche l'enregistrement json du mot recherché (non normalisé)
	 * 
	 * @param offsets : le début/fin de l'enregistrement du semiDico
	 * @param word : le mot à chercher
	 */
	public static String onlyTheOneWord(List<Long> offsets, String word,String path) {
		
		//initialisation des fichiers
		File lexFile = new File(path+"semi.lex");
		File jsonFile = new File(path+".json");
		
		try {
			
			//initialisation des RandomAccessFile
			RandomAccessFile lexReader = new RandomAccessFile(lexFile,"rw");
			RandomAccessFile jsonReader = new RandomAccessFile(jsonFile,"rw");
			
			//initialisation des variables pour la recherche dichotomique
			long offsetBegin = offsets.get(0);
			long offsetEnd = offsets.get(1);
			DictionarySearcher.readAword(lexReader, offsetBegin, offsetEnd, true);
			long position = lexReader.getFilePointer();
			long length = offsetEnd - offsetBegin - (position - offsetBegin);
			long coupleSize = 16;
			long numberOfCouple = length/coupleSize;
			
			//recuperation et affichage des resultats
			List<Long> finalOffsets = DictionarySearcher.dichotomicSearch(word, false, numberOfCouple, coupleSize, lexReader, jsonReader);
			
			if(finalOffsets.isEmpty()) {
				return "le mot n'a pas ete trouve";
			}
			
			//creation du retour
			StringBuilder print = new StringBuilder();
			long wordBegin = finalOffsets.get(0);
			long wordEnd = finalOffsets.get(1);
			
			jsonReader.seek(wordBegin);
			long pointer = wordBegin;
			while((pointer = jsonReader.getFilePointer()) != wordEnd) {
				print.append(jsonReader.readChar());
			}
			
			//fermeture des Reader
			jsonReader.close();
			lexReader.close();
			
			return print.toString();
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return "Ceci ne devrait pas apparaitre";
	}
	
	/** 
	 * Gère le changement de ligne d'un enregistrment yaml
	 * 
	 * @param retour : le StringBuilder
	 * @param numberOfSpace : la hauteur actuel dans l'enregistrment
	 * @param inList : indique si on est à l'interieur d'une liste ou non
	 * @return le stringBuilder auquel on à ajouter le saut de ligne et la bonne profondeur
	 */
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
	
	/**
	 * Transforme un enregistrment json en enregistrement yaml
	 * 
	 * @param json : l'enregistrement à modifier
	 * @return une chaine de charactère sous format yaml
	 */
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
				retour = DictionarySearcher.changeLine(retour, numberOfSpace, inList);
				numberOfSpace++;
				
			}else if(lettre == '}') {
				numberOfSpace--;
				
			}else if(lettre == ':') {
				retour.append(": ");
				
			}else if(lettre == '"') {
				inWord = !inWord;
			}else if(lettre == ','){
				retour = DictionarySearcher.changeLine(retour, numberOfSpace, inList);
				
			}else if(lettre == '['){
				numberOfSpace++;
				inList = true;
				retour = DictionarySearcher.changeLine(retour, numberOfSpace, inList);
				
			}else if(lettre == ']') {
				numberOfSpace--;
				inList = false;
				
			}else if(inWord && (Character.isAlphabetic(lettre) || lettre == ' ')) {
				retour.append(lettre);
				
			}
			
		}
		
		return retour.toString();
		
		
	}
	
	/* Main
	 * @param arg[0] : le chemin
	 * @param arg[1] : le mot à rechercher
	 * commande : java DictionarySearcher.java path word
	 * javac DictionarySearcher.java
	 */
	public static void main( String[] args )
    {
		
		if (args.length != 2) {
			System.out.println("Il faut 2 arguments : le chemin et le mot à rechercher");
			return;
		}

		String path = args[0];
		String mot = args[1];
		
		
		//String path = "dico";
		//String mot = "ZZZZZZZZ";

		System.out.println("ARGUMENTS ! "+path+" : "+mot);

    	boolean yaml = false;
    	String retour = "";
    	
    	//gestion de l'écriture en yaml
    	if(mot.contains("yaml:")) {
    		yaml = true;
    		mot = mot.replace("yaml:", "");
    	}
    	
    	//recuperation du mot normalisé
    	List<Long> offsets = DictionarySearcher.getTheNormalizedWordOffset(mot, path);
    	if(offsets.isEmpty()) {
    		System.out.println("le mot n'a pas ete trouve");
    		
    	//affichage des resultats
    	}else {
    		
    		//recuperation des resultats
    		if(DictionarySearcher.isNormalized(mot)) {
    			retour = DictionarySearcher.allTheWordsFromNormalized(offsets, path);
    		}else { 
    			retour = DictionarySearcher.onlyTheOneWord(offsets, mot, path);
    		}
    		
    		//gestion du yaml
    		if(yaml && !retour.equals("le mot n'a pas ete trouve")) {  
    			System.out.println(DictionarySearcher.jsonToYaml(retour));
    		}else {
    			System.out.println(retour);
    		} 		
    	}
    } 
	
	
}
