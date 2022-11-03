package Dictionnaire.dico;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;



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
		boolean inAccolade = false;
		boolean pipe = false;
		boolean dontCopy = false;
		
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
        // ========================================================================================================
        
        
        try{
	        //constructor of File class having file as argument
	        File file=new File(xmlPath);
	        //creates a buffer reader input stream
	        BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(file), "UTF-8"));
	        System.out.println("file content: ");
	        
			// on crée les varaibles qui nous serviront pour la suite
			String langueCible = "fr";
	        String page = "";
	        String nameSpace = "";
	        String mot = "";
	        Boolean estMot = false;
	        Boolean estBonneLangue = false;
	        Boolean dansUnePage = false;
	        ArrayList<String> definitionsNom = new ArrayList<>();
	        ArrayList<String> definitionsVerbe = new ArrayList<>();

			// on crée les json
			String jsonEntete = "{" +"description : \"dictionnaire francais\","+ "created_on :"+ System.currentTimeMillis() +","+"language :"+"\""+langueCible+"\"";
			String jsonMot = "";

			
	        
	      
	        
	        String line="";
	        while((line=reader.readLine())!= null){
	        	if (line.contains("</page>")) {
	        		dansUnePage = false;
	        		
					
	        		if (estMot && estBonneLangue) {

						// on affiche le mot et ses définitions 
	        			System.out.println("\n\nMOT : "+ mot +"\n");
						System.out.println("nom : \n");
						definitionsNom.stream().forEach(s -> System.out.println(s)) ;
						System.out.println("verbe : \n");
						definitionsVerbe.stream().forEach(s -> System.out.println(s)) ;

						// on crée un json du mot
						jsonMot = "{" + "mot : " + mot + "," + "nom : " + definitionsNom + "," + "verbe : " + definitionsVerbe + "}";

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
	        			definitionsVerbe.add(line.replaceFirst("# ", ""));
	        		}
	        		else if(line.startsWith("# ")) { 
						definitionsNom.add(line.replaceFirst("#", ""));
	        		}
	        		
	        	}
	        	
	        	
	        	
	        }
	        
	        
	        reader.close();
	    }
        catch(Exception e){
        	e.printStackTrace();
        }
        
    }
}