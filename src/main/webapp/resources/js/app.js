"use strict";
var app = app || {};

var app = (()=>{
	const WHEN_ERR = '호출하는 JS 파일을 찾을 수 없습니다.'
	let  _, js,img,css, authjs;

	let run = x =>{
		$.getScript(x+'/resources/js/cmm/router.js',()=>{
			$.extend(new Session(x));
			onCreate();
			
		})}	
		let init=()=>{
			_ = $.ctx();
			js = $.js();
			css=$.css()
			img= $.img()
			authjs = js+'/cmm/auth.js'
			
			
		}
		let onCreate=()=>{
			init();
			$.when(
					$.getScript(authjs)
			)
			.done(()=>{		
				auth.onCreate()	
			}
			)
			.fail(()=>{
			alert(WHEN_ERR)
			}
			)
		}

	return{run}
	
})();