package com.wego.web.test;

import java.util.Scanner;

public class Test {
	public static void main(String[] args) {
		Scanner scan = new Scanner(System.in);
		int totalCount = 0;
		totalCount=scan.nextInt();
		int pageCount = (totalCount%5==0)?totalCount/5:(totalCount/5)+1;
		System.out.println(pageCount);	
		int startRow = (pageCount-1)*5;
		System.out.println(startRow);	
		int endRow = startRow+(5-1);
		System.out.println(endRow);	
	}

}
