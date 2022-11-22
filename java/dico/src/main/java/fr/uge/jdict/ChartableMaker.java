package fr.uge.jdict;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;

public class ChartableMaker {

	public static void main(String[] args) {
		
		if (args.length != 1) {
			System.out.println("Il faut 1 arguments : le chemin");
			return;
		}
		String path = args[0];

		
		try {
			BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(new File(path+"Freq.txt")), "UTF-8"));
			String line="";
	        while((line=reader.readLine())!= null){
	        	System.out.println(line);
	        }
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
