package com.wego.web.test;



import java.util.ArrayList;
import java.util.List;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class Crawler {
	public static void main(String[]args) {
		String url = "http://naver.co.kr/";
		try {
/*			Connection.Response response =Jsoup.connect(url)
					.method(Connection.Method.GET)
					.execute();
			Document document =response.parse();
			String text = document.text();
			System.out.println(text);*/
			Document rawData = Jsoup.connect("https://www.goodchoice.kr/product/search/2").timeout(10*1000).get();
			Elements artist = rawData.select("div[class=stage gra_black_vertical]");
			Elements title = rawData.select("p[class=title]");
			List<String> artist2= new ArrayList<>();
			List<String> title2= new ArrayList<>();
			for(Element e : artist) {
				artist2.add(e.text());
			}
			for(Element e: title) {
				title2.add(e.text());
			}
			System.out.println(artist2);
			System.out.println("-----------------");
			System.out.println(title2);
			
		} catch (Exception e2) {
			e2.printStackTrace();
		}
	}

}
