package com.wego.web.aop;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wego.web.pxy.Proxy;

@Transactional
@Service
public class TxService {
	@Autowired TxMapper txMapper;
	//@Autowired HashMap<String, Object> txmap;
	@Autowired Proxy pxy;
	//@Autowired List<String> txServicelist;
	
	@SuppressWarnings("unchecked")
	public List<String> crawling(Map<?,?> paramMap){
		List<String> txServicelist= new ArrayList<String>();
		txServicelist.clear();	
		txServicelist = (List<String>) pxy.crawl(paramMap);
		return txServicelist;
	}
}
