package com.wego.web.pxy;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.BiFunction;
import java.util.function.Function;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import com.wego.web.brd.ArticleMapper;
import com.wego.web.cmm.ISupplier;
import com.wego.web.utl.Printer;

import lombok.Data;

@Component @Data @Lazy
public class Proxy {
	private int startRow,endRow,totalCount,
	pageNum, pageSize,startPage,endPage,pageCount,
	blockNum,nextBlock,prevBlock,blockCount;
	private String search;
	private final int BLOCK_SIZE = 5;
	private boolean existPrev,existNext;
	//private List<Integer> pages;
	@Autowired Printer printer;
	@Autowired ArticleMapper articleMapper;
	
	public void paging() {
		
		ISupplier<Integer> s = ()-> articleMapper.countList();
		
		totalCount = s.get();
		pageCount = (totalCount%pageSize==0)?totalCount/pageSize:(totalCount/pageSize)+1;
		startRow = (pageNum-1)*pageSize;
		endRow = startRow+(pageSize-1);
		endRow = (pageNum==pageCount)?totalCount-1:(pageSize*pageNum)-1;
		blockCount =(pageCount%BLOCK_SIZE!=0) ?(pageCount/BLOCK_SIZE)+1:pageCount/BLOCK_SIZE;
		blockNum = (pageNum-1)/BLOCK_SIZE;
		startPage=1+(BLOCK_SIZE*blockNum);
		System.out.println("startPage"+startPage);
		endPage =(blockCount!=blockNum+1)?BLOCK_SIZE*(blockNum+1):pageCount;
		
		existPrev =blockNum!=0;
		existNext =blockNum+1!=blockCount;
		
/*		pages = new ArrayList<>();
		for(int i = startPage; i<endPage+1; i++) {
			
			pages.add(i);
		}*/
		
		
		nextBlock=startPage +BLOCK_SIZE;
		prevBlock=startPage -BLOCK_SIZE;
		
		System.out.println("pageNum"+pageNum);
		System.out.println("totalCount"+totalCount);
		System.out.println("pageCount"+pageCount);
		System.out.println("blockCount"+blockCount);
		System.out.println("blockNum"+blockNum);
		System.out.println("startPage"+startPage);
		System.out.println("endPage"+endPage);
		
		//boolean existPrev =(pageNum<=BLOCK_SIZE)?false:true;
		//boolean existNext =(pageNum>=BLOCK_SIZE&&endPage!=pageCount)?true:false;
		
		
	}
	public int parseInt(String param) {
		Function<String, Integer> f=s->Integer.parseInt(s);
		return f.apply(param);
		
	}
	
	public List<?> crawl(Map<?,?> paramMap){// 디비를 안감 
		String url = "http://"+paramMap.get("site")+"/";
		printer.accept("넘어온 url"+url);
		List<String> pxylist= new ArrayList<String>();
		pxylist.clear();
		try {
			Connection.Response response =Jsoup.connect(url)
					.method(Connection.Method.GET)
					.execute();
			Document document =response.parse();
			String text = document.html();
			printer.accept("크롤링한텍스트"+text);
			pxylist.add(text);
			
		} catch (Exception e2) {
			e2.printStackTrace();
		}
		return pxylist;
	}
	
	public Integer random(int a, int b) {
		BiFunction<Integer,Integer,Integer> f = (t,u)->(int)(Math.random()*(u-t))+t;
		return f.apply(a,b);
	}

}
