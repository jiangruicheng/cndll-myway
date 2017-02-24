document.addEventListener('plusready',function(){
   var ws = plus.webview.currentWebview();
   var userid = plus.storage.getItem('userid');
   var cludid = ws.cludid;
   var spage = ws.spage;
   $.ajax({
	   	type:"get",
	   	url:apiRoot+"/home/club/clubxinxi",
	   	data :{
	   		cludid : cludid
	   	},
	   	dataType:'json',
	   	success:function(data){
	   		$('#clubimg >img').attr('src',webRoot+data.res.avatar);
			$('#clubname').val(data.res.name);
			$('#cityResult').val(data.res.info);
			$('#clubtext').val(data.res.address);
	   	},error:function(e){
	   		
	   	}
   });
   
   $('.userimg').on('click',function(){ 
		type = $(this).attr('cname');//区分照片
		plus.nativeUI.actionSheet({cancel:"取消",buttons:[{title:"拍照添加"},{title:"相册添加"}]},function(e){
			if(e.index == 1){
				var car =plus.camera.getCamera();
				car.captureImage(function(path){
					//展示图片
				var pic=plus.io.convertLocalFileSystemURL(path);
					$("img[cname='"+type+"']").attr('src','file://' + plus.io.convertLocalFileSystemURL(path));
					var pic;
					var iosa = plus.os.name;
					if(iosa == 'iOS') {
						pic = path;
					} else {
						pic = plus.io.convertLocalFileSystemURL(path);
					}
					appendpic(pic,2);
				},function(err){});
				
			}else if(e.index == 2){
				plus.gallery.pick(function(path){
					$("img[cname='"+type+"']").attr('src',path);
				  var pic;
					var iosa = plus.os.name;
					if(iosa == 'iOS') {
						pic = path;
					} else {
						pic = plus.io.convertLocalFileSystemURL(path);
					}
					appendpic(pic,2);
				});
			}
		});
	})
   
   $('#wanc').on('click',function(){
   	
	   	var clubname = $('#clubname').val();
		var cityResult = $('#cityResult').val();
		var clubtext =$('#clubtext').val();
   		var avatar =plus.storage.getItem('clubpic');
   		 console.log(avatar)
   		 if(!clubname || !cityResult || !clubtext || !avatar){
    	 	plus.nativeUI.toast('请输入完整信息！');return;
    	 }
   	    $.ajax({
   	    	type:"get",
   	    	url:apiRoot+"/home/club/clubbj",
   	    	data : {
   	    		aid : cludid,
   	    		name : clubname,
   	    		info : cityResult,
   	    		address : clubtext,
   	    		avatar : avatar
   	    	},
   	    	dataType:'json',
   	    	success:function(data){
   	    		plus.webview.getWebviewById('club-message.html').reload();
					plus.nativeUI.closeWaiting();
					toast('修改成功');
					plus.storage.setItem('clubpic',null);
   	    	},error:function(e){
   	    		console.log(JSON.stringify(e));
   	    	}
   	    	
   	    });
   	
   })
   
   

})