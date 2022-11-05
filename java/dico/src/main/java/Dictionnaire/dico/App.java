package Dictionnaire.dico;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;



public class App 
{
	
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
	
    public static void main( String[] args )
    {
        // ===================A CHANGER EN FONCTION DE L'ENDROIT OU VOUS AVEZ MIS LE FICHIER XML===================
        String xmlPath = "C:\\Users\\Jlwis\\Desktop\\wiki-fr.xml"; // Path to the XML file

		// JOSHUA : "C:\\Users\\Jlwis\\Desktop\\wiki-fr.xml"
		// BERA : "C:\\Users\\berac\\Desktop\\wiki-fr.xml"
        // ========================================================================================================
        
        //création  du dictionnaire pour les fréquences
        HashMap<String,Integer> dicoFreq= new HashMap<>();
        dicoFreq.put("a", 0);
        dicoFreq.put("b", 0);
        dicoFreq.put("c", 0);
        dicoFreq.put("d", 0);
        dicoFreq.put("e", 0);
        dicoFreq.put("f", 0);
        dicoFreq.put("g", 0);
        dicoFreq.put("h", 0);
        dicoFreq.put("i", 0);
        dicoFreq.put("j", 0);
        dicoFreq.put("k", 0);
        dicoFreq.put("l", 0);
        dicoFreq.put("m", 0);
        dicoFreq.put("n", 0);
        dicoFreq.put("o", 0);
        dicoFreq.put("p", 0);
        dicoFreq.put("q", 0);
        dicoFreq.put("r", 0);
        dicoFreq.put("s", 0);
        dicoFreq.put("t", 0);
        dicoFreq.put("u", 0);
        dicoFreq.put("v", 0);
        dicoFreq.put("w", 0);
        dicoFreq.put("x", 0);
        dicoFreq.put("y", 0);
        dicoFreq.put("z", 0);
        

		// créer un fichier dico.json.txt en mode écriture
		File dicoJSON = new File("dico.json.txt");
		if(dicoJSON.exists()) {
			dicoJSON.delete();
		}
		try {
			dicoJSON.createNewFile();
		}catch(Exception e) {
			System.out.println("Error while creating file");
		}

		//créationdu fichier txt de fréquence
		File dicoFrequence = new File("dicoFreq.txt");
		if(dicoFrequence.exists()) {
			dicoFrequence.delete();
		}
		try {
			dicoFrequence.createNewFile();
		}catch(Exception e) {
			System.out.println("Error while creating file");
		}

        
        try{
	        
        	//creation du buffer de lecture du xml
	        File file=new File(xmlPath);
	        BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(file), "UTF-8"));
	        System.out.println("file content: ");
	        
	        //creation du writer pour le json
	        FileWriter writer = new FileWriter(dicoJSON, Charset.forName("UTF-8"));
	        
	        //creation du writer pour le txt
	        FileWriter writerFreq = new FileWriter(dicoFrequence, Charset.forName("UTF-8"));
	        
	        
			// =============CHOIX DE LA LANGUE CIBLEE=================
			String langueCible = "fr"; // fr = francais, en = anglais, es = espagnol, de = allemand ...
			// =======================================================

			// on crée les varaibles qui nous serviront pour la suite
	        String page = "";
	        String nameSpace = "";
	        String mot = "";
	        Boolean estMot = false;
	        Boolean estBonneLangue = false;
	        Boolean dansUnePage = false;
	        ArrayList<String> definitionsNom = new ArrayList<>();
	        ArrayList<String> definitionsVerbe = new ArrayList<>();

			// on crée les json
			String jsonEntete = "{" +"\"description\" : \"dictionnaire francais\","+ "\"created_on\" :\""+ System.currentTimeMillis() +"\","+"\"language\" :"+"\""+langueCible+"\"}";
			String jsonMot = "";

			
	        
			// écris l'entete du json avec UTF-8
			writer.write(jsonEntete+"\n");

	        String line="";
	        while((line=reader.readLine())!= null){
	        	if (line.contains("</page>")) {
	        		dansUnePage = false;
	        		
					
	        		if (estMot && estBonneLangue) {

						// on affiche le mot et ses définitions 
	        			System.out.println("\n\nMOT : "+ mot +"\n");
						//System.out.println("nom : \n");
						//definitionsNom.stream().forEach(s -> System.out.println(s)) ;
						//System.out.println("verbe : \n");
						//definitionsVerbe.stream().forEach(s -> System.out.println(s)) ;

						// on crée un json du mot
						jsonMot = "{" + "\"title\" : " + mot + "," + "\"definitions\":{\"nom\" : " + definitionsNom + "," + "\"verbe\" : " + definitionsVerbe + "}}";

						// append le mot dans le json avec UTF-8
						writer.write(jsonMot+"\n");
						
						
						
						//gestion des fréquences
						
							//on vire les accents pour simplifier 
		        		List<Character> accent  = List.of('À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', 'Ù', 'Ú', 'Û', 'Ü', 'Ý', 'à', 'á', 'â', 'ã', 'ä', 'å', 'ç', 'è', 'é', 'ê', 'ë', 'ì', 'í', 'î', 'ï', 'ð', 'ò', 'ó', 'ô', 'õ', 'ö', 'ù', 'ú', 'û', 'ü', 'ý', 'ÿ');
		        		List<Character> sansAccent = List.of('A', 'A', 'A', 'A', 'A', 'A', 'C', 'E', 'E', 'E', 'E', 'I', 'I', 'I', 'I', 'O', 'O', 'O', 'O', 'O', 'U', 'U', 'U', 'U', 'Y', 'a', 'a', 'a', 'a', 'a', 'a', 'c', 'e', 'e', 'e', 'e', 'i', 'i', 'i', 'i', 'o', 'o', 'o', 'o', 'o', 'o', 'u', 'u', 'u', 'u', 'y', 'y');
		        		for(int i=0; i<accent.size();i++){
		        			mot.replace(accent.get(i),sansAccent.get(i));
		        		}
		        			//mise en minuscule
		        		mot.toLowerCase();
		        		for(int i=0;i<mot.length();i++) {
		        			char lettre = mot.charAt(i);
		        			if(dicoFreq.containsKey(String.valueOf(lettre))){
		        				dicoFreq.merge(String.valueOf(lettre), 1, Integer::sum);
		        			}
		        		}
		        		System.out.println(dicoFreq);
						
						
						
	        		}
	        		
	        		
	        		
	        		
	        		
	        		
	        		
	        		// remet à 0 les variable car on quitte une section <page>
	        		page ="";
	        		nameSpace = "";
	        		mot = "";
	        		estMot= false;
	        		estBonneLangue = false;
	        		definitionsNom = new ArrayList<>();
	        		definitionsVerbe = new ArrayList<>();
	        		
	        	
	        		
	        		continue;
	        	}
	        	if (line.contains("<page>")) {
	        		dansUnePage = true;
	        		
	        	}
	        	page += line;
	        	
	        	if(line.contains("<title>")) {
	        		//title nous indique un mot donc on pousse le mot déja stocké et on reset la recherche
	        		mot = App.recupInterieurBalise(line);
	        		continue;
	        	}
	        	
	        	if(line.contains("<ns>")) {
	        		//si ns = 0 c'est un mot sinon c'est autre chose dont on en veut pas
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
	        	
	        	if(estBonneLangue && estMot){
					if (line.startsWith("# '")) {
	        			definitionsVerbe.add(App.cleanupExemple('"'+line.replaceFirst("# ", "").replaceFirst("</text>", "")+'"'));
	        		}
	        		else if(line.startsWith("# ")) { 
						definitionsNom.add(App.cleanupExemple('"'+line.replaceFirst("# ", "").replaceFirst("</text>", "")+'"'));
	        		}
	        		
	        	}
	        	
	        	
	        	
	        }
	        
	        for(Map.Entry<String,Integer> entry : dicoFreq.entrySet()) {
	        	writerFreq.write(entry.getKey()+" "+String.valueOf(entry.getValue())+"\n");
	        } 
	        //fermeture des différents buffers
	        reader.close();
	        writer.close();
	        writerFreq.close();
	    }
        catch(Exception e){
        	e.printStackTrace();
        }
        
    }
}