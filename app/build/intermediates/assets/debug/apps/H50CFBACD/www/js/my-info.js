var ws ,sex ,userid;
document.addEventListener('plusready',function(){
	ws = plus.webview.currentWebview();
	userid = plus.storage.getItem('userid');//用户id
	var userspic = plus.storage.getItem('userspic');
	var usersni = plus.storage.getItem('usersni');
	if(userspic) {
			$('#userlogo>img').attr('src',getAvatar(userspic));
		}
	$('.usersname').text(usersni); 
   var html = "";
  	$.ajax({
    	type:"get",
    	url:apiRoot+"/home/user/usersdata",
    	data : {
    		userid : userid
    	},
    	dataType:'json',
    	success:function(data){
    		$('.sex').text(data.sex);  
    		$('.namez').text(data.namez); 
    		$('.birthday').text(data.birthday); 
    		$('.usersaddr').text(data.usersaddr); 
    		$('.usersphone').text(data.usersphone); 
    		$('.phone').text(data.phone); 
    		$('.zhiye').text(data.occupation); 
    		$('.usersemail').text(data.usersemil); 
    	},error:function(e){
    		console.log(JSON.stringify(e)); 
    	}
    	  
    });


})
function userdatadel(){
    
	plus.webview.create('./my-infor1.html','my-infor1.html',{},{usersid : userid ,wsid : ws.id}).show('pop-in',250); 

}