package com.wego.web.brd;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.wego.web.pxy.Proxy;

@Repository
@Lazy
public interface ArticleMapper {
	public void insertArticle(Article param);
	public int countList();
	public List<Article> selectAll(Proxy pxy);
	public void deleteContent(Article param);
	public void updateContent(Article param);
	public Article selectContent(Article param);

}
