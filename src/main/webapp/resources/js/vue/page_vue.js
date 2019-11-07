"use strict"
var page_vue = page_vue||{}
page_vue = {
	page : ()=>{
		return '<div  class="container" class ="pagination justify-content-center">'+
		'<div id = "pagesize" class="select_component2" ></div>'+
		'  <ul id = "pagenation" class="pagination">'+
		'    <li class="page-item"><a class="page-link" href="#">Previous</a></li>'+
		'    <li class="page-item"><a class="page-link" href="#">1</a></li>'+
		'    <li class="page-item"><a class="page-link" href="#">2</a></li>'+
		'    <li class="page-item"><a class="page-link" href="#">3</a></li>'+
		'    <li class="page-item"><a class="page-link" href="#">Next</a></li>'+
		'  </ul>'+
		'</div>'
		
	}
}