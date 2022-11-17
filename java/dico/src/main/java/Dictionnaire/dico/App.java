package Dictionnaire.dico;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.io.RandomAccessFile;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.TreeSet;

public class App 
{
	
	/**
	 * Fonction qui récupère l'interieur d'une balise xml
	 * 
	 * @param line : la balise à décortiquer
	 * @return l'interieur de la balise
	 */
	public static String recupInterieurBalise(String line) {
		String retour = "";
		boolean interieur = false;
		for(int i=0;i<line.length();i++) {
			
			char lettre = line.charAt(i);
			
			if(lettre == '>') {
				interieur = true;
				continue;
			}

			if(lettre == '<' && interieur) {
				break;
			}
			if(interieur) {
				retour+=lettre;
			}
		}
		return retour;
	}
	
	
	/**
	 * Fonction qui nettoie les exemple du fichier xml
	 * 
	 * @param line : l'exemple à nettoyer
	 * @return l'exemple propre
	 */
	public static String cleanupExemple(String line) {
		String retour = "";
		boolean inAccolade = false;//indique si l'on est dans une accolade/crochet
		boolean pipe = false;	  //si il est à true alors on est derrière un | et il ne faut pas copier le contenu tant que l'on est dans une accolade/crochet
		boolean dontCopy = false; //si il est à true le caractère courant ne sera pas copié
		
		for(int i=0;i<line.length();i++) {
		
			char lettre = line.charAt(i);
			
			switch(lettre) {
				case ']' :
					inAccolade = false;
					pipe = false;
					dontCopy = true;
					break;
				case '}' :
					inAccolade = false;
					pipe =false;
					dontCopy = true;
					break;
				case '[' :
					inAccolade = true;
					dontCopy = true;
					break;
				case '{' :
					inAccolade = true;
					dontCopy = true;
					break;
				case '|' :
					pipe = true;
					dontCopy = true;
					break;
				case '#':
					pipe=true;
					dontCopy=true;
					break;
				case '\'':
					dontCopy=true;
					break;
					
			}
			
			if(!dontCopy){
				if(inAccolade && pipe){
					continue;
				}
				retour+=lettre;
			}
			dontCopy = false;
			
		}
		return retour;
		
		
		
	}
	
	/**
	 * Prend un mot et le normalise
	 * 
	 * @param mot : mot à nettoyer
	 * @return le mot en majuscule sans ses accents
	 */
	public static String normalise(String mot) {
		
		List<Character> accent  = List.of('À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', 'Ù', 'Ú', 'Û', 'Ü', 'Ý');
		List<Character> sansAccent = List.of('A', 'A', 'A', 'A', 'A', 'A', 'C', 'E', 'E', 'E', 'E', 'I', 'I', 'I', 'I', 'O', 'O', 'O', 'O', 'O', 'U', 'U', 'U', 'U', 'Y');
		String copie = mot.toUpperCase();
		for(int i=0; i<accent.size();i++){
			copie = copie.replace(accent.get(i),sansAccent.get(i));
		}
		return copie;
	}
	
	/**
	 * Fonction qui vide un fichier, si il existe
	 * 
	 * @param file : le fichier a vider
	 */
	public static void resetFile(File file) {
		if(file.exists()) {
			file.delete();
		}
		try {
			file.createNewFile();
		}catch(Exception e) {
			System.out.println("Error while creating file");
		}
	}
	
	/**
	 * Fonction qui ajoute une valeur au dicoSemiOffset
	 * 
	 * @param dicoSemiOffset : le dictionnaire complexe auquel on veut ajouter une valeur
	 * @param mot : le mot à ajouter
	 * @param beforeMot : l'offset du début du mot
	 * @param afterMot : l'offset de la fin du mot
	 */
	public static void addSemiOffset(TreeMap<String,TreeMap<String,String>> dicoSemiOffset,String mot,long beforeMot,long afterMot){
		
		String normalise = App.normalise(mot);
		System.out.println(normalise);
		
		if(dicoSemiOffset.containsKey(normalise)) {
			dicoSemiOffset.get(normalise).put(mot, beforeMot+" "+afterMot);
		}else {
			TreeMap<String,String> newValue = new TreeMap<>();
			newValue.put(mot, beforeMot+" "+afterMot);
			dicoSemiOffset.put(normalise, newValue);
		}
	}
	
	
	/**
	 * Fonction qui crée le dictionnaire des fréquences 
	 * 
	 * @return un HashMap<String,Integer> représentant le dictionnaire des fréquences
	 */
	public static HashMap<String,Integer> createDicoFreq(){
		HashMap<String,Integer> dicoFreq= new HashMap<>();
        dicoFreq.put("A", 0);
        dicoFreq.put("B", 0);
        dicoFreq.put("C", 0);
        dicoFreq.put("D", 0);
        dicoFreq.put("E", 0);
        dicoFreq.put("F", 0);
        dicoFreq.put("G", 0);
        dicoFreq.put("H", 0);
        dicoFreq.put("I", 0);
        dicoFreq.put("J", 0);
        dicoFreq.put("K", 0);
        dicoFreq.put("L", 0);
        dicoFreq.put("M", 0);
        dicoFreq.put("N", 0);
        dicoFreq.put("O", 0);
        dicoFreq.put("P", 0);
        dicoFreq.put("Q", 0);
        dicoFreq.put("R", 0);
        dicoFreq.put("S", 0);
        dicoFreq.put("T", 0);
        dicoFreq.put("U", 0);
        dicoFreq.put("V", 0);
        dicoFreq.put("W", 0);
        dicoFreq.put("X", 0);
        dicoFreq.put("Y", 0);
        dicoFreq.put("Z", 0);
        dicoFreq.put("*", 0); //pour représenter les 'qu'
        
        return dicoFreq;
	}
	
	/**
	 * Fonction qui verifie si un mot est composé que de lettre
	 * 
	 * @param word : le mot a verifier
	 * @return true si le mot est composé que de lettre false sinon
	 */
	public static boolean isAlpha(String word) {	
		
		for(int i=0;i<word.length();i++) {
			char c = word.charAt(i);
			if(!Character.isAlphabetic(c)) { //cette méthode prend en compte les accents (é == true)
				return false;
			}	
		}
		return true;
	}
	
	/**
	 * Fonction qui crée les différents fichiers demandés
	 */
	public static void makeDictionnaries() {
		// ===================A CHANGER EN FONCTION DE L'ENDROIT OU VOUS AVEZ MIS LE FICHIER XML===================
        String xmlPath = "C:\\Users\\Jlwis\\Desktop\\wiki-fr.xml"; // Path to the XML file

		// BERA : "C:\\Users\\berac\\Desktop\\wiki-fr.xml" 
		// JOSHUA : "C:\\Users\\Jlwis\\Desktop\\wiki-fr.xml"
		
        // ========================================================================================================
        
        //création  du dictionnaire pour les fréquences
        HashMap<String,Integer> dicoFreq = App.createDicoFreq();
        TreeMap<String,TreeMap<String,String>> dicoSemiOffsets = new TreeMap<>();

		// créer un fichier dico.json.txt en mode écriture
		File dicoJSON = new File("dico.json");
		App.resetFile(dicoJSON);

		//créationdu fichier txt de fréquence
		File dicoFrequence = new File("dicoFreq.txt");
		App.resetFile(dicoFrequence);
		
		//création du fichier d'entreDeux
		File semiDicoLex = new File("semiDico.lex");
		App.resetFile(semiDicoLex);
		
		//création du fichier dico.lex
		File dicoLex = new File("dico.lex");
		App.resetFile(dicoLex);
        
        try{
	        
        	
        	// ============= CREATION DES ENTREE SORTIES =============
        	//creation du buffer de lecture du xml
	        File file=new File(xmlPath);
	        BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(file), "UTF-8"));
	        
	        //creation du writer pour le json
	        RandomAccessFile writer = new RandomAccessFile(dicoJSON, "rw");
	        
	        //creation du writer pour le txt
	        FileWriter writerFreq = new FileWriter(dicoFrequence, Charset.forName("UTF-8"));
	        
	        //création du writer pour le fichier d'entre deux
	        RandomAccessFile writerSemiLex = new RandomAccessFile(semiDicoLex,"rw");
	        
	        //creation du writer pour le lex
	        RandomAccessFile writerLex = new RandomAccessFile(dicoLex,"rw");
	        
	        
	        // =======================================================
	        
	        
			// =============CHOIX DE LA LANGUE CIBLEE=================
			String langueCible = "fr"; // fr = francais, en = anglais, es = espagnol, de = allemand ...
			// =======================================================

			
			
			// ============= INITIALISATION DES VARIABLES ============ 
	        //creations des variables pour la lecture du fichier xml
			//String page = "";
	        String nameSpace = "";
	        String mot = "";
	        Boolean estMot = false;
	        Boolean estBonneLangue = false;
	        //Boolean dansUnePage = false;
	        ArrayList<String> definitionsNom = new ArrayList<>();
	        ArrayList<String> definitionsVerbe = new ArrayList<>();

			// on crée variables pour l'écriture du json
			String jsonEntete = "{" +"\"description\" : \"dictionnaire francais\","+ "\"created_on\" :\""+ System.currentTimeMillis() +"\","+"\"language\" :"+"\""+langueCible+"\"}";
			String jsonMot = "";

			// écriture de l'entete du fichier json en UTF-8
			writer.writeChars(jsonEntete+"\n");
			// =======================================================
			
			
			
			// ===== LECTURE ET ECRITURE DES DIFFERENTS FICHIERS =====
			long avancement = 0;
			String line="";
	        while((line=reader.readLine())!= null){
	        	
	        	
	        	//******** AJOUT DES MOTS AU DICTIONNAIRES ********
	        	if (line.contains("</page>")) {
	        		//dansUnePage = false;
	        		
	        		if (estMot && estBonneLangue) {
	        			
						//Actualisation du fichier json
						long beforeMot = writer.getFilePointer();
	        			jsonMot = "{" + "\"title\" : " + mot + "," + "\"definitions\":{\"nom\" : " + definitionsNom + "," + "\"verbe\" : " + definitionsVerbe + "}}";
						writer.writeChars(jsonMot+"\n");
						long afterMot = writer.getFilePointer();
						
						//stockage des offsets
						App.addSemiOffset(dicoSemiOffsets, mot, beforeMot, afterMot);
						
						//Actualisation des fréquence de lettre
						mot = App.normalise(mot);
						mot.replace("QU", "*");
		        		
		        		for(int i=0;i<mot.length();i++) {
		        			char lettre = mot.charAt(i);
		        			if(dicoFreq.containsKey(String.valueOf(lettre))){
		        				dicoFreq.merge(String.valueOf(lettre), 1, Integer::sum);
		        			}
		        		}
		        		
		        		//différents prints de debugs
		        		/*
	        			System.out.println("\n\nMOT : "+ mot +"\n");
						System.out.println("nom : \n");
						definitionsNom.stream().forEach(s -> System.out.println(s)) ;
						System.out.println("verbe : \n");
						definitionsVerbe.stream().forEach(s -> System.out.println(s)) ;
		        		System.out.println(dicoFreq);	
		        		System.out.println(dicoOffsets);
		        		*/	
		        		System.out.println(avancement);
	        			avancement++;
	        		}
	        		// remise à 0 des variable car on quitte une section <page>
	        		//page ="";
	        		nameSpace = "";
	        		mot = "";
	        		estMot= false;
	        		estBonneLangue = false;
	        		definitionsNom = new ArrayList<>();
	        		definitionsVerbe = new ArrayList<>();
	        		
	        		//passage à la ligne suivante (optimisation)
	        		continue;
	        	}
	        	
	        	
	        	//******** TRIAGE DES MOTS ********
	        		//on note que chaque ligne du fichier ne contient qu'une information, 
	        		//il n'est donc pas nécéssaire de faire tout les tests lorsque l'on trouve une des informations
	        		//De la vienne les continue à chaque if.
	        	
	        	
	        	/*
	        	if (line.contains("<page>")) {
	        		dansUnePage = true;
	        		continue;
	        	}
	        	page += line;
	        	*/
	        	
	        	if(line.contains("<title>")) {
	        		//title nous indique un mot donc on pousse le mot déja stocké et on reset la recherche
	        		mot = App.recupInterieurBalise(line);
	        		if(!App.isAlpha(mot)) {
	        			mot = "";
	        		}
	        		continue;
	        	}
	        	
	        	if(line.contains("<ns>")) {
	        		//si ns = 0 c'est un mot sinon c'est autre chose dont on ne veut pas
	        		nameSpace = App.recupInterieurBalise(line);
	        		if(nameSpace.equals("0") && mot != "") {
	        			estMot = true;
	        			continue;
	        		}
	        	}
	        	
	        	if(line.contains("{{langue|"+langueCible+"}}")) {
	        		//on ne veut pas récupérer des mots qui ne sont pas en francais
	        		estBonneLangue = true;
	        		continue;
	        	}
	        	
	        	//****** GESTION DES DEFINITIONS ******
	        	if(estBonneLangue && estMot){
					if (line.startsWith("# '")) {
	        			definitionsVerbe.add(App.cleanupExemple('"'+line.replaceFirst("# ", "").replaceFirst("</text>", "")+'"'));
	        		}
	        		else if(line.startsWith("# ")) { 
						definitionsNom.add(App.cleanupExemple('"'+line.replaceFirst("# ", "").replaceFirst("</text>", "")+'"'));
	        		}
	        		
	        	}
	        		
	        }
	        // =======================================================
	        


	        //ecriture du fichier des fréquences 
	        for(Map.Entry<String,Integer> entry : dicoFreq.entrySet()) {
	        	writerFreq.write(entry.getKey()+" "+String.valueOf(entry.getValue())+"\n");
	        }
	        //ecriture du semiOffsets et Offset en parrallele
	        ArrayList<Long> dicoOffsets = new ArrayList<>();
	        for(Map.Entry<String,TreeMap<String,String>> entry : dicoSemiOffsets.entrySet()) {
	        	
	        	Long before = writerSemiLex.getFilePointer();
	        	
	        	writerSemiLex.writeChars(entry.getKey()+":");
	        	 for(Map.Entry<String,String> deepEntry : entry.getValue().entrySet()) {
	        		String offsets[] = (deepEntry.getValue()).split(" ");;
	        		writerSemiLex.writeLong(Long.valueOf(offsets[0]));
	        		writerSemiLex.writeLong(Long.valueOf(offsets[1]));
	        	 }
	        	 
	        	 Long after = writerSemiLex.getFilePointer();
	        	 
	        	 writerLex.writeLong(before);
	        	 writerLex.writeLong(after);
	        }
	        
	        //fermeture des différents buffers
	        reader.close();
	        writer.close();
	        writerFreq.close();
	        writerLex.close();
	        writerSemiLex.close();
	        System.out.println("finito pipo");
	    }
        
        catch(Exception e){//catch car utilisation des bufferedReader/Writter
        	e.printStackTrace();
        }
        
    }
	
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
		//System.out.println(enregistrement);
		
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
		long pireDesCas = Math.round(Math.log(numberOfCouple)/Math.log(2))+10;//L'algorithme est en théorie O(Log(n)) mais pas exactement à l'execution
		long compteur = 0;
		
		try {
		
			//mise en place des premiers offsets
			if(isNormalized) {
				lexReader.seek((numberOfCouple/2)*coupleSize);
			}else {
				lexReader.seek(lexReader.getFilePointer()+((numberOfCouple/2)*coupleSize));
			}
			long middleWordBegin = lexReader.readLong();
			long middleWordEnd = lexReader.readLong();
			
			
			//boucle de recherche
			String readedWord="";
			while(compteur<pireDesCas && !(readedWord = App.readAword(wordReader, middleWordBegin, middleWordEnd,isNormalized)).equals(word)) {
				
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
					lexReader.seek(lexReader.getFilePointer() + ((numberOfCouple/2)+1)*coupleSize);
					middleWordBegin = lexReader.readLong();
					middleWordEnd = lexReader.readLong();
				}
				compteur ++;
				//System.out.println(compteur + "/" + pireDesCas);
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
	public static List<Long> getTheNormalizedWordOffset(String word) {
		
		//normalisation
		String normalizedWord = App.normalise(word);
		
		//initialisation des fichiers
		File semiDico = new File("semiDico.lex");
		File lexFile = new File("dico.lex");
		
		try {
			
			//initialisation des reader
			RandomAccessFile semiReader = new RandomAccessFile(semiDico,"rw");
			RandomAccessFile lexReader = new RandomAccessFile(lexFile,"rw");
			
			//variable utiles
			long coupleSize = 16; //un long fait 8 bits donc 2 long font 16 logiquement
			long lengthFichier = lexReader.length(); //je suppose qu'il me renvoie le nombre de bit
			long numberOfCouple = lengthFichier/coupleSize;
			
			//recuperation du resultat
			List<Long> retour = App.dichotomicSearch(normalizedWord, true, numberOfCouple, coupleSize, lexReader, semiReader);
			
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
	public static void allTheWordsFromNormalized(List<Long> offsets){
		
		//preparation des fichier
		File semiDicoFile = new File("semiDico.lex");
		File jsonFile = new File("dico.json");
		
		//preparation de divers variables
		long offsetBegin = offsets.get(0);
		long offsetEnd = offsets.get(1);
		
		try {
			//ouverture de fichier
			RandomAccessFile semiDico = new RandomAccessFile(semiDicoFile,"rw");
			RandomAccessFile json = new RandomAccessFile(jsonFile,"rw");
			
			//actualisation de la position
			App.readAword(semiDico, offsetBegin, offsetEnd, true);
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
	
	
	public static void onlyTheOneWord(List<Long> offsets, String word) {
		
		//initialisation des fichiers
		File lexFile = new File("semiDico.lex");
		File jsonFile = new File("dico.json");
		
		try {
			
			//initialisation des RandomAccessFile
			RandomAccessFile lexReader = new RandomAccessFile(lexFile,"rw");
			RandomAccessFile jsonReader = new RandomAccessFile(jsonFile,"rw");
			
			//initialisation des variables pour la recherche dichotomique
			long offsetBegin = offsets.get(0);
			long offsetEnd = offsets.get(1);
			App.readAword(lexReader, offsetBegin, offsetEnd, true);
			long position = lexReader.getFilePointer();
			long length = offsetEnd - offsetBegin - (position - offsetBegin);
			long coupleSize = 16;
			long numberOfCouple = length/coupleSize;
			
			//recuperation et affichage des resultats
			List<Long> finalOffsets = App.dichotomicSearch(word, false, numberOfCouple, coupleSize, lexReader, jsonReader);

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
    	//App.makeDictionnaries();
    	String mot = "PATATE";
    	
    	List<Long> offsets = App.getTheNormalizedWordOffset(mot);
    	if(offsets.isEmpty()) {
    		System.out.println("le mot n'a pas ete trouve");
    	}else {
    		if(App.isNormalized(mot)) {
    			App.allTheWordsFromNormalized(offsets);
    		}else {
    			App.onlyTheOneWord(offsets, mot);
    		}
    	}
    	
    	
    	
    } 
}