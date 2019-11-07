package com.wego.web.usr;


import java.util.Map;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
import com.wego.web.utl.Printer;

import lombok.extern.log4j.Log4j;

@RestController
@RequestMapping("/users")//Url을 class 또는 method와 맵핑 시켜주는 역할
@Log4j
public class UserCtrl {
	private static final Logger logger = LoggerFactory.getLogger(UserCtrl.class);
	@Autowired User user;

	@Autowired Map<String, Object> map;
	@Autowired Printer printer;
	@Autowired UserMapper userMapper;
	
	
	@GetMapping("/{uid}/exist")
	public Map<?,?> existId(@PathVariable  String uid){
		printer.accept("조인들어옴");
		IFunction<String, Integer> p = o-> userMapper.existId(uid);	
		map.clear();
		map.put("msg",(p.apply(uid)==0)?"SUCCESS":"Fail");
		
	
		//map.put("msg", "SUCCESS");
		System.out.println("존재맵"+map.get("msg"));
		System.out.println("중복 수"+p.apply(uid));

		return map;
	}
	
	@PostMapping("/")
	public Map<?,?> join(@RequestBody  User param) {
		printer.accept("조인들어옴"+param.toString());
		printer.accept("람다프린터가 출력한 값"+param.getUid()+ param.getPwd());
		logger.info("ajax가 보낸 아이디와 비번{}"+param.getUid()+param.getPwd());
		IConsumer<User> c = t -> userMapper.insertUser(param);	
		c.accept(param);
		map.clear();
		map.put("msg", "SUCCESS");

		return map;
	}
	@PostMapping("/{uid}")
	public  User login(@PathVariable String uid,@RequestBody User param){		
		IFunction<User,User> f = t-> userMapper.selectById(param);
		return f.apply(param); // 형변환 필요 없음  (User)f.apply(param);
	}
	@GetMapping("/{uid}")
	public User searchUserbyId(@PathVariable String uid,@RequestBody User param) {
		IFunction<User,User> f = t-> userMapper.selectById(param);
		return f.apply(param); 
	}
	@PutMapping("/{uid}")
	public Map<?,?> updateUser(@PathVariable String uid,@RequestBody User param) {
		IConsumer<User> c = t -> userMapper.insertUser(param);	
		c.accept(param);

		return map;
	}
	
	@DeleteMapping("/{uid}")
	public String removeUser(@PathVariable String uid,@RequestBody User param) {
		IConsumer<User> c = t -> userMapper.insertUser(param);	
		c.accept(param);
		map.put("msg", "SUCESS");
		return "SUCCESS";
	}
	

}
