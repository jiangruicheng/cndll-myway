document.addEventListener('plusready',function(){
	var ws = plus.webview.currentWebview();
	var userid = plus.storage.getItem('userid');
	var html = "";
	if(ws.sid){
		id=ws.sid;
	}else{
		id=userid;
	}
	$.ajax({
		type:"get",
		url:apiRoot+"/home/user/driver", 
		data : {
			userid : id,
		}, 
		dataType:'json',  
		success:function(data){ 
			console.log(JSON.stringify(data))
			$('#userlogo > img').attr('src',getAvatar(data.ree.userspic));
			$('#username').text(data.ree.usersni);
			$('#dj').text(data.ree.usersintegral); 
			$.each(data.req, function(k,v){
			html += '<ul class="mui-table-view mui-grid-view">'+
					'<li class="mui-table-view-cell mui-col-xs-3 "><span>'+v.id+'</span></li>'+
					'<li class="mui-table-view-cell mui-col-xs-3 "><span>'+v.drivername+'</span></li>'+
					'<li class="mui-table-view-cell mui-col-xs-3 "><span>'+v.drivergo+'</span></li>'+
					'<li class="mui-table-view-cell mui-col-xs-3 "><span>'+v.driverover+'</span></li></ul>';
				
			});
			$('.my').html(html);
		},error:function(e){ 
			console.log(JSON.stringify(e))
		} 
	});
	
})