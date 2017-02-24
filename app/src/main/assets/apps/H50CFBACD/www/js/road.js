document.addEventListener('plusready', function() {
	var ws = plus.webview.currentWebview();
	var nai=plus.nativeUI.showWaiting()
	setTimeout(function(){
		nai.close()
	},2000)
	
})

var createFragment = function(count) {
	var list = document.getElementById("roadlist");
	var html;
	var acity;
	$.each(count, function(k, v) {
		if(v.loca!=null){
			acity=v.loca;
		}else{
			acity='';
		}
		
		html = '<div class="my"><ul class="mui-table-view" onclick=create("road-cz.html",{roadid:' + v.id + '})>' +
			'<li class="mui-table-view-cell"><img class="lazy"  data-lazyload="' + webRoot + v.img[0] + '" src="../public/img/lazy.gif" style="width:100%;height:200px;"><p class="mui-pull-right mui-icon" style="position:absolute;z-index: 22;top:10px;right:5px">' +
			'<span><i class="iconfont" style="font-size: 12px;">&#xe631;</i>' + v.numb + '</span>' +
			'<span style="margin: 0 10px;"><i class="iconfont" style="font-size: 11px;">&#xe617;</i>'+acity+'</span>' +
			'<span>里程：' + v.mileage + 'km</span></p>' +
			'<h3 style="position: absolute;bottom: 10px;left: 15px;color: white;">' + v.origin + '</h3></li></ul></div>' +
			'<div class="my1"><ul class="mui-table-view">' +
			'<li class="mui-table-view-cell"><span style="font-size: 14px;">风景：</span>';

		switch(v.fengjing) {
			case '1':
				html += '<i class="mui-icon iconfont" style="color: #FFB139;font-size: 13px;">&#xe610;</i>';
				break;
			case '2':
				html += '<i class="mui-icon iconfont" style="color: #FFB139;font-size: 13px;">&#xe610; &#xe610;</i>';
				break;
			case '3':
				html += '<i class="mui-icon iconfont" style="color: #FFB139;font-size: 13px;">&#xe610; &#xe610; &#xe610;</i>';
				break;
			case '4':
				html += '<i class="mui-icon iconfont" style="color: #FFB139;font-size: 13px;">&#xe610; &#xe610; &#xe610; &#xe610;</i>';
				break;
			default:
				html += '<i class="mui-icon iconfont" style="color: #FFB139;font-size: 13px;">&#xe610; &#xe610; &#xe610; &#xe610; &#xe610;</i>';
				break;
		}
		if(v.userxin != null) {
			html += '<span class="mui-pull-right mui-media">' +
				'<img data-lazyload="' + getAvatar(v.userxin.userspic) + '" src="" class="mui-media-object mui-pull-left" />' +
				'<div class="mui-media-body" style="font-size: 14px;line-height: 25px;">' + v.userxin.usersni + '</div></span></li></ul></div>';
		}
		$(html).appendTo($('#roadlist'));

	})
};
(function($) {
	$.ajax({
		type: "get",
		url: apiRoot + "/home/Road/road",
		dataType: 'json',
		success: function(data) {
			createFragment(data);
			$(document).imageLazyload({
				placeholder: '../public/img/lazy.gif'
			});
		},
		error: function(e) {
			console.log(JSON.stringify(e));
		}
	})

})(mui);