package com.wego.web.adm;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Repository
@Lazy
public interface AdminMapper {

 public Admin selectById(Admin param);

}
