var userid
document.addEventListener('plusready', function() {
	userid = plus.storage.getItem('userid'); //用户id
	PullToRefresh(plus.webview.currentWebview())
	var html = "";
	var userspic = plus.storage.getItem('userspic');
	var usersni = plus.storage.getItem('usersni');
	console.log(getAvatar(userspic))
	if(userspic) {
			$('.imgs').attr('src',getAvatar(userspic));
		}
	$.ajax({
		type: "get",
		url: apiRoot + "/home/user/my",
		data: {
			userid: userid
		},
		dataType: 'json',
		success: function(data) {
//			console.log(JSON.stringify(data));
			if(data.res) {
				
				if(!usersni) {
					$('.userni').html(data.res.title)
				} else {
					$('.userni').html(usersni)
				}
				if(data.res.sex == 0) {
					$('.sex').html('&#xe621;')
				} else {
					$('.sex').html('&#xe620;')
				}
				$('.drivername').text(data.rew.drivername);
                $('.usersmoney').text(data.res.usersmoney);
				if(data.rex.code == 1001) {
                   $('.vip').css('display','block')
				}
            }
      },
		error: function(e) {

		}

	});
	$('#qiandao').on('click', function() {
		if(!userid) {
			alert('您还没有登录！！');
			return;
		}
		$.ajax({
			type: "get",
			url: apiRoot + "/home/user/qiandao",
			data: {
				userid: userid
			},
			dataType: 'json',
			success: function(data) {
				if(data > 0) {
					toast('签到成功');
				} else {
					toast('已经签到过!')
				}
			},
			error: function(e) {
				console.log(JSON.stringify(e))
			}

		});
	})

})

function usersdata() {
		plus.webview.create('./my-infor.html', 'my-infor.html', {}, { usersid: id }).show('pop-in', 250);
}

function driver(id) {
	plus.webview.create('./driver-grade.html', 'driver-grade.html', {}, { usersid: id }).show('pop-in', 250);
}

function login() {
	plus.webview.create('./login.html', 'login.html', {}, {}).show('pop-in', 250);
}