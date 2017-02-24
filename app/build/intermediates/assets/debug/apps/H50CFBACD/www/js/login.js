var jingdu = weidu = 0;
var auths = [];
var map;
document.addEventListener('plusready', function() {
	var ws = plus.webview.currentWebview();
	var fid = ws.fid;
	var userid=plus.storage.getItem('userid');
	if(userid){
		 plus.webview.close();
		 relogin(plus.webview.currentWebview().id);
	}   
	var first = null;
	//获取登录权限列表 
	plus.oauth.getServices(function(data) {
		for(var i in data) {
			var service = data[i];
			auths[service.id] = service;
		}
	}, function(e) {
		toast('获取第三方登录失败!');
	})
	var ws = plus.webview.currentWebview();
	var first = null;
	mui.back = function() {
		//首次按键，提示‘再按一次退出应用’
		if(!first) {
			first = new Date().getTime();
			mui.toast('再按一次退出应用');
			setTimeout(function() {
				first = null;
			}, 2000);
		} else {
			if(new Date().getTime() - first < 2000) {
				plus.runtime.quit();
			}
		}
	};

	$('#login').on('click', function() {
			var phone = $('#phone1').val();
			var pas = $('#pass').val();

			if(!phone || !pas) {
				plus.nativeUI.toast('不能为空');
				return;
			}
			plus.nativeUI.showWaiting();
			$.ajax({
				type: 'get',
				url: apiRoot + "/home/user/login",
				data: {
					username: phone,
					userpass: pas
				},
				dataType: 'json',
				success: function(data) {
					plus.nativeUI.closeWaiting()
					if(data!=0) {
						var sid = data.aid;
						plus.storage.setItem('userid', data.aid);
						plus.storage.setItem('userspic', data.userspic);
						plus.storage.setItem('usersni', data.usersni);
						plus.webview.close();
						relogin(plus.webview.currentWebview().id);
					} else {
						plus.nativeUI.toast('账号密码错误');
					}
				},
				error: function(e) {
					console.log(JSON.stringify(e));
				}
			});

		})
		//第三方登录
	$('.qq').on('click', function() {
		plus.nativeUI.toast('登入中...');
		oauthLogin('qq');
	})
	$('.wx').on('click', function() {
		plus.nativeUI.toast('登入中...');
		oauthLogin('weixin');
	})

	$('.weibo').on('click', function() {
		plus.nativeUI.toast('登入中...');
		oauthLogin('sinaweibo');
	})

})

/* 权限认证
 * @param {Object} id
 */
function oauthLogin(id) {
	var s = auths[id];
	if(!s.authResult) {
		s.login(function(success) {
			getAuthsInfo(id);
			return;
		}, function(e) {
			toast('登录认证失败');
			return;
		})
	} else {
		getAuthsInfo(id);
		return;
	}
}
/**
 * 获取用户信息
 */
function getAuthsInfo(id) {
	var s = auths[id],
		userinfo = null,
		user = null,
		avatar = null,
		openid = null,
		oauthtype = s.id,
		name = null,
		openid = null;
	s.getUserInfo(function(data) {
		userinfo = data.target.userInfo;
		//			console.log(JSON.stringify(userinfo))

		switch(oauthtype) {
			case 'weixin':
				avatar = userinfo.headimgurl; //头像 
				name = userinfo.nickname;
				openid = data.target.authResult.openid;
				break;
			case 'qq':
				avatar = userinfo.figureurl_qq_2; //头像 
				name = userinfo.nickname;
				openid = data.target.authResult.openid;
				break;
			case 'sinaweibo':
				avatar = userinfo.profile_image_url;
				name = userinfo.screen_name;
				openid = userinfo.idstr;
				break;
			default:
				break;
		}
		$.ajax({
			url: apiRoot + '?m=home&c=user&a=oauthLogin',
			type: 'get',
			data: {
				openid: openid,
				userlogo: avatar,
				title: name,
				oauthtype: oauthtype
			},
			dataType: 'json',
			success: function(data) {
				var siid = data.id;
				if(data) {
					plus.storage.setItem('userid', data.id);
					plus.storage.setItem('usersni', data.usersni);
					plus.storage.setItem('userspic', data.userspic);
					plus.webview.close();
					relogin(plus.webview.currentWebview().id);
				} else {
					plus.nativeUI.toast('获取用户信息失败！');
				}
			},
			error: function(e) {
				plus.nativeUI.closeWaiting();

				errortoast(e);
			}
		});

	}, function() {
		toast('获取用户信息失败');
		return;
	})
}

function relogin(_self) {
	var all = plus.webview.all();
	for(var i in all) {
	var aaa = plus.runtime.appid;
	if(all[i].id !==aaa && all[i].id !== _self) {	all[i].close();
		}
    }
			var nwaiting = plus.nativeUI.showWaiting(); //显示原生等待框
			var webviewContent = plus.webview.create('./index.html','index.html'); //后台创建webview并打开show.html
	
         webviewContent.addEventListener("loaded", function(e) { //注册新webview的载入完成事件
		
				nwaiting.close(); //新webview的载入完毕后关闭等待框
				plus.nativeUI.closeWaiting()
				webviewContent.show("slide-in-right",20); //把新webview窗体显示出来，显示动画效果为速度200毫秒的右侧移入动画
			}, false);
}