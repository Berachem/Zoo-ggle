package Dictionnaire.dico;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;

public class Test {

	public static void main(String[] args) {
		String xmlPath = "C:\\Users\\Jlwis\\Desktop\\wiki-fr.xml"; // Path to the XML file

		// BERA : "C:\\Users\\berac\\Desktop\\wiki-fr.xml"
        // ========================================================================================================
        
        
        try{
	        //constructor of File class having file as argument
	        File file=new File(xmlPath);
	        //creates a buffer reader input stream
	        BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(file), "UTF-8"));
	        
	        String line = "";
	        int compteur = 0;
	        while((line=reader.readLine())!= null){
	        	
	        	System.out.println(line);
	        	compteur++;
	        	
	        	if(compteur==1000){
	        		break;
	        	}
	        	
	        }
        }catch(Exception e){
        	e.printStackTrace();
        }
		

	}
	
	

}
