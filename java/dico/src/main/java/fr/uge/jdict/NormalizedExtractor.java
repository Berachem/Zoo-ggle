package fr.uge.jdict;

import java.io.File;
import java.io.RandomAccessFile;

public class NormalizedExtractor {

	public static void main(String[] args) {
		
		if(args.length!=1) {
			System.out.println("Il ne faut qu'un unique argument : le chmein vers le fichier de lecture");
			return;
		}
		String path = args[0];
		//String path ="dico";
		
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
			
			System.out.println("finitio pipo");
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

}
