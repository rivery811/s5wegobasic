var navi = navi||{}
navi = (()=>{
	let _, js, brd_js,router_js, sb, navi_js, navi_vue_js,auth_js
	let init=()=>{
		_ = $.ctx()
		js= $.js()
		css=$.css()
		img= $.img()
		brd_js = js+'/brd/brd.js'
		sb = document.cookie
		navi_js= js+'/cmm/navi.js'
		navi_vue_js= js+'/vue/navi_vue.js'
		auth_js= js+'/cmm/auth.js'	
	
	}
	let onCreate=x=>{
		init(x)
		setContentView()
		alert('나비'+sb)
		$.when(
				$.getScript(brd_js),
				$.getScript(auth_js)
				).done(()=>{
					
				}).fail(()=>{
					alert('망')
				})
		
		
	}
	let setContentView =()=>{
		
		$('<a>',{
			href : "#",
			text :'떠라'
		}).addClass('nav-link').appendTo('#go_write')
		.click (e=>{
			e.preventDefault()
			$.getScript(brd_js,()=>{
				brd.write()
			})
		})
		$('<a>',{
			href : "#",
			text :'로그아웃',

		}).addClass('nav-link').appendTo('#logout')
		.click  (e=>{
				e.preventDefault()
				alert('나가')
				deleteCookie()
				app.run(_)
	})
	}
	return {onCreate}
})()