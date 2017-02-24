document.addEventListener('plusready', function() {
	var ws = plus.webview.currentWebview();
	var sid = ws.sid;
	var userid = plus.storage.getItem('userid');
	var html = "";
	if(sid) {

		$.ajax({
			type: "get",
			url: apiRoot + "/home/Active/myactive",
			data: {
				userid: sid,
			},
			dataType: 'json',
			success: function(data) {
				$('.biaoti').text('动态详情');
				$('#user > img').attr('src', getAvatar(data.ree.userspic));
				$('#username').text(data.ree.usersni);
				$('#dengji').text(data.req);
				$('.activedj').attr('id', data.ree.id)
				$('#money').text(data.ree.usersmoney);
				$('.dz').text(data.ree.usersaddr)
				$('#chat').on('tap', function() {
					if(!userid) { plus.nativeUI.toast('请先登录!'); return; }
					plus.webview.create('club-chat.html', 'club-chat.html', {}, { fid: sid, ftype: 0, fname: data.ree.usersni }).show('pop-in');
				})

				$.each(data.res, function(k, v) {
					html = '<div class="mui-card kong"><div class="mui-card-header mui-card-media">' +
						'<div class="mui-card-media-object mui-pull-left mui-col-xs-2"><img src="' + getAvatar(data.ree.userspic) + '" /></div>' +
						'<div class="mui-card-media-body">' +
						'<span>' + data.ree.usersni + '</span><i class="mui-icon iconfont mui-yellow" style="margin-left: 6px;font-size: 14px;">&#xe605;</i>' +
						'<p class="font-12">' + v.addtime + '</p></div></div>' +
						'<div class="mui-card-content" onclick="activedetails(\'' + v.id + '\',\'' + v.addtime + '\')">' +
						'<div class="mui-card-content-inner"><p style="color: #000000;">' + v.body + '</p>';
					'</div><div class="mui-card-media">' ;

					if(v.imagess != "") {
						$.each(v.imagess, function(k1, v1) {
							if(v1 != "") {
								html += checkTv(v1);
							}
						});
					}
					html += '</div></div><div class="mui-card-footer">' +
						'<button type="button" class="mui-btn" onclick=dz("' + v.id + '")><i class="mui-icon iconfont">&#xe664;</i>赞</button>' +
						'<button type="button" class="mui-btn" onclick="activedetails(\'' + v.id + '\',\'' + v.addtime + '\')"><i class="mui-icon iconfont">&#xe665;</i>评论</button>' +
						'<button type="button" onclick="tshare(\'' + v.id + '\')" class="mui-btn mui-pull-right"><a  href="#room-share" ><i class="mui-icon iconfont">&#xe666;</i>转发</a></button>' +
						'</div></div>';
					$(html).appendTo($('#myactivelist'));
				});

			},
			error: function(e) {

			}
		});

	} else {
		$.ajax({
			type: "get",
			url: apiRoot + "/home/Active/myactive",
			data: {
				userid: userid,
			},
			dataType: 'json',
			success: function(data) {

				$('#user > img').attr('src', getAvatar(data.ree.userspic));
				$('#username').text(data.ree.usersni);
				$('.activedj').attr('id', data.ree.id);
				$('#dengji').text(data.req);
				$('#money').text(data.ree.usersmoney);
				$.each(data.res, function(k, v) {
					html = '<div class="mui-card kong"><div class="mui-card-header mui-card-media">' +
						'<div class="mui-card-media-object mui-pull-left mui-col-xs-2"><img src="' + getAvatar(data.ree.userspic) + '" /></div>' +
						'<div class="mui-card-media-body">' +
						'<span>' + data.ree.usersni + '</span><i class="mui-icon iconfont mui-yellow" style="margin-left: 6px;font-size: 14px;">&#xe605;</i>' +
						'<p class="font-12">' + v.addtime + '</p></div></div>' +
						'<div class="mui-card-content" onclick="activedetails(\'' + v.id + '\',\'' + v.addtime + '\')">' +
						'<div class="mui-card-content-inner"><p style="color: #000000;">' + v.body + '</p>';
					'</div><div class="mui-card-media">';

					if(v.imagess != "") {
						$.each(v.imagess, function(k1, v1) {
							if(v1 != "") {
								html += checkTv(v1);
							}
						});
					}
					html += '</div></div><div class="mui-card-footer">' +
						'<button type="button" class="mui-btn" onclick=dz("' + v.id + '")><i class="mui-icon iconfont">&#xe664;</i>赞</button>' +
						'<button type="button" class="mui-btn" onclick="activedetails(\'' + v.id + '\',\'' + v.addtime + '\')"><i class="mui-icon iconfont">&#xe665;</i>评论</button>' +
						'<button type="button" onclick="tshare(\'' + v.id + '\')" class="mui-btn mui-pull-right"><a><i class="mui-icon iconfont">&#xe666;</i>转发</a></button>' +
						'</div></div>';
					$(html).appendTo($('#myactivelist'));
				});

			},
			error: function(e) {

			}
		});

	}

	$('.activedj').on('click', function() {
		var id = $(this).attr('id');
		console.log(id);
		   	 var new_view = plus.webview.create('./driver-grade.html', 'driver-grade.html', {},{ sid: id });
    	new_view.addEventListener('loaded', function(){
		new_view.show('pop-in', 200);
	})
	});

	$('#zz').on('click', function() {
		$(this).css('display', 'none');
		$('#room-share').css({ 'display': 'none', 'opacity': 0 });
	})

})

function checkTv(tv) {
	var tv_id = tv;
	var index = tv_id.indexOf("."); //得到"."在第几位
	tv_id = tv_id.substring(index); //截断"."之前的，得到后缀

	if(tv_id != ".jpg" && tv_id != ".png" && tv_id != ".git" && tv_id != ".jpeg" && tv_id != ".JPG" && tv_id != ".PNG" && tv_id != ".GIF" && tv_id != ".JPEG" && tv != '') { //根据后缀，判断是否符合视频格式
		var v = tv.split(":");
		return '<video width="100%" height="200" controls="controls"  poster="http://app229.51edn.com' + v[1] + '">' +
			'<source src="http://app229.51edn.com' + v[0] + '" type="video/mp4"></source></video>';
	} else if(tv != '') {
		return '<img class="imag" src="' + webRoot + tv + '"  data-preview-src="" data-preview-group="1" style=" width:32%;height: 90px;"/>';
	}
}

function dz(id) {
	console.log(id)
	var userid = plus.storage.getItem('userid');
	$.ajax({
		type: "get",
		url: apiRoot + "/home/Active/clicklike",
		data: {
			actid: id,
			userid: userid,
		},
		dataType: 'json',
		success: function(data) {
			console.log(data)
			if(data == -1) {
				toast('你已点过赞');
			} else {
				toast('点赞成功');
			}
		},
		error: function(e) {

		}
	});
}

function activedetails(id, adtime, name, pic) {
var userid=plus.storage.getItem('userid')
   	 var new_view = plus.webview.create('./active-details.html', 'active-details.html', {}, { did: id, adtime: adtime, name: name, pic: pic });
    	new_view.addEventListener('loaded', function(){
		new_view.show('pop-in', 200);
	})
}

function tshare(id) {
	var userid = plus.storage.getItem('userid');
	if(!userid) {
		toast('请登入!');
		return;
	}
	console.log(id)
	$('#zz').css('display', 'block')
	$('#room-share').css({ 'display': 'block', 'opacity': 1 })
	plus.storage.setItem('sid', id);
}