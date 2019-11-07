package com.wego.web.aop;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.wego.web.utl.Printer;

@RestController
@RequestMapping("/tx")
@Transactional
@Lazy//레이지 로딩  : 난 답을 한번에 받고 싶어 혹은 비동기화로 인한 널포인트익셉션을 피하고 싶어 
public class TxController {
//System.out.println(text);
	//@Autowired HashMap<String, String> map;
	@Autowired TxService txService;
	@Autowired Printer printer;
	
	@GetMapping("/crawling/{site}/{srch}")
	public Map<?,?> crawl(@PathVariable String site,@PathVariable String srch){

		 HashMap<String, Object> map= new HashMap<>();
		printer.accept(site+srch);
		map.clear();
		map.put("site", site);
		map.put("srch", srch);
		map.put("info", txService.crawling(map));
		;
		return map;
	}
	
}
