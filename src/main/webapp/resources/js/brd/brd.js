"user strict"
var brd = brd||{}
brd = (()=>{
	let _, js, brd_vue_js,router_js, sb, navi_js,css,img,navi_vue_js,page_vue_js, compo_vue_js
	let init=()=>{
		_ = sessionStorage.getItem('ctx')
		js= $.js()
		css=$.css()
		img= $.img()
		brd_vue_js = js+'/vue/brd_vue.js'

		navi_js= js+'/cmm/navi.js'
		navi_vue_js= js+'/vue/navi_vue.js'
		page_vue_js= js+'/vue/page_vue.js'
		compo_vue_js = js+'/vue/compo_vue.js'
	
	}
	let onCreate=x=>{
		
		init()
		$.when(
				$.getScript(brd_vue_js),
				$.getScript(navi_js),
				$.getScript(navi_vue_js),
				$.getScript(page_vue_js),
				$.getScript(compo_vue_js)
				).done(()=>{
					setContentView()
					navi.onCreate({_:_,js:js,css:css,img:img})
				}).fail(()=>{
					alert('안됨')
				})

		 
	}
	let setContentView =()=>{
	
			$('head').html(brd_vue.brd_head({css:$.css(),img:$.img()}))      
		    $('body').html(brd_vue.brd_body({ctx:_,css:$.css(),img:$.img(),js:js}))
		    .addClass('text-center bg-light')
		    $(navi_vue.nav()).appendTo('#navi')
		   // $('<h1>들어가니</h1>').appendTo('#navi')
		    
		    recent({page:'1',size:'5'})  
		
	}
	let recent =x=>{
		 $('#recent .media').remove()   
		 $('#recent .d-block').remove()  
		 $('#suggestions').remove()
		 $('#pagenation').remove()
		 $('#listSizeSelectDiv').remove()
		 
		 alert('호출된 베이지번호'+x.page)//카운트는 디비에 저장 안되지만 상태데이터임 
		
		
		 $.getJSON(sessionStorage.getItem('ctx')+'/articles/page/'+x.page+'/size/'+x.size,d=>{
			 let i = 0
			 let res = ''
			$.each(d.list,(i,j)=>{//i인덱스 j밸류 우리가 하고 싶은 아티클 
				$(' <div  class ="media text-muted pt-3">'+
				        '  <img  data-src="holder.js/32x32?theme=thumb&amp;bg=007bff&amp;fg=007bff&amp;size=1" alt="32x32" class="mr-2 rounded" style="width: 32px; height: 32px;" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16dfcdddb72%20text%20%7B%20fill%3A%23007bff%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16dfcdddb72%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%23007bff%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2211.5390625%22%20y%3D%2216.9%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true">'+
				  		'  <p id = "id_'+i+'" class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"></p>'+
				  		'  </div>').appendTo('#recent')
				 $(' <strong class="d-block text-gray-dark">@<a>'+j.uid+'</a></strong>')
				 .appendTo('#id_'+i)
				 .click(()=>{
					 alert('아이디 클릭')
				 })
				 
				 $('<a>'+j.title+'</a>')
				  .appendTo('#id_'+i)
				 .click(()=>{
					 alert('제목 클릭')
					 detail(j)
				 })
				})
		 })
		 
		  $(page_vue.page()).appendTo('#page').css({'place-content':'center'})
		  $('#pagenation').empty()
		
		 
		  $.getJSON(sessionStorage.getItem('ctx')+'/articles/page/'+x.page+'/size/'+x.size,d=>{
				  alert('엔드페이지'+d.proxy.endPage)  
				  alert('pages'+d.proxy.pages)
				  let pages = 0
				  //let nextp = d.proxy.endPage +1
				  //let prevp = d.proxy.startPage -1
			if(d.proxy.existPrev){
					  $('<li class="page-item"><a class="page-link" href="#">이전</a></li>').appendTo('#pagenation')
					   .click(e=>{
						   e.preventDefault()
			  			recent({page:d.proxy.prevBlock,size:$('#listSizeSelectDiv select').val()})
			  		 })
				  }
				  
					let i = 0;
					for(i = d.proxy.startPage; i<=d.proxy.endPage; i++) {
						if(d.proxy.pageNum == i){
							alert('이프절'+i)
							 $('<li class="page-item"><a class="page-link" href="#">'+i+'</a></li>')
							  .appendTo('#pagenation')
							  .addClass('active')
							  .click(()=>{})
							}else{
								('엘스절'+i)
								 $('<li class="page-item"><a class="page-link" href="#">'+i+'</a></li>')
								  .appendTo('#pagenation')
								  .click(function(){
									  alert($(this).children('.page-link').text())
									  recent({page:$(this).children('.page-link').text(),size:$('#listSizeSelectDiv select').val()})
								  })
						}

						 
					}
			 $.each(d.proxy.pages,(i,j)=>{
						
			  	})
			  	if(d.proxy.existNext){
			  		 $('<li class="page-item"><a class="page-link" href="#">다음</a></li>').appendTo('#pagenation')
			  		 .click((e)=>{
			  			e.preventDefault()
			  			recent({page:d.proxy.nextBlock,size:$('#listSizeSelectDiv select').val()})
			  		 })
			  	}
			  	
				$(compo_vue.pagesize()).appendTo('#pagesize')
				$.each([{sub:'5개',val:'5'},{sub:'10개',val:'10'},{sub:'15개',val:'15'}],(i,j)=>{
					$('<option value='+j.val+'>'+j.sub+'</option>').appendTo('#listSizeSelectDiv select')
				})
				$('#listSizeSelectDiv select option[value="'+d.proxy.pageSize+'"]').attr('selected',true)
				$('#listSizeSelectDiv').change(()=>{
				alert($('#listSizeSelectDiv option').val())
				recent({page:'1',size:$('#listSizeSelectDiv select').val()})
			})
			 
			  })
			
			$('#pagenation').css({'place-content':'center'})
			$('#listSizeSelectDiv').css({float:'right'})
/*		  $.getJSON(sessionStorage.getItem('ctx')+'/articles/',d=>{ 앞쪽은 포문이나 이치문이나지만 뒤로 가면 어떻게 할거야
			  alert('게시물수'+d.count)
			  let i= 0;
			  let page = 0;
			  if(d.length%5==0){
				  page =d.length/5
			  }else{
				  page =d.length/5+1
			  }
			  alert('페이지수'+page)
			  for(i=1; i<=page;i++){
				  $('<li class="page-item"><a class="page-link" href="#">'+i+'</a></li>')
				  .appendTo('#pagenation')
			  }
			  })*/
			  		  

			  		 
		/* $.ajax({// 에이작스는 값을 갖고 갔다가 값 받아 오는건데 값을 안가지고 가잖아 빈 보따리만 들고 가기는 가는데 그게 좋냐고  겟제이슨 써라 
			 url :_+'/articles/count',
			 type :'GET',
			 contentType:'application/json',
			 success: d =>{
				 
				 for(let i = 0; i<d.count; i++){
						// $('#recent').append(ui) 이렇게 하면 아이디가 여러번 도니까 별로야  밖으로 빼 
						 res += ui
					 }
					$('#recent').append(res)
			 },
			 error:e =>{
				 alert('망했어')
			 }
		 })*/
	}
	let write =()=>{
		
		alert('글쓰기 클릭')
		
		$('#recent').html(brd_vue.brd_write())
		$('#suggestions').remove()
		$('#pagenation').remove()
		
		$('#listSizeSelectDiv').remove()
		$('#write_form input[name=writer]').val(getCookie("USERID"))
		//$('#write_form'한칸띄고 태그[name=writer])
		//$('#write_form'한칸띄고 div.클래스 이름 또는 스타일 등등 다됨 속성)
		/* +' <input type="reset" class="btn btn-danger" style="float:right;width:100px;margin-right:10px" value="CANCEL"/>'
		  +'<input name="write" type="submit" class="btn btn-primary" style="float:right;width:100px;margin-right:10px" value="SUBMIT"/>'*/
	/*	if($('')){}
		else(){}	
		*/
		$('<input>',{
			style :"float:right;width:100px;margin-right:10px",
			value :"삭제"
		}).addClass("btn btn-danger").appendTo('#write_form')
		.click(()=>{})
		
		$('<input>',{
			type: "submit",
			style : "float:right;width:100px;margin-right:10px",
			value : "전송"
		}).addClass("btn btn-primary").appendTo('#write_form')
		//.appendTo('form') 폼이 텍스트일 뿐이니까  위에서 선언가능 
		.click(e=>{
			e.preventDefault()
			let json = {
					uid :$('#write_form input[name="writer"]').val(),
					title : $('#write_form input[name="title"]').val(),
					content :$('#write_form textarea[name="content"]').val()
			}
			alert('글'+json.content)
			alert('아이디'+json.title)
			alert('씨텍스너어어'+_)
			alert('스토리지'+sessionStorage.getItem('ctx'))
		
			
			$.ajax({//가기전 갖다온 애들이 같이 있다=> 비동기다 , 시퀀스 언어가 아니다 
				url :sessionStorage.getItem('ctx')+'/articles/',
				type :'POST', //상태에 대한 타입 (REST)- 네가지 
				data :JSON.stringify(json),
				dataType : 'json',// 가기전의 타입
				contentType : 'application/json',//컨트롤러와 매핑 자바가 보낸거'application/를 json 이렇게 바꿔라 , 갖다온타입
				success :d=>{
					
					alert('에이작스글'+d.article)
					$('#recent div.container-fluid').remove()
					recent({page:'1',size:'5'})
				},
				error:e=>{
					
					alert('에이작스 에러')
				}
			})


		})
		
	}
	

	
	let detail =x=>{
		$('#listSizeSelectDiv').remove()
		$('#pagenation').remove()
		alert('넘기는 시퀀스값'+x)
		$('#recent').html(brd_vue.brd_write())
		$('#suggestions').remove()
		$('#recent div.container-fluid h1').html('<h1>글내용</h1>')
		$('#write_form input[name=writer]').val(x.uid)
		$('#write_form input[name=title]').val(x.title)
		$('#write_form textarea').val(x.content)

		$('<input>',{
			style :"float:right;width:100px;margin-right:10px",
			value :"삭제",

		}).addClass("btn btn-danger").appendTo('#write_form')
		.click( e=>{
			e.preventDefault()
			alert('글삭제이동')
			deletecontent(x.artseq)
			
		})	
		$('<input>',{
			type: "submit",
			style : "float:right;width:100px;margin-right:10px",
			value : "수정"
		}).addClass("btn btn-primary").appendTo('#write_form')
		.click( e=>{
			e.preventDefault()
			alert('글수정')
			update(x)
		})	

	}
	let deletecontent =x=>{
		alert('x'+x)
		alert(_+'/articles/'+x)
		//let data ={artseq:x}
		$.ajax({
			url :sessionStorage.getItem('ctx')+'/articles/'+x,
			type : 'DELETE',
			data :JSON.stringify({artseq:x}) ,
			dataType : 'json',
			contentType :'application/json',
			success : d=>{
				alert('삭제성공')
				$('#recent div.container-fluid').remove()
				recent({page:'1',size:'5'})
			},
			error:e=>{
				alert('욕')
			}
		})
		
	}
	let update=x=>{
		alert('x'+x.artseq)
		$.ajax({
			url :sessionStorage.getItem('ctx')+'/articles/'+x.artseq+'/update',
			type : 'PUT',
			data :JSON.stringify({artseq:x.artseq,content:$('#write_form textarea').val(),uid:x.uid,title:x.title}) ,
			dataType : 'json',
			contentType :'application/json',
			success : d=>{
				alert('업데이트성공')
				detail(d)								
			},
			error:e=>{
				alert('욕')
			}
		})
	}
	
	
	
	return{onCreate,write}
	
})()