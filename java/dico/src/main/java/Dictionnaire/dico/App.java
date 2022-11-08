package Dictionnaire.dico;

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
	 * Prend un mot, en enleve les accents et le met en minuscule
	 * 
	 * @param mot : mot à nettoyer
	 * @return le mot en minuscule sans ses accents
	 */
	public static String cleanupWord(String mot) {
		
		List<Character> accent  = List.of('À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', 'Ù', 'Ú', 'Û', 'Ü', 'Ý', 'à', 'á', 'â', 'ã', 'ä', 'å', 'ç', 'è', 'é', 'ê', 'ë', 'ì', 'í', 'î', 'ï', 'ð', 'ò', 'ó', 'ô', 'õ', 'ö', 'ù', 'ú', 'û', 'ü', 'ý', 'ÿ');
		List<Character> sansAccent = List.of('A', 'A', 'A', 'A', 'A', 'A', 'C', 'E', 'E', 'E', 'E', 'I', 'I', 'I', 'I', 'O', 'O', 'O', 'O', 'O', 'U', 'U', 'U', 'U', 'Y', 'a', 'a', 'a', 'a', 'a', 'a', 'c', 'e', 'e', 'e', 'e', 'i', 'i', 'i', 'i', 'o', 'o', 'o', 'o', 'o', 'o', 'u', 'u', 'u', 'u', 'y', 'y');
		for(int i=0; i<accent.size();i++){
			mot.replace(accent.get(i),sansAccent.get(i));
		}
		mot.toUpperCase();
		mot.replace("qu", "*");
		
		return mot;
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
	
    public static void main( String[] args )
    {
        // ===================A CHANGER EN FONCTION DE L'ENDROIT OU VOUS AVEZ MIS LE FICHIER XML===================
        String xmlPath = "C:\\Users\\berac\\Desktop\\wiki-fr.xml"; // Path to the XML file

		// BERA : "C:\\Users\\berac\\Desktop\\wiki-fr.xml" 
		// JOSHUA : "C:\\Users\\Jlwis\\Desktop\\wiki-fr.xml"
		
        // ========================================================================================================
        
        //création  du dictionnaire pour les fréquences
        HashMap<String,Integer> dicoFreq = App.createDicoFreq();
        TreeMap<String,String> dicoOffsets = new TreeMap<>();

		// créer un fichier dico.json.txt en mode écriture
		File dicoJSON = new File("dico.json.txt");
		App.resetFile(dicoJSON);

		//créationdu fichier txt de fréquence
		File dicoFrequence = new File("dicoFreq.txt");
		App.resetFile(dicoFrequence);
		
		//création du fichier dico.lex
		File dicoLex = new File("dico.lex");
		App.resetFile(dicoLex);
        
        try{
	        
        	
        	// ============= CREATION DES ENTREE SORTIES =============
        	//creation du buffer de lecture du xml
	        File file=new File(xmlPath);
	        BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(file), "UTF-8"));
	        System.out.println("file content: ");
	        
	        //creation du writer pour le json
	        RandomAccessFile writer = new RandomAccessFile(dicoJSON, "rw");
	        
	        //creation du writer pour le txt
	        FileWriter writerFreq = new FileWriter(dicoFrequence, Charset.forName("UTF-8"));
	        
	        //creation du writer pour le lex
	        FileWriter writerLex = new FileWriter(dicoLex);
	        
	        
	        // =======================================================
	        
	        
			// =============CHOIX DE LA LANGUE CIBLEE=================
			String langueCible = "fr"; // fr = francais, en = anglais, es = espagnol, de = allemand ...
			// =======================================================

			
			
			// ============= INITIALISATION DES VARIABLES ============ 
	        //creations des variables pour la lecture du fichier xml
			String page = "";
	        String nameSpace = "";
	        String mot = "";
	        Boolean estMot = false;
	        Boolean estBonneLangue = false;
	        Boolean dansUnePage = false;
	        ArrayList<String> definitionsNom = new ArrayList<>();
	        ArrayList<String> definitionsVerbe = new ArrayList<>();

			// on crée variables pour l'écriture du json
			String jsonEntete = "{" +"\"description\" : \"dictionnaire francais\","+ "\"created_on\" :\""+ System.currentTimeMillis() +"\","+"\"language\" :"+"\""+langueCible+"\"}";
			String jsonMot = "";

			// écriture de l'entete du fichier json en UTF-8
			writer.writeChars(jsonEntete+"\n");
			// =======================================================
			
			
			
			// ===== LECTURE ET ECRITURE DES DIFFERENTS FICHIERS =====
	       
			int avancement = 0 ;
			String line="";
	        while((line=reader.readLine())!= null){
	        	
	        	
	        	//******** AJOUT DES MOTS AU DICTIONNAIRES ********
	        	if (line.contains("</page>")) {
	        		dansUnePage = false;
	        		
	        		if (estMot && estBonneLangue) {

	        			
	        			
						//Actualisation du fichier json
						long before = writer.getFilePointer();
	        			jsonMot = "{" + "\"title\" : " + mot + "," + "\"definitions\":{\"nom\" : " + definitionsNom + "," + "\"verbe\" : " + definitionsVerbe + "}}";
						writer.writeChars(jsonMot+"\n");
						long after = writer.getFilePointer();
						
						//stockage des offsets
						dicoOffsets.put(mot, before+" "+after+" ");
						
						
						//Actualisation des fréquence de lettre
						mot = App.cleanupWord(mot); 
		        		
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
	        		page ="";
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
	        	
	        	
	        	
	        	if (line.contains("<page>")) {
	        		dansUnePage = true;
	        		continue;
	        	}
	        	page += line;
	        	
	        	if(line.contains("<title>")) {
	        		//title nous indique un mot donc on pousse le mot déja stocké et on reset la recherche
	        		mot = App.recupInterieurBalise(line);
	        		continue;
	        	}
	        	
	        	if(line.contains("<ns>")) {
	        		//si ns = 0 c'est un mot sinon c'est autre chose dont on ne veut pas
	        		nameSpace = App.recupInterieurBalise(line);
	        		if(nameSpace.equals("0")) {
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
	        for(Map.Entry<String,String> entry : dicoOffsets.entrySet()) {
	        	writerLex.write(entry.getValue());
	        }
	        
	        
	        //fermeture des différents buffers
	        reader.close();
	        writer.close();
	        writerFreq.close();
	        writerLex.close();
	        System.out.println("finito pipo");
	    }
        
        catch(Exception e){//catch car utilisation des bufferedReader/Writter
        	e.printStackTrace();
        }
        
    }
}