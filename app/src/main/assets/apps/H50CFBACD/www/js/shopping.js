document.addEventListener('plusready',function(){
   var ws = plus.webview.currentWebview();
   var html = "";
   var xhtml = "";
      var nhtml = "";
      plus.nativeUI.showWaiting();
   $.ajax({
	   	type:"get",
	   	url:apiRoot+"/home/shop/shopping",
	   	dataType:'json',
	   	success:function(data){
	   		var dat='';
	   		$.each(data.rew,function(k1,v1){
	   			var dsi=v1.gourl.substring('1')
	   		 	nhtml +='<a class="mui-control-item" href="'+v1.gourl+'">'+v1.classname+'</a>';
	   		     dat='<div id="'+dsi+'" class="mui-control-content"></div>';
	   		$(dat).insertAfter($('#content1'))
	   		})
	   		$.each(data.res, function(k,v) { 
	   			//console.log(JSON.stringify(v)); 
	   			html +='<div class="mui-pull-left xx" onclick=goodsdetils("'+v.id+'")>'+
						'<img src="'+webRoot+v.litpic+'" style="height: 122px;" /><ul class="mui-table-view">'+
						'<li class="mui-table-view-cell">'+
						'<p style="color: #000000;">'+v.title+'</p>'+
						'<p style="font-size: 12px;color: #D42C4D;">¥'+v.price+'</p>'+
						'</li></ul></div>'; 
				
				$.each(data.rew,function(k1,v1){
					if(v.tid == v1.tid){
	   		 	    xhtml='<div class="mui-pull-left xx" onclick=goodsdetils("'+v.id+'")>'+
						'<img src="'+webRoot+v.litpic+'" style="height: 122px;" /><ul class="mui-table-view">'+
						'<li class="mui-table-view-cell">'+
						'<p style="color: #000000;">'+v.title+'</p>'+
						'<p style="font-size: 12px;color: #D42C4D;">¥'+v.price+'</p>'+
						'</li></ul></div>';
	   		       $(xhtml).appendTo($(v1.gourl))
					}
					
				})
//	   			
	   			 
	   		}); 

	   		$('#shoplist').append(nhtml);
	   		$('#content1').append(html);  
	   		plus.nativeUI.closeWaiting();
	   	},error:function(e){
	   		
	   	} 
   });
   
   $('#myorder').on('click',function(){
   	var userid=plus.storage.getItem('userid');
   	create('my-order.html',{id:userid})
   })
   
}) 
function goodsdetils(id){
		create('goods-details.html',{goodsid:id})
}
