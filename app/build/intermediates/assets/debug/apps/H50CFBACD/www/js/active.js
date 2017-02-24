document.addEventListener('plusready', function() {
	var ws = plus.webview.currentWebview();

})

function activelist(data) {
	var html = "";
	var xhtml = "";
	$.each(data, function(k1, v1) {
		if(v1.qufen == 0) {
			html = '<ul class="mui-table-view"><div class="mui-card kong">' +
				'<div class="mui-card-header mui-card-media"><div class="mui-card-media-object mui-pull-left mui-col-xs-2">' +
				'<img  src="' + adminimg + '">' +
				'</div><div class="mui-card-media-body">' +
				'<span>' + adminname + '</span><i class="mui-icon iconfont mui-yellow" style="margin-left: 6px;font-size: 14px;">&#xe605;</i>' +
				'<p class="font-12">' + v1.addtime + '</p></div>' +
				'</div><div class="mui-card-content" onclick="newactivedetails(\'' + v1.id + '\',\'' + v1.addtime + '\')">' +
				'<div class="mui-card-content-inner"><p style="color: #000000;">' + v1.body + '</p></div>' +
				'<div class="mui-card-media">';
			if(v1.imagess != "") {
				$.each(v1.imagess, function(k2, v2) {
					html += '<img class="imag" data-lazyload="' + webRoot + v2 + '" src="../public/img/lazy.gif"/>';
				})
			}

			html += '</div></div><div class="mui-card-footer">' +
				'<button type="button" class="mui-btn" onclick=clicklike("' + v1.id + '")><i class="mui-icon iconfont">&#xe664;</i>赞</button>' +
				'<button type="button" class="mui-btn" onclick="newactivedetails(\'' + v1.id + '\',\'' + v1.addtime + '\')"><i class="mui-icon iconfont">&#xe665;</i>评论</button>' +
				'<button type="button"  onclick="tshare(\'' + v1.id + '\')" class="mui-btn mui-pull-right"><a href="#"   style="color: black;"><i class="mui-icon iconfont">&#xe666;</i><span>转发</span></a></button>' +
				'</div></div></ul>';

		}
		$(html).appendTo($('.activelist'));
	});
	//	nat.close();
}

function mylist(data) {
	$.each(data, function(k1, v1) {
		if(v1.qufen == 1) {
			xhtml = '<ul class="mui-table-view"><div class="mui-card ko  ng">' +
				'<div class="mui-card-header mui-card-media">' +
				'<div class="mui-card-media-object mui-pull-left mui-col-xs-2">' +
				'<img src="' + getAvatar(v1.user.userspic) + '"   data-preview-src="" data-preview-group="2" /">' +
				'</div><div class="mui-card-media-body">' +
				'<span>' + v1.user.usersni + '</span><i class="mui-icon iconfont mui-yellow" style="margin-left: 6px;font-size: 14px;">&#xe605;</i>' +
				'<p class="font-12">' + v1.addtime + '</p></div></div>' +
				'<div class="mui-card-content" onclick="newactivedetails(\'' + v1.id + '\',\'' + v1.addtime + '\')">' +
				'<div class="mui-card-content-inner" >' +
				'<p style="color: #000000;">' + v1.body + '</p>' +
				'</div><div class="mui-card-media">';
			if(v1.imagess != "") {
				$.each(v1.imagess, function(k3, V3) {
					xhtml += checkTv(V3);
				});
			}
			xhtml += '</div></div><div class="mui-card-footer">' +
				'<button type="button" class="mui-btn" onclick=clicklike("' + v1.id + '") ><i class="mui-icon iconfont">&#xe664;</i>赞</button>' +
				'<button type="button" class="mui-btn" onclick="newactivedetails(\'' + v1.id + '\',\'' + v1.addtime + '\')"><i class="mui-icon iconfont">&#xe665;</i>评论</button>' +
				'<button type="button" onclick="tshare(\'' + v1.id + '\')" class="mui-btn mui-pull-right"><a href="#"    style="color: black;"><i class="mui-icon iconfont">&#xe666;</i><span>转发</span></a></button>' +
				'</div></div></ul>';
		}
		$(xhtml).appendTo($('#mylist'));
	})
}

function checkTv(tv) {
	var tv_id = tv;
	var index = tv_id.indexOf("."); //得到"."在第几位
	tv_id = tv_id.substring(index); //截断"."之前的，得到后缀

	if(tv_id != ".jpg" && tv_id != ".png" && tv_id != ".git" && tv_id != ".jpeg" && tv_id != ".JPG" && tv_id != ".PNG" && tv_id != ".GIF" && tv_id != ".JPEG" && tv != '') { //根据后缀，判断是否符合视频格式
		var v = tv.split(":");
		return '<video width="100%" height="200" controls="controls"  poster="http://app229.51edn.com' + v[1] + '">' +
			'<source src="http://app229.51edn.com' + v[0] + '" type="video/mp4"></source></video>';
	} else if(tv != '') {
		return '<img class="imag" data-lazyload="' + webRoot + tv + '" src="../public/img/lazy.gif" data-preview-src="" data-preview-group="1"/>';
	}
}

function fanda() {
	var timeout;
	$(".imag").mousedown(function() {
		var i = $(this).attr('src');
		timeout = setTimeout(function() {

			$('#itma').attr('src', i);
			$('#itma').css('display', 'block');
		}, 500);
	});

	$(".imag").mouseup(function() {
		clearTimeout(timeout);
		$("#mydiv").text("out");
	});

	$(".imag").mouseout(function() {
		clearTimeout(timeout);

	});

	$('#itma').click(function() {
		$(this).css('display', 'none');
	})
}

function newactivedetails(id, adtime) {
	var userid=plus.storage.getItem('userid')
   	 var new_view = plus.webview.create('./active-details.html', 'active-details.html', {}, { did: id, adtime: adtime });
    	new_view.addEventListener('loaded', function(){
		new_view.show('pop-in', 200);
	})
	
}

function clicklike(id) {
	var userid = plus.storage.getItem('userid');
	$.ajax({
		type: "get",
		url: apiRoot + "/Home/Active/clicklike",
		data: {
			actid: id,
			userid: userid
		},
		dataType: 'json',
		success: function(data) {
			console.log(data)
			if(data < 0) {
				toast('已经赞过了');
			} else {
				plus.nativeUI.toast('+1');
			}
		},
		error: function(e) {

		}

	});

}

$('#zzc').click(function() {
	$(this).css('display', "none")
	$('#room-share').css('opacity', '0')
	$('#room-share').css('display', 'none');
})

function tshare(id) {
	console.log(id)
	if($('#room-share').css('display') == 'block') {
		$('#room-share').css('display', 'none')
		$('#room-share').css('opacity', '0')

	} else {
		$('#zzc').css('display', "block")
		$('#room-share').css('opacity', '1')
		$('#room-share').css('display', 'block');
	}
	plus.storage.setItem('sid', id);

}