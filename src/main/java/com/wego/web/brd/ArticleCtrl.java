package com.wego.web.brd;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wego.web.cmm.IConsumer;
import com.wego.web.cmm.IFunction;
import com.wego.web.cmm.ISupplier;
import com.wego.web.pxy.Proxy;
import com.wego.web.pxy.ProxyMap;
import com.wego.web.usr.UserCtrl;
import com.wego.web.utl.Printer;

@RestController
@RequestMapping("/articles")


public class ArticleCtrl {
	private static final Logger logger = LoggerFactory.getLogger(ArticleCtrl.class);
	@Autowired Article article;
	@Autowired ProxyMap map;
	@Autowired Printer printer;
	@Autowired ArticleMapper articleMapper;
	@Autowired List<Article> list;
	@Autowired Proxy pxy;
	
	@PostMapping ("/")
	public Map<?,?> write(@RequestBody  Article param){
		printer.accept("아티클 라이트 들어옴");
		param.setBoardType("게시판");
		
		IConsumer<Article> c = t-> articleMapper.insertArticle(param);
		ISupplier<Integer> s = ()-> articleMapper.countList();
		c.accept(param);
		map.accept(Arrays.asList("msg","article"),Arrays.asList("SUCCESS",s.get()));
	
		printer.accept("파람파람"+param.toString());
		//printer.accept("아티클 라이트 나감"+map.get("article"));

		
		return map.get();
	}
	
	@GetMapping("/count")
	public Map<?,?> countlist(){
		ISupplier<Integer> s = ()-> articleMapper.countList(); 
		s.get();
		map.accept(Arrays.asList("count"), Arrays.asList(s.get()));
		System.out.println("카운트"+s.get());
		return map.get();
	}
	
	@GetMapping("/page/{pageNo}/size/{pageSize}")
	public Map<?,?> list(@PathVariable String pageNo, @PathVariable String pageSize){
		System.out.println("넘어온 페이지 넘버"+pageNo);
		System.out.println("넘어온 페이지 사이즈"+pageSize);
		pxy.setPageNum(pxy.parseInt(pageNo));
		pxy.setPageSize(pxy.parseInt(pageSize));
		pxy.paging();
		System.out.println("엔드페이지"+pxy.getEndPage());
		list.clear();
		ISupplier<List<Article>> s= ()-> articleMapper.selectAll(pxy); // 제네릭 안에 제네릭 가능 
		printer.accept("해당페이지글목록\n"+s.get());
		map.accept(Arrays.asList("list","proxy"),
				Arrays.asList(s.get(),pxy));
		return  map.get();
	}
	@GetMapping("/{artseq}")
	public Map<?,?> list(@PathVariable String artseq , @RequestBody Article param){
		return map.get();
	}
	@PutMapping("/{artseq}")
	public Map<?,?> update(@PathVariable String artseq ,@RequestBody Article param){
		return map.get();
	}
	@PutMapping("/{artseq}/update")
	public Article updateContent(@PathVariable String artseq ,@RequestBody Article param){
		IConsumer<Article> c = t-> articleMapper.updateContent(param);
		c.accept(param);
		IFunction<Article, Article> f = t-> articleMapper.selectContent(param);
		f.apply(param);
		//map.clear();
		//map.put("content", "SUCCESS");
		//map.accept(Arrays.asList("content"), Arrays.asList("SUCCESS"));
		return f.apply(param);
	}
	
	@DeleteMapping("/{artseq}")
	public Map<?,?> delete(@PathVariable String artseq,@RequestBody Article param ) {
		System.out.println("삭제진입");
		IConsumer<String> c = t->articleMapper.deleteContent(param);
		c.accept(artseq);
		//map.clear();
		//map.put("msg", "짜증나");
		//map.accept(Arrays.asList("msg"), Arrays.asList("짜증나"));
		return map.get();
	}

}
