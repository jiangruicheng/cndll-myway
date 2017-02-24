document.addEventListener('plusready',function(){
   var ws = plus.webview.currentWebview();
   var html="";
  
   $.ajax({
	   	type:"get",
	   	url:apiRoot+"/home/stars/starlist",
	   	dataType:'json',
	   	success:function(data){ 
	   		var sex;
	  $.each(data,function(k,v){
	  	console.log(JSON.stringify(v)); 
	  	   if(v.user.sex == 0) {
					sex=' #FFA2A2;">&#xe615;';
				} else {
					sex='#54A1FF;">&#xe614;'
				}
		  	html +='<ul class="mui-table-view" onclick=create("my-active1.html",{sid:'+v.userid+'})><li class="mui-table-view-cell mui-media">'+
				'<img class="mui-media-object mui-pull-left" src="'+getAvatar(v.user.userspic)+'" />'+ 
				'<div class="mui-media-body">'+ 
				'<span>'+v.user.usersni+'</span><i class="mui-icon iconfont xx">&#xe667;</i>'+
				'<p><i class="mui-icon iconfont" style="color:'+sex+'</i>'+v.user.yuers+'岁</p>'+
				'</div></li></ul>';   
		  	}); 
			$('#strar').html(html);
	   	},error:function(e){
	   		
	   	} 
   }); 
   
}) 
