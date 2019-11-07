package com.wego.web.adm;

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

import com.wego.web.cmm.IFunction;
import com.wego.web.usr.UserCtrl;

@RestController
@RequestMapping("/admins")
public class AdmCtrl {
	private static final Logger logger = LoggerFactory.getLogger(AdmCtrl.class);
	
	@Autowired Admin admin;
	@Autowired AdminMapper adminMapper;
	@Autowired Map<String, Object> map;
	
	@PostMapping("/{eid}")
	public Map<?,?> access(@PathVariable String eid, @RequestBody Admin param){
		IFunction<Admin, Admin> f = t-> adminMapper.selectById(param);
		map.clear();
		System.out.println(f.apply(param));
		map.put("msg", (f.apply(param)!=null)?"SUCCESS":"FAIL");
		System.out.println("억세스"+map.get("msg"));
		return map;
	}
	
	@GetMapping("/{eid}")
	public Map<?,?> search(@PathVariable String eid){
		return map;
	}

	@PutMapping("/{eid}")
	public Map<?,?> update(@PathVariable String eid, @RequestBody Admin param){
		return map;
	}
	
	@DeleteMapping("/{eid}")
	public Map<?,?> remove(@PathVariable String eid, @RequestBody Admin param){
		return map;
	}

}
