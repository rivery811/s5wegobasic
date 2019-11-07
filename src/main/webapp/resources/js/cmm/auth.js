"use strict";
var auth = auth || {};
auth =(()=>{
	const WHEN_ERR = '호출하는 JS를 찾을수 없습니다.'
	let _, js,img,css,auth_vuejs,brd_js,router_js,cookie_js,admin_js;
	
	let init =()=>{
		_ = $.ctx()
		js= $.js()
		css=$.css()
		img= $.img()
		auth_vuejs = js+'/vue/auth_vue.js'		
		brd_js = js+'/brd/brd.js'
		router_js = js+'/cmm/router.js'	
		cookie_js = js+'/cmm/cookie.js'
		admin_js= js+'/brd/admin.js'
	}
	
	let onCreate=()=>{
		init()
		$.when(
				$.getScript(auth_vuejs),
				$.getScript(cookie_js),
				$.getScript(brd_js),
				$.getScript(router_js)),
				$.getScript(admin_js)
	
		.done(()=>{
			setContentView()
			$('#a_go_join').click(e=>{
				e.preventDefault();
				$('head').html(auth_vue.join_head()),
				$('body').html(auth_vue.join_body())
				$('#uid').keyup(()=>{
					if($('#uid').val().length>2){
						existId($('#uid').val())
					}
					
				})
				
			$('<button>',{
			text: '회원가입',
			href: '#',
			click: e=>{
				e.preventDefault();
				join()		
			}
		})
		.addClass('btn btn-primary btn-lg btn-block')
		.appendTo('#btn_join')
	
			})
			})
		.fail(()=>{alert(WHEN_ERR)})
	}

	let setContentView=()=>{
		$('head').html(auth_vue.login_head({css:$.css(),img:$.img()})),
		$('body').html(auth_vue.login_body({css:$.css(),img:$.img()}))
		.addClass('text-center'),
		$('#uid').val('gh')
		$('#pwd').val('gh')
		login()
		access()
	}
	
	let existId =x=>{
		$.ajax({
			url:_+'/users/'+x+'/exist',
			
			contentType : 'application/json',
			success : d=>{
				
				if(d.msg ==='SUCCESS')
					alert('회원가입 고고'),
					$('#dupl_check').val('사용가능아이디')
					.css('color','blue')
					
				else
					$('#dupl_check').val('사용불가능아이디')
					.css('color','red'),
        			alert('아이디 중복')
				
			},
			error : e=>{
				
				alert('익시트에이작스실패');
			}
			
		})
	}


	let join=()=>{
		let data = {uid:$('#uid').val(),pwd:$('#pwd').val(),uname:$('#uname').val()}
		
				alert(data.uid+','+data.pwd)
				$.ajax({
					url:_+'/users/',
					type: 'POST',
					dataType:'json',
					data : JSON.stringify(data),
					contentType : 'application/json',
					success : d =>{
						alert('에이작스 성공'+d.msg);	
						if(d.msg ==='SUCCESS')
							$('head').html(auth_vue.login_head({css:$.css(),img:$.img()})),
							$('body').html(auth_vue.login_body({css:$.css(),img:$.img()}))
							.addClass('text-center'),
							login()
						else(alert('조인회원가입실패'))
						
					},
					error : e =>{
						alert('조인에이작스실패');
					}
				})
        		
			}
	
	let login=()=>{
		let x ={css:$.css(),img:$.img()}
		alert('x.css'+x.css)

		$('<button>',{
			type:"submit",
			text : "Sign in",
			click : e=>{
				e.preventDefault()
				let data = {uid:$('#uid').val(),pwd:$('#pwd').val(),uname:$('#uname').val()}

				$.ajax({
					url:_+'/users/'+$('#uid').val(),
					type: 'POST',
					dataType:'json',
					data:JSON.stringify(data),
					contentType : 'application/json',
					success : d=>{
						setCookie("USERID",d.uid)
						alert('저장된 쿠키: '+getCookie("USERID"))
						brd.onCreate()

						
					},
					error : e=>{
						alert('에이작스실패');
					}
					
				})	
			}
		}).addClass("btn btn-lg btn-primary btn-block")
		.appendTo('#btn_login')		
	}
	
	let access =()=>{
		$('#a_go_admin').click(()=>{
			let ok = confirm('사원입니까')
			if(ok){ 
				let eid = prompt('사원번호 입력')
				
				alert('입력한 사번'+eid)
				$.ajax({
					url :_+'/admins/'+eid,
					type: 'POST',
					data:JSON.stringify({eid:eid,pwd:prompt('비밀번호 입력')}),
					dataType :'json',
					contentType: 'application/json',
					success : d=>{
						if(d.msg ==='SUCCESS'){
							alert('일해라')
							admin.onCreate()
						}else{
							alert('접근불가')
							app.run(_)
						}
					},
					error : e=>{
						alert('에이작스 실패')
					}
						
				})
		
			}
		})
		
	}


	return{onCreate,join,login,existId}
	
})();