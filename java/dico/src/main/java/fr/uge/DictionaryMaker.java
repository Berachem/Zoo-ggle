package fr.uge;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.io.RandomAccessFile;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

public class DictionaryMaker 
{
	
	/**
	 * Fonction qui récupère l'interieur d'une balise xml
	 * 
	 * @param line : la balise à décortiquer
	 * @return l'interieur de la balise
	 */
	public static String recupInsideBeacon(String line) {
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
	public static String normalize(String mot) {
		
		List<Character> accent  = List.of('À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', 'Ù', 'Ú', 'Û', 'Ü', 'Ý');
		List<Character> sansAccent = List.of('A', 'A', 'A', 'A', 'A', 'A', 'C', 'E', 'E', 'E', 'E', 'I', 'I', 'I', 'I', 'O', 'O', 'O', 'O', 'O', 'U', 'U', 'U', 'U', 'Y');
		String copie = mot.toUpperCase();
		for(int i=0; i<accent.size();i++){
			copie = copie.replace(accent.get(i),sansAccent.get(i));
		}
		copie = copie.replace("Œ", "OE");
		
		for(int i=0;i<copie.length();i++) {//il reste des mots qui sont composé de lettre que non francaise (ʻOKINA) que nous ne pouvons donc pas écrire.
			char c = copie.charAt(i);
			if(c<'A' || c>'Z') {
				return "";
			}
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
		
		String normalise = DictionaryMaker.normalize(mot);
		
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
	public static void makeDictionnaries(String path,String lang,String returnName) {
        
        //création  du dictionnaire pour les fréquences
        HashMap<String,Integer> dicoFreq = DictionaryMaker.createDicoFreq();
        TreeMap<String,TreeMap<String,String>> dicoSemiOffsets = new TreeMap<>();

		// créer un fichier dico.json.txt en mode écriture
		File dicoJSON = new File(returnName+".json");
		DictionaryMaker.resetFile(dicoJSON);

		//créationdu fichier txt de fréquence
		File dicoFrequence = new File(returnName+"Freq.txt");
		DictionaryMaker.resetFile(dicoFrequence);
		
		//création du fichier d'entreDeux
		File semiDicoLex = new File(returnName+"semi.lex");
		DictionaryMaker.resetFile(semiDicoLex);
		
		//création du fichier dico.lex
		File dicoLex = new File(returnName+".lex");
		DictionaryMaker.resetFile(dicoLex);
        
        try{
	        
        	
        	// ============= CREATION DES ENTREE SORTIES =============
        	//creation du buffer de lecture du xml
	        File file=new File(path);
	        BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(file), "UTF-8"));
	        
	        //creation du writer pour le json
	        RandomAccessFile writerJson = new RandomAccessFile(dicoJSON, "rw");
	        
	        //creation du writer pour le txt
	        FileWriter writerFreq = new FileWriter(dicoFrequence, Charset.forName("UTF-8"));
	        
	        //création du writer pour le fichier d'entre deux
	        RandomAccessFile writerSemiLex = new RandomAccessFile(semiDicoLex,"rw");
	        
	        //creation du writer pour le lex
	        RandomAccessFile writerLex = new RandomAccessFile(dicoLex,"rw");
	        
	        
	        // =======================================================
	        
	        
			// =============CHOIX DE LA LANGUE CIBLEE=================
			String langueCible = lang; // fr = francais, en = anglais, es = espagnol, de = allemand ...
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
			writerJson.writeChars(jsonEntete+"\n");
			// =======================================================
			
			
			
			// ===== LECTURE ET ECRITURE DES DIFFERENTS FICHIERS =====
			long avancement = 0;
			String line="";
	        while((line=reader.readLine())!= null){
	        	
	        	
	        	//******** AJOUT DES MOTS AU DICTIONNAIRES ********
	        	if (line.contains("</page>")) {
	        		//dansUnePage = false;
	        		
	        		if (estMot && estBonneLangue && !(DictionaryMaker.normalize(mot)).equals("")){
	        			
						//Actualisation du fichier json
						long beforeMot = writerJson.getFilePointer();
	        			jsonMot = "{" + "\"title\" : \"" + mot + "\"," + "\"definitions\":{\"nom\" : " + definitionsNom + "," + "\"verbe\" : " + definitionsVerbe + "}}";
						writerJson.writeChars(jsonMot+"\n");
						long afterMot = writerJson.getFilePointer();
						//System.out.println(beforeMot+" "+afterMot);
						
						//stockage des offsets
						DictionaryMaker.addSemiOffset(dicoSemiOffsets, mot, beforeMot, afterMot);
						
						//Actualisation des fréquence de lettre
						mot = DictionaryMaker.normalize(mot);
						mot = mot.replace("QU", "*");
		        		
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
		        		
		        		System.out.println(avancement+" mot créés");
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
	        		//De la vienne les 'continue' à chaque if.
	        	
	        	
	        	/*
	        	if (line.contains("<page>")) {
	        		dansUnePage = true;
	        		continue;
	        	}
	        	page += line;
	        	*/
	        	
	        	if(line.contains("<title>")) {
	        		//title nous indique un mot donc on pousse le mot déja stocké et on reset la recherche
	        		mot = DictionaryMaker.recupInsideBeacon(line);
	        		if(!DictionaryMaker.isAlpha(mot)) {
	        			mot = "";
	        		}
	        		continue;
	        	}
	        	
	        	if(line.contains("<ns>")) {
	        		//si ns = 0 c'est un mot sinon c'est autre chose dont on ne veut pas
	        		nameSpace = DictionaryMaker.recupInsideBeacon(line);
	        		if(nameSpace.equals("0") && mot != "") {
	        			estMot = true;
	        			continue;
	        		}
	        	}
	        	
	        	if(line.contains("{{langue|"+langueCible+"}}")) {
	        		//on ne veut pas récupérer des mots qui ne sont pas dans la langue ciblée
	        		estBonneLangue = true;
	        		continue;
	        	}
	        	
	        	//****** GESTION DES DEFINITIONS ******
	        	if(estBonneLangue && estMot){
					if (line.startsWith("# '")) {
	        			definitionsVerbe.add('"'+line.replaceFirst("# ", " ").replaceFirst("</text>", "")+'"');
	        		}
	        		else if(line.startsWith("# ")) { 
						definitionsNom.add('"'+line.replaceFirst("# ", " ").replaceFirst("</text>", "")+'"');
	        		}
	        		
	        	}
	        		
	        }
	        // =======================================================
	        


	        //ecriture du fichier des fréquences (en %)
	        long totalFreq = 0 ;
	        for(Map.Entry<String,Integer> entry : dicoFreq.entrySet()) {
	        	totalFreq+=entry.getValue();
	        }
	        for(Map.Entry<String,Integer> entry : dicoFreq.entrySet()) {
	        	writerFreq.write(entry.getKey()+" "+String.valueOf(Math.round(((double)entry.getValue()/(double)totalFreq)*100000))+"\n");
	        }
	        
	        //ecriture du semiOffsets et Offset en parrallele
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
	        writerJson.close();
	        writerFreq.close();
	        writerLex.close();
	        writerSemiLex.close();
	        System.out.println("Les fichiers ont bien été créés");
	    }
        
        catch(Exception e){//catch car utilisation des bufferedReader/Writter
        	e.printStackTrace();
        }
        
    }
	
	
	 /*
	  * Main 
	  * @param: args[0] = fichier xml à traiter
	  * @param: args[1] = langue cible
	  * @param: args[2] = fichier de sauvegarde
	  */
    public static void main( String[] args )
    
    	//java -classpath "Zoo-ggle\java\dico\target\classes" fr.uge.jdict.DictionaryMaker XML LANG SORTIE
    
    	//java -classpath "Zoo-ggle\java\dico\target\classes" fr.uge.jdict.DictionaryMake "C:\Users\Jlwis\Desktop\wiki-fr.xml" fr dico
    
	    // ===================A CHANGER EN FONCTION DE L'ENDROIT OU VOUS AVEZ MIS LE FICHIER XML===================
		// BERA : "C:\\Users\\berac\\Desktop\\wiki-fr.xml" 
		// JOSHUA : "C:\\Users\\Jlwis\\Desktop\\wiki-fr.xml"
        // ========================================================================================================
    {
		String fichierSauvegarde;
		String langueCible;
		String fichierXML;
		
		if (args.length != 3) {
			//System.out.println("Il faut 3 parametres : chemin vers le xml, la langue, le nom du fichier de stockage (sans extension)");
			//return;
			fichierXML = "C:\\Users\\Jlwis\\Desktop\\wiki-fr.xml"; //args[0];
			langueCible ="fr"; //args[1];
			fichierSauvegarde ="dico"; //args[3];
		}
		else{
			//on récupère les arguments
			fichierXML = args[0];
			langueCible = args[1];
			fichierSauvegarde = args[2];
		}
		
		
    	DictionaryMaker.makeDictionnaries(fichierXML,langueCible,fichierSauvegarde);
    } 
}