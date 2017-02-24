	var index = 1;
	var files = [];
	var picc = "";
document.addEventListener('plusready',function(){
	var aaa = 123;

},false)
//添加图片
function appendpic(p,type){
	plus.nativeUI.showWaiting('图片处理中...');
	//创建新的路径
	files.push({name : "uploadkey" + index,path:p});
	upload(type);
	setTimeout(function(){plus.nativeUI.closeWaiting();},3000)
	
}

//处理
function upload(type){
	 
	if(files.length <= 0){
		toast("请上传头像！");
	}
	 
	var server = apiRoot + "/home/Front/uploadOnePic"; 
	console.log(server);
	var task = plus.uploader.createUpload(server,
	    {method:"post"},
		function(t,status){ //上传完成
			plus.nativeUI.closeWaiting();
			if(status == 200){
				picc = t.responseText;
				if(type==1){
				plus.storage.setItem('userimg',picc);	
				}
				if(type==2){
				plus.storage.setItem('clubpic',picc);	
				}
				if(type==3){
					plus.storage.setItem('strarpic',picc);
				}
				
				files.length==0;
				console.log(webRoot+t.responseText);
				$(".shangchuan").attr('src',webRoot+t.responseText);
				plus.storage.setItem('type',t.responseText)
			}else{
				plus.nativeUI.alert('上传失败：' + status);
				
			}
			
		},function () {
			plus.nativeUI.closeWaiting();
		}
		
	);
	for(var i = 0;i　<　files.length ; i++){
		var f =files[i];
		task.addFile(f.path,{key:f.name});
	}
	task.start();
}
