package Dictionnaire.dico;

import java.io.FileInputStream;
import java.util.ArrayList;

import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamReader;
import javax.xml.stream.events.XMLEvent;

public class sauvegarde {
	String titre = null ;
    String nameSpace = null;
    String textTagContent = null;
    String page = null;
    ArrayList<String> listeDefinitionsExamples = new ArrayList<>();
    try {
        XMLInputFactory factory = XMLInputFactory.newInstance();
        XMLStreamReader reader = factory.createXMLStreamReader(new FileInputStream(xmlPath));
        while (reader.hasNext()) {
            int event = reader.next();
            // balise ouvrante page
            if (event == XMLEvent.START_ELEMENT && reader.getLocalName().equals("page")) {
                page = "";
                while (reader.hasNext()) {
                    event = reader.next();
                     titre = "";
                     
                    if (event == XMLEvent.START_ELEMENT && reader.getLocalName().equals("title")) { // balise ouvrante title
                        // récupération du titre
                    	 titre = reader.getElementText();
                         page += titre;
                        
                    } else if (event == XMLEvent.START_ELEMENT && reader.getLocalName().equals("ns")) { // balise ouvrante ns 
                    	nameSpace = reader.getElementText();

                    } else if (event == XMLEvent.START_ELEMENT && reader.getLocalName().equals("text")) { // balise ouvrante text
                         textTagContent = reader.getElementText();
                     
                         // récupération des définitions et exemples donc les lignes qui commencent par # ou #*
                        	String[] liste = textTagContent.split("\n") ;
                        	listeDefinitionsExamples = new ArrayList<>();
                            for(int i=0; i<liste.length;i++) {
                            	if ((liste[i].startsWith("#") || liste[i].startsWith("#*"))) {
                            		listeDefinitionsExamples.add(liste[i]);
                            	}
                            }
                            
                           page += textTagContent;
                       
                        

                    } else if (event == XMLEvent.END_ELEMENT && reader.getLocalName().equals("page")) { // balise fermante page
                        if (!page.contains("{{lang|fr}}") && nameSpace.equals("0")) { // si la page contient {{lang|fr}} et que le namespace est 0
                            //System.out.println(page);

                            // affichage du titre
                            System.out.println("MOT : "+titre+"\n\n");
                            // affichage des définitions et exemples
                            for (int i=0; i<listeDefinitionsExamples.size();i++) {
                            	System.out.println(listeDefinitionsExamples.get(i)+"\n");
                            }

                        }
                        break;
                    }
                }
            }
        }
    } catch (Exception e) {
        e.printStackTrace();
}}}
}
