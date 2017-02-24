var ws, sex, userid, userpic;
document.addEventListener('plusready', function() {
	//	var userid = plus.storage.getItem('userid');//用户id
	ws = plus.webview.currentWebview();
	var wsid = ws.wsid; //地址详情页
	userid = ws.usersid;
	var html = "";
	$.ajax({
		type: "get",
		url: apiRoot + "/home/user/usersdata",
		data: {
			userid: userid
		},
		dataType: 'json',
		success: function(data) {
			console.log(JSON.stringify(data));
			if(!data.userspic) {
				html += '<img class="mui-media-object mui-pull-left userimg" id="userpic" src="../public/img/4.jpeg" cname="userpic"/>';
			} else {
				html += '<img class="mui-media-object mui-pull-left userimg" id="userpic"  src="' + getAvatar(data.userspic) + '" cname="userpic"/>';
			}
			$('#userlogo').html(html);
			plus.storage.setItem('userimg', data.userspic);
			$('.usersni').val(data.usersni);
			$('.sex').val(data.sex);
			$('.namez').val(data.namez);
			$('.birthday').val(data.birthday);
			$('.usersaddr').val(data.usersaddr);
			$('.usersphone').val(data.usersphone);
			$('.phone').val(data.phone);
			$('.zhiye').val(data.occupation);
			$('.usersemail').val(data.usersemil);
			img()
		},
		error: function(e) {
			console.log(JSON.stringify(e));
		}

	});

	$('#bth').on('click', function() {

		var userpic = plus.storage.getItem('userimg');
		if(!userpic) {
			var userpic = plus.storage.getItem('userspic');
			console.log(userpic);
		}
		var usersni = $('.usersni').val();
		var sex = $('.sex').val();
		var namez = $('.namez').val();
		var birthday = $('.birthday').val();
		var useraddr = $('.usersaddr').val();
		var zhiye = $('.zhiye').val();
		var useremail = $('.usersemail').val();
		var phone = $('.phone').val();
		if(!phone.match(p1)) {
			plus.nativeUI.toast('请输入正确的手机号!');
			return;
		}
		if(!birthday.match(a)) {
			plus.nativeUI.toast('请输入正确的日期!');
			return;
		}
		if(!useremail.match(ema)) {
			plus.nativeUI.toast('请输入正确的邮箱!');
			return;
		}
		$.ajax({
			type: "get",
			url: apiRoot + "/home/user/userdatadel",
			data: {
				aid: 　userid,
				usersni: 　usersni,
				sex　: 　sex,
				namez　: 　namez,
				userspic　: 　userpic,
				Birthday: birthday,
				usersaddr: useraddr,
				occupation: zhiye,
				usersemil: useremail,
				phone: phone
			},
			dataType: 'json',
			success: function(data) {
				console.log(userpic);
				if(data > 0) {
					plus.storage.setItem('userspic',userpic);
					plus.storage.setItem('usersni', usersni);
					plus.nativeUI.toast('修改成功!')
					plus.webview.getWebviewById(wsid).reload();
					plus.webview.getWebviewById("my.html").reload();
					setTimeout(function() {
						ws.close();
					}, 1500);
				}
			},
			error: function(e) {
				console.log(JSON.stringify(e));
			}
		});

	})

})

function img() {
	$('.userimg').on('click', function() {
		type = $(this).attr('cname'); //区分照片
		console.log(type)
		plus.nativeUI.actionSheet({ cancel: "取消", buttons: [{ title: "拍照添加" }, { title: "相册添加" }] }, function(e) {
			if(e.index == 1) {
				var car = plus.camera.getCamera();
				car.captureImage(function(path) {
					//展示图片
					$("img[cname='" + type + "']").attr('src', 'file://' + plus.io.convertLocalFileSystemURL(path));
					var pic;
					var iosa = plus.os.name;
					if(iosa == 'iOS') {
						pic = path;
					} else {
						pic = plus.io.convertLocalFileSystemURL(path);
					}
					console.log(pic)
					appendpic(pic, 1);
				}, function(err) {});

			} else if(e.index == 2) {
				plus.gallery.pick(function(path) {
					var pic;
					var iosa = plus.os.name;
					if(iosa == 'iOS') {
						pic = path;
					} else {
						pic = plus.io.convertLocalFileSystemURL(path);
					}
					$("img[cname='" + type + "']").attr('src', path);
					appendpic(pic, 1);
				});
			}
		});
	})
}