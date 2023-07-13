package fr.uge;

import java.io.File;
import java.io.FileInputStream;
import java.nio.file.StandardCopyOption;

import org.apache.commons.compress.compressors.bzip2.BZip2CompressorInputStream;
import org.apache.commons.compress.utils.IOUtils;

public class test {

	
	
	
	public static void main(String[] args){
		try {
			BZip2CompressorInputStream input = new BZip2CompressorInputStream(new FileInputStream("C:\\Users\\Jlwis\\Desktop\\frwiktionary-20220601-pages-articles.xml.bz2"));
			File output = new File("uncompress.xml");
			DictionaryMaker.resetFile(output);
			System.out.println("fichier OK");
			
			java.nio.file.Files.copy(input, output.toPath(),StandardCopyOption.REPLACE_EXISTING);
			IOUtils.closeQuietly(input);
			
			
			System.out.println("fait.");
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

}
