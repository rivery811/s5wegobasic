package com.wego.web.usr;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Repository
@Lazy
public interface UserMapper {
	public void insertUser(User user);
	public User selectById(User user);
	public int existId(String uid);
	
}
