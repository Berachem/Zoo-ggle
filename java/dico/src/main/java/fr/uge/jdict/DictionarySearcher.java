package fr.uge.jdict;

import java.io.File;
import java.io.FileNotFoundException;
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
				
				if(inWord || isNormalized) {
					enregistrement.append(lettre);
				}
				
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		
 
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
		long pireDesCas = Math.round(Math.log(numberOfCouple)/Math.log(2));//L'algorithme est en théorie O(Log(n)) mais pas exactement à l'execution
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
		File semiDico = new File("semi"+path+".lex");
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
	public static void allTheWordsFromNormalized(List<Long> offsets,String path){
		
		//preparation des fichier
		File semiDicoFile = new File("semi"+path+".lex");
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
			
			for(int i=0;i<numberOfCouple;i++) {
				
				//preparation des variables de lecture
				long wordBegin = semiDico.readLong();
				long wordEnd = semiDico.readLong();
				json.seek(wordBegin);
				StringBuilder print =  new StringBuilder();
				
				//lecture du mot
				long pointer = wordBegin;
				while((pointer = json.getFilePointer()) != wordEnd) {
					print.append(json.readChar());
				}
				
				//ecriture du mot
				System.out.println(print);
			}
			
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	
	/**
	 * Affiche l'enregistrement json du mot recherché (non normalisé)
	 * 
	 * @param offsets : le début/fin de l'enregistrement du semiDico
	 * @param word : le mot à chercher
	 */
	public static void onlyTheOneWord(List<Long> offsets, String word,String path) {
		
		//initialisation des fichiers
		File lexFile = new File("semi"+path+".lex");
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
				System.out.println("le mot n'a pas ete trouve");
				return;
			}
			
			StringBuilder print = new StringBuilder();
			long wordBegin = finalOffsets.get(0);
			long wordEnd = finalOffsets.get(1);
			
			jsonReader.seek(wordBegin);
			long pointer = wordBegin;
			while((pointer = jsonReader.getFilePointer()) != wordEnd) {
				print.append(jsonReader.readChar());
			}
			System.out.println(print);
			
			//fermeture des Reader
			jsonReader.close();
			lexReader.close();
			
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	
	public static void main( String[] args )
    {
    	String mot = "petit";
    	String path = "dico";
    	
    	List<Long> offsets = DictionarySearcher.getTheNormalizedWordOffset(mot, path);
    	if(offsets.isEmpty()) {
    		System.out.println("le mot n'a pas ete trouve");
    	}else {
    		if(DictionarySearcher.isNormalized(mot)) {
    			DictionarySearcher.allTheWordsFromNormalized(offsets, path);
    		}else {
    			DictionarySearcher.onlyTheOneWord(offsets, mot, path);
    		}
    	}
    } 
	
	
}
