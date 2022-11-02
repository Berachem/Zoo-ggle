package Dictionnaire.dico;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
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
			
			if(interieur) {
				retour+=lettre;
			}
			
			if(lettre == '<') {
				break;
			}
		}
		return retour;
	}
	
    public static void main( String[] args )
    {
        // ===================A CHANGER EN FONCTION DE L'ENDROIT OU VOUS AVEZ MIS LE FICHIER XML===================
        String xmlPath = "C:\\Users\\Jlwis\\Desktop\\wiki-fr.xml"; // Path to the XML file
        // ========================================================================================================
        
        
        try{
	        //constructor of File class having file as argument
	        File file=new File(xmlPath);
	        //creates a buffer reader input stream
	        BufferedReader reader = new BufferedReader(new FileReader(file));
	        System.out.println("file content: ");
	        
	        
	        boolean estFR = false;
	        boolean estMot = false;
	        String mot = "";
	        ArrayList<String> definitions = new ArrayList<>();
	        
	        boolean uneFois = false; //pour tester
	        
	        String line="";
	        while((line=reader.readLine())!= null){
	        	
	        	if(line.contains("<title>")) {
	        	//title nous indique un mot donc on pousse le mot déja stocké et on reset la recherche
	        		
	        		
	        		/*
	        		 * Insertion dans un txt
	        		 */
	        		
	        		if(uneFois) {
	        			System.out.println(mot);
	        			System.out.println(definitions);
	        			break;
	        		}
	        		
	        		estFR = false;
	        		estMot = false;
	        		definitions.clear();
	        		
	        		
	        		
	        		uneFois = true;
	        		
	        		
	        		mot = App.recupInterieurBalise(line);
	        		continue;
	        	}
	        	
	        	if(line.contains("<ns>")) {
	        	//si ns = 0 c'est un mot sinon c'est autre chose dont on en veut pas
	        		String nombre = App.recupInterieurBalise(line);
	        		if(nombre.equals("0")) {
	        			estMot = true;
	        			continue;
	        		}
	        	}
	        	
	        	if(line.contains("{{langue|fr}")) {
	        	//on ne veut pas récupérer des mots qui ne sont pas en francais
	        		estFR = true;
	        		continue;
	        	}
	        	
	        	if(estFR && estMot){
	        		if(line.contains("# ")) { 
	        		//l'espace est important pour ne pas confondre avec les exemples (#*) ou autre (## par exemple)
	        			
	        			/*
	        			 * cleanup de line
	        			 */
	        			
	        			definitions.add(line);
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