"user strict"
var admin = admin||{}
admin=(()=>{
	const WHEN_ERR = '호출하는 JS를 찾을수 없습니다.'
	let _, js,img,css,auth_vuejs,brd_js,navi_js,navi_vue_js;
		
	let init =()=>{
			_ = $.ctx()
			js= $.js()
			css=$.css()
			img= $.img()
			auth_vuejs = js+'/vue/auth_vue.js'		
			brd_js = js+'/brd/brd.js'
			navi_js= js+'/cmm/navi.js'
			navi_vue_js= js+'/vue/navi_vue.js'
		}
	let onCreate =()=>{
		alert('관리자페이지')
		init()
		
		$.when(
				$.getScript(navi_js),
				$.getScript(navi_vue_js)
				)
		.done(()=>{
			setContentView()
			navi.onCreate()
		
			})
		.fail(()=>{alert('풰일')})
		
	}
	let setContentView =()=>{
		$('body').empty()
		$(navi_vue.nav()).appendTo('body')
		
		$('<table id="tab">'+
		'  <tr></tr>'+
		'</table>')
		.css({ border: '1px solid #ddd',width: '95%',height :'80%', margin : '0 auto'})
		.appendTo('body')
		
		let arr1=[{id:'left',width:'20%'},{id:'right',width:'80%'}]
	
		$.each(arr1,(i,j)=>{
			$('<td id="'+j.id+'"></td>')
			.css({border:'1px solid #ddd',width: j.width,'vertical-align':'top'})
			.appendTo('#tab tr')
		})
		
		let arr =[
				{txt:'웹크롤링',name:'web_crawl'},
				{txt:'직원관리',name:'emp_mgmt'},
				{txt:'고객관리',name:'customer_mgmt'},
				{txt:'업체관리',name:'host_mgmt'},
				{txt:'매출관리',name:'sales_mgmt'},
				{txt:'띠용',name:'hahaha'}]//제이슨
		
		$.each(arr,(i,j)=>{
			$('<div name ="'+j.name+'">'+j.txt+'</div>').appendTo('#left')
			.css({border:'1px solid #ddd',height: '100px','padding-top':'20px'})
			.hover(function(){
				$(this).addClass('active')
				$(this).siblings().removeClass('active')
				
				})
			.click(function(){
				let that = $(this).attr('name')
				switch(that){
				case'web_crawl' : 
					webCrawl()
					break;
				case'emp_mgmt' : 
					alert('힝구'+$(this).attr('name')) 
					break;
				case'customer_mgmt' : 
					alert('힝구'+$(this).attr('name')) 
					break;
				case'host_mgmt' : 
					alert('힝구'+$(this).attr('name')) 
					break;
				case'sales_mgmt' : 
					alert('힝구'+$(this).attr('name')) 
					break;
				case'hahaha' : 
					alert('힝구'+$(this).attr('name')) 
					break;
				}
			})
	
		})
		$('#left')
		

	}

	let webCrawl =()=>{
		$('<table id="web"><tr><td>'+
				'<h2>크롤링!</h2>'+
				'<form class="form-inline my-2 my-lg-0" action="/action_page.php" >'+
				'  <select name="site" size="1" multiple>'+
				'  </select><br>'+
				'<input name="url" class="form-control mr-sm-2" type="text" placeholder="url" aria-label="Search"><br>'+		
				'</form>'+
				'</td></tr><tr><td><div id = "info">'+
				'<textarea  name="content" cols="100" rows="10"></textarea>'+	
				'</div></td></tr></table>')
		.appendTo('#right')
		.css({width: '95%',height :'80%', margin : '0 auto'})
		$('#web form input[name="url"]').css({width:'80%'})
		
		let arr=[{text:'naver',value:'naver.com'},
			{text:'daum',value:'daum.net'},
			{text:'google',value:'google.co.kr'},
			{text:'Audi',value:'audi'},
			{text:'ggg',value:'ggg'}]
		$.each(arr,(i,j)=>{
			$('<option value="'+j.value+'">'+j.text+'</option>').appendTo('#web form select[name="site"]')
		})
		$('<input type="submit" value="gogo">')	
		.appendTo('#web form')
		. click(e=>{
			e.preventDefault()
			let arr =[$('form select[name="site"]').val(),
				$('form input[name="url"]').val()]
			if(
			!$.fn.nullChecker(arr)){
				$.getJSON(_+'/tx/crawling/'+arr[0]+'/'+arr[1], d=>{
					alert(d.site)
					$('#info textarea').val(d.info)
					$('#info').css({width:'80%',height:'60%'})
				}
				)
			}else{
				alert('빈칸채우기')
			}
			


		})
		
	}
	return {onCreate}	
})()














