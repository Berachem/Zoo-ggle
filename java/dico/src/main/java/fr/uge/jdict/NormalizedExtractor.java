package fr.uge.jdict;

import java.io.File;
import java.io.RandomAccessFile;
import java.util.List;

public class NormalizedExtractor {

	/**
	 * Permet de trouver le nombre d'occurence d'un mot dans une String
	 * 
	 * @param line : la ligne dans laquelle on recherche
	 * @param word : le mot a rechercher
	 * @return
	 */
	public static int findOccurences(String line,String word) {
		int indexStart = 0;
		int taille = word.length();
		int compteur = 0;
		int indexTrouve;
		while(indexStart<line.length() && (indexTrouve = line.indexOf(word,indexStart)) != -1) {
			compteur++;
			indexStart=taille+indexTrouve;
		}
		return compteur;
	}

	
	/**
	 * Renvoie tout les mots du dictionnaire sous forme normalisée, dans la sortie courante
	 * 
	 * @param path le chemin vers le fichier
	 */
	public static void casualextractor(String path){
		//création des fichiers
		File semiFile = new File(path+"semi.lex");
		File lexFile = new File(path+".lex");
		
		
		try {
			//ouverture des fichier
			RandomAccessFile semi = new RandomAccessFile(semiFile,"rw");
			RandomAccessFile lex = new RandomAccessFile(lexFile, "rw");
			
			//sortie
			long EOF = lex.length();
			long pointer;
			while((pointer = lex.getFilePointer())!=EOF) {
				long start = lex.readLong();
				long end = lex.readLong();
				System.out.println(DictionarySearcher.readAword(semi, start, end, true).replace("QU", "*"));
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * Renvoie tout les mots normalisés du dictionnaire qui correspondent aux paramètres dans la sortie courantes
	 * Les paramètres acceptés : "nom propre" , "nom", "verbe", "adjectif"
	 * 
	 * @param path : le chemin vers le fichier
	 * @param param : la liste des parametres a verifier
	 */
	public static void parameterExtractor(String path, String param[]) {
		
		//gestion des parametres
		boolean verb = false;
		boolean properName = false;
		boolean name = false;
		boolean adjectif = false;
		
		for(String p : param) {
			if(p.equals("nom propre")) {
				properName=true;
			}else if(p.equals("verbe")) {
				verb=true;
			}else if(p.equals("nom")) {
				name=true;
			}else if(p.equals("adjectif")){
				adjectif=true;
			}
		}
		
		
		//création des fichiers
		File semiFile = new File(path+"semi.lex");
		File lexFile = new File(path+".lex");
		
		try {
			//ouverture des fichier
			RandomAccessFile semi = new RandomAccessFile(semiFile,"rw");
			RandomAccessFile lex = new RandomAccessFile(lexFile, "rw");
			
			//tests et sortie
			long EOF = lex.length();
			String word = "";
			String def = "";
			long pointer;
			int nombreDef;
			while((pointer = lex.getFilePointer())!=EOF) {
				long start = lex.readLong();
				long end = lex.readLong();
				word = DictionarySearcher.readAword(semi, start, end, true).replace("QU", "*");
				def = DictionarySearcher.allTheWordsFromNormalized(List.of(start,end), path);
				
				nombreDef = NormalizedExtractor.findOccurences(def, "title");
				
				if(properName) {
					if(def.contains("Nom de famille") || def.contains("prénom")) {
						System.out.println(word);
						continue;
					}
				}  
				if(verb) {
					if(NormalizedExtractor.findOccurences(def, "\"verbe\" : []")<nombreDef) {
						System.out.println(word);
						continue;
					}	
				}
				if(name) {
					if(NormalizedExtractor.findOccurences(def, "\"nom\" : []")<nombreDef) {
						System.out.println(word);
						continue;
					}	
				}
				if(adjectif) {
					if(def.contains("Qui est") || def.contains("Dont")) {
						System.out.println(word);
						continue;
					}
				}
				
				
				
			}
			
			System.out.println("finitio pipo");
			
		} catch (Exception e) {
			e.printStackTrace();
		}	
	}
	
	public static void main(String[] args) {
		
		if(args.length==0) {
			System.out.println("Nombres d'arguments incorrect : il manque le nom du fichier et les paramètres (optionnel)");
			return;
		}
		if(args.length>2) {
			System.out.println("Trop d'arguments : il ne faut que le nom du fichier et les paramètres (optionnel)");
			return;
		}
		
		if(args.length==1) {
			String path = args[0];
			NormalizedExtractor.casualextractor(path);
			return;
		}
		
		if(args.length==2) {
			String path = args[0];
			String param[] = args[1].split(",");
			NormalizedExtractor.parameterExtractor(path, param);
			return;
		}
		
		
		//String path = "dico";
		//String param[] = {"adjectif"};
		//NormalizedExtractor.parameterExtractor(path, param);
	}
}
