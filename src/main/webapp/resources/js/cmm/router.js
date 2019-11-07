"use strict";
function Session(x){
	sessionStorage.setItem('ctx',x);
	sessionStorage.setItem('js',x+'/resources/js');
	sessionStorage.setItem('css',x+'/resources/css');
	sessionStorage.setItem('img',x+'/resources/img');
	return{
		ctx : () =>{return sessionStorage.getItem('ctx');},
		js: ()=>{return sessionStorage.getItem('js');},
		css: ()=>{return sessionStorage.getItem('css');},
		img: ()=>{return sessionStorage.getItem('img');}
		//세션스토리지는 html의 브라우저  객체지향아님  텍스트만 있음 제이슨은 자바 스크립트 
		//세션스토리지는 자바의 상수풀 같은것 
	}
}

