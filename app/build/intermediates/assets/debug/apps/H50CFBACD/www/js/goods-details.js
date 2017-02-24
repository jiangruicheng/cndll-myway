var html='', xhtml='',chtml='',dhtml='';
var ws,goodsid;
document.addEventListener('plusready', function() {
	 ws = plus.webview.currentWebview();
	 goodsid = ws.goodsid;
	plus.storage.setItem('sid', goodsid);
	console.log(goodsid)
	 $.ajax({
	 	type:"get",
	 	url:apiRoot+"/home/shop/goods",
	 	data : {
	 		goodsid : goodsid,
	 	},
	 	dataType:'json', 
	 	success:function(data){
	 		html +='<div class="mui-slider-item mui-slider-item-duplicate"><a href="#">'+
				  '<img class="imag" src="'+ getuserPic(data.pro[data.pro.length-1]) +'"  style="height: 140px;"></a></div>';
			
			$.each(data.pro, function(index , value){
			html +='<div class="mui-slider-item"><a href="#">'+
					'<img class="imag" src="'+ webRoot + value +'"  style="height: 140px;" data-preview-src="" data-preview-group="1"></a></div>';
					
			}); 
			html +='<div class="mui-slider-item mui-slider-item-duplicate"><a href="#">'+
					'<img class="imag" src="'+ getuserPic(data.pro[0])+'"   style="height: 140px;"></a></div>';
        for(var i=0;i<data.pro.length;i++){
        	if(i==0){
        		dhtml+='<div class="mui-indicator mui-active"></div>';
        	}else{
        		dhtml+='<div class="mui-indicator"></div>';
        	}
        	
        }
        $(".dactive").html(dhtml);
		$('#goodsbanner').html(html);
		$('#goodsname').text(data.title);
		$('#goodsmoney').text('¥'+data.price);
		$('#description').text(data.description);
		xhtml = '<p>'+data.body.replace(/src="/g ,'src="'+webRoot)+'</p>';
		$('#body').html(xhtml);
		
		chtml += '<li class="mui-table-view-cell"  onclick=rate("'+data.id+'")>'+
					'<span class="font-14">评价('+data.pinl+')</span></li>';
	  $('#pinl').append(chtml);
	   fanda()
		},error:function(e){ 
	 		console.log(JSON.stringify(e))
	   }
		
	 });
	$('#buymai').on('click', function() {
		create('buy-ok.html',{goodsid: goodsid, spage: 1});
	})
});

function rate(id) {
	plus.webview.create('./rate.html', 'rate.html', {}, { goodsid: id, spage: 1 }).show('pop-in', 200);
}
function fanda(){
   $(".imag").click(function() {  
   	console.log(1)
   	var i=$(this).attr('src');
    	 $('#itma').attr('src',i);
    	 $('#itma').css('display','block');
    	 $('#zzc').css('display','block');
     });  
  
  $('#itma').click(function() {
		$(this).css('display', 'none');
		 $('#zzc').css('display','none');
	})
   $('#zzc').click(function() {
		$(this).css('display', 'none');
		 $('#itma').css('display','none');
	})
}