var points = []; //原始点信息数组  
var bPoints = []; //百度化坐标数组。用于更新显示范围。 
var pointss = marker = '';
var map;
var marker;
var wc;
document.addEventListener('plusready', function() {
	wc = plus.webview.currentWebview();
	map = new BMap.Map("allmap");
	map.enableScrollWheelZoom(); //滚轮放大缩小  
	map.clearOverlays(); //清除标注，划线
	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r) {
		if(this.getStatus() == BMAP_STATUS_SUCCESS) {
			console.log('您的位置：' + r.point.lng + ',' + r.point.lat);
			var jingdu = r.point.lng;
			var weidu = r.point.lat;
			var point = new BMap.Point(jingdu, weidu);
			map.centerAndZoom(point, 14);
			map.enableScrollWheelZoom(true);
			marker = new BMap.Marker(point); // 创建标注
			marker.setLabel('当前位置');
			var label = new BMap.Label('当前位置',{
				"offset": new BMap.Size(9, -15)
			});
			marker.setLabel(label);
			map.addOverlay(marker); // 将标注添加到地图中
			map.panTo(point);
//			 var lng1 = '113.' + getRandom(828389)
//			var lat1 = '22.' + getRandom(745981)
//			var lng2 = '113.' + getRandom(828389)
//			var lat2 = '22.' + getRandom(745981)
//			var lng3 = '113.' + getRandom(828389)
//			var lat3 = '22.' + getRandom(745981)
//			var qmap = "[{'longitude':" + lng1 + ",'latitude':" + lat1 + "},{'longitude':" + lng2 + ",'latitude':" + lat2 + "},{'longitude':" + lng3 + ",'latitude':" + lat3 + "}]";
//			dynamicLine(qmap)
		} else {
			console.log('failed' + this.getStatus());
		}
	}, {
		enableHighAccuracy: true
	})


	plusReady()

})
$('#fen').on('tap', function() {
	if($('#room-share').css('display') == 'block') {
		$('#room-share').css('display', 'none')
	} else {
		nativeObj()
		setTimeout(function(){    
		$('#room-share').css('display', 'block');
		
		},1500); 
    }
})
function carlocation(lnglat){
	var userid=plus.storage.getItem('userid')
	$.ajax({
		type:'post',
		url:apiRoot+'/home/Road/todayroad',
		data:{uid:userid,location:lnglat}, 
		dataType:'json',
		success:function(data){
		  console.log(data.code)	
		},error:function(e){
			console.log(JSON.stringify(e))
		}
	})
}

//添加线  
function addLine(points) {

	var linePoints = [],
		pointsLen = points.length,
		i, polyline;
	if(pointsLen == 0) {
		return;
	}
	// 创建标注对象并添加到地图     
	for(i = 0; i < pointsLen; i++) {
		linePoints.push(new BMap.Point(points[i].lng, points[i].lat));
	}
	polyline = new BMap.Polyline(linePoints, {
		strokeColor: "blue",
		strokeWeight: 3,
		strokeOpacity: 0.7
	}); //创建折线  
	map.addOverlay(polyline); //增加折线  
}

//随机生成新的点，加入到轨迹中。  
function dynamicLine(lnglat) {
	carlocation(lnglat)
	var obj = eval('(' + lnglat + ')');
	plus.storage.setItem('map', lnglat)
	$.each(obj, function(index, v){
		var lng = v.longitude;
		var lat = v.latitude;
		var cord = lng + "," + lat;
		console.log(cord)
		plus.storage.setItem('coord', cord)
		var id = getRandom(1000);
		var point = {
			"lng": lng,
			"lat": lat,
			"status": 1,
			"id": id
		}
		var makerPoints = [];
		var newLinePoints = [];
		var len;
		makerPoints.push(point);
		addMarker(makerPoints); //增加对应该的轨迹点  
		points.push(point);
		bPoints.push(new BMap.Point(lng, lat));
		len = points.length;
		newLinePoints = points.slice(len - 2, len); //最后两个点用来画线。  

		addLine(newLinePoints); //增加轨迹线  
		setZoom(bPoints);
		//  getDistance(lng,lat)

	});
}

// 获取随机数  
function getRandom(n) {
	return Math.floor(Math.random() * n + 1)
}

//在轨迹点上创建图标，并添加点击事件，显示轨迹点信息。points,数组。		
function addMarker(points) {
	var pointsLen = points.length;
	//	alert(pointsLen);
	if(pointsLen == 0) {
		return;
	}
	var myIcon = new BMap.Icon(" track.ico ", new BMap.Size(6, 6), {
		offset: new BMap.Size(6, 6)
	});
	//
	// //创建标注对象并添加到地图   			
	for(var i = 0; i < pointsLen; i++) {
		pointss = new BMap.Point(points[i].lng, points[i].lat);
		marker = new BMap.Marker(pointss, {
			icon: myIcon
		});
		map.addOverlay(marker);
	}

}

//根据点信息实时更新地图显示范围，让轨迹完整显示。设置新的中心点和显示级别  
function setZoom(bPoints) {
	var view = map.getViewport(eval(bPoints));
	var mapZoom = view.zoom;
	var centerPoint = view.center;
	map.centerAndZoom(centerPoint, mapZoom);
}

function plusReady() {
	//	nativeObj();
	$('#weixin').on('tap', function() {
			shareChange(1);
		}) //微信
	$('#wxsline').on('tap', function() {
			shareChange(2);
		}) //朋友圈
	$('#qq').on('tap', function() {
			shareChange(0);
		}) //qq
	$('#kone').on('tap', function() {
			shareChange(0);
		}) //qq空间
	updateSerivces();
	if(plus.os.name == "Android") {
		Intent = plus.android.importClass("android.content.Intent");
		File = plus.android.importClass("java.io.File");
		Uri = plus.android.importClass("android.net.Uri");
		main = plus.android.runtimeMainActivity();
	}
}
/**
 * 更新分享服务
 */
function nativeObj() {
	var bitmap = new plus.nativeObj.Bitmap('nattmap');
	 setTimeout(function(){
			wc.draw(bitmap,function(){
				console.log('绘制图片成功');
			},function(e){
				console.log('绘制图片失败：'+JSON.stringify(e)); 
			});	
	 },1000);//动态生成新的点
	     setTimeout(function(){    
				var name = (new Date()).valueOf();
				bitmap.save( "_doc/"+name+".png"
				,{}
				,function(i){
					console.log(i.target);
					//console.log('保存图片成功：'+JSON.stringify(i));
					clipImage(i.target);
					plus.storage.setItem('fximg',i.target);
					
				}
				,function(e){
					console.log('保存图片失败：'+JSON.stringify(e));
				});	
		},1500); 		
}
function clipImage(name){ 
			plus.zip.compressImage({
			src:name,
			dst:name,
			overwrite:true,
			clip:{top:"10%",left:"0%",width:"90%",height:"100%"}	 // 裁剪图片中心区域
			},
			function() {
				console.log("保存成功!");
				var jietu = plus.storage.getItem('fximg');
			},function(error) {
				alert(name); 
			
			});
		}

function updateSerivces() {
	plus.share.getServices(function(s) {
		shares = {};
		for(var i in s) {
			var t = s[i];
			shares[t.id] = t;
		}
	}, function(e) {
		plus.nativeUI.toast("获取分享服务列表失败：" + e.message);
	});
}
/**
 * 弹出分享平台选择
 */
function shareChange(i) {
	//	alert(i);
	//	var uid = plus.storage.getItem('phone');
	//	uid = uid?uid:'';
	var ids = [{
		id: "qq"
	}, {
		id: "weixin",
		ex: "WXSceneSession"
	}, {
		id: "weixin",
		ex: "WXSceneTimeline"
	}, {
		id: "sinaweibo"
	}];
	var s = shares[ids[i].id];
	if(s.authenticated) {
		shareMessage(shares[ids[i].id], ids[i].ex);
	} else {
		s.authorize(function() {
			shareMessage(shares[ids[i].id], ids[i].ex);
		}, function(e) {
			plus.nativeUI.alert("认证授权失败" + e.message, null, '提示');
		});
	}
}
/**
 * 发送分享消息
 * @param {plus.share.ShareService} s
 */
function shareMessage(s, ex) {
		console.log(plus.storage.getItem('fximg'));
	$('.mui-backdrop').remove();
	var fmap = plus.storage.getItem('fximg');
	fmap = fmap ? fmap : '';
	//	alert(uid);
	var arr=new Array(fmap);
	var msg = {
		title: 'Myway',
		extra: {
			scene: ex
		},
		content: "亲，您的好友的今日路径！",
		pictures:[fmap],
		thumbs: ['/images/17.png']
	};
	s.send(msg, function() {
		plus.nativeUI.toast("分享成功");
		$('#Popover_0').hide();
		$('#room-share').css('display', 'none')
	}, function(e) {
		//		console.log(JSON.stringify(e));
		plus.nativeUI.toast("分享失败");
		$('#Popover_0').hide();
		$('#room-share').css('display', 'none')
	});
}
//裁剪图片
