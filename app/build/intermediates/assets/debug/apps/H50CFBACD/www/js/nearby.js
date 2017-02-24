var map,id;
document.addEventListener('plusready',function(){
	 id = plus.storage.getItem('userid');
	var usersni = plus.storage.getItem('usersni');
	var userspic = plus.storage.getItem('userspic');
	console.log(usersni);
	$('.name').text(usersni);
	$('.userspic').attr('src',getAvatar(userspic));
	if(!id){  
		alert('你还没有登录');return;
	}
	$("#allmap").css({'width':$(window).width()})
		
	//地图
loadBaiduMap()
	 
	plus.nativeUI.showWaiting();
	var opts = {
					width : 200,     // 信息窗口宽度
					height: 75,     // 信息窗口高度
					title : '' , // 信息窗口标题
					enableMessage:true//设置允许信息窗发送短息
				   };
	$.ajax({
		type:"post",
		url:apiRoot + "?m=home&c=Nearby&a=fujin",
		data:{id:id},
		dataType:'json',
		success:function(data){
			plus.nativeUI.closeWaiting();
			
			data.other.sort(function(b, a) {//正序   
			    return b.juli - a.juli;
			});
			if(data.other.length > 0){
				var html = '';
				$.each(data.other, function(k,v) {console.log(v.juli); 
					var sex = v.sex == "男"?'&#xe614;':'&#xe615;';
					if (v.juli > 1000) {
						var juli = Math.round(v.juli / 1000, 1) + 'km';
					}else{
						var juli = v.juli+'m';
					} 
					html += '<ul class="mui-table-view">'+
								'<li class="mui-table-view-cell mui-media">'+
									'<img class="mui-media-object mui-pull-left dongtai" src="'+ (v.userspic?getuserPic(v.userspic):'../public/img/1.jpg') +'" data-id="'+ v.aid +'"/>'+
									'<div class="mui-media-body">'+
										'<span style="line-height: 25px;">'+ (v.namez ?v.namez :v.user) +'</span><span style="float: right;line-height: 55px;font-size: 14px;">'+ juli +'</span>'+
										'<p><i class="mui-icon iconfont" style="color: '+(v.sex == "男" ? '#54A1FF' : '#FFA2A2')+';">'+ sex +'</i> '+ (v.yuers ? v.yuers+'岁' : '0岁') +'</p>'+
									'</div>'+
								'</li>'+
							'</ul>';  
				});
				$('.mui-scroll').html(html);
				$('.dongtai').unbind('click');
				$('.dongtai').on('click',function(){
					var sid = $(this).attr('data-id');
				})
				
			}
		},
		error:function(e){
			plus.nativeUI.closeWaiting();
			console.log(JSON.stringify(e));
		}
	});
},false)

function loadBaiduMap(){
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'http://api.map.baidu.com/api?v=2.0&ak=B58QVrfpCwUPxY8h11UoWADPoUe2aPyY&' +
            'callback=initialize';
        document.body.appendChild(script);
    }

function initialize(){
			    map = new BMap.Map("allmap");
			    map.enableScrollWheelZoom();
				var geolocation = new BMap.Geolocation();
				geolocation.getCurrentPosition(function(r) {
					if(this.getStatus() == BMAP_STATUS_SUCCESS) {
						var jingdu = r.point.lng;
						var weidu = r.point.lat;
						//显示地图
						var point = new BMap.Point(jingdu, weidu);
						map.centerAndZoom(point, 16);
						// 用经纬度设置地图中心点
						var myIcon = new BMap.Icon("../public/img/map.png", new BMap.Size(12, 22));
						var smarker = new BMap.Marker(point, { icon: myIcon });
						smarker.setLabel('当前位置');
						var label = new BMap.Label('当前位置', { "offset": new BMap.Size(9, -15) });
						smarker.setLabel(label);
						map.addOverlay(smarker); // 将标注添加到地图中
						addmap()
					} else {
						alert('failed' + this.getStatus());
					}
				}, { enableHighAccuracy: true })
			}


function addmap(){
	$.ajax({
		type:"post",
		url:apiRoot + "?m=home&c=Nearby&a=fujin",
		data:{id:id},
		dataType:'json',
		success:function(data){
				$.each(data.other, function(k1,v1) {
					$('#years').html('<p><i class="mui-icon iconfont" style="color: '+(v1.sex == "男" ? "#54A1FF" : "#FFA2A2")+';">'+(v1.sex == "男" ? "&#xe614;" : "&#xe615;")+'</i>'+ (v1.yuers ? v1.yuers+'岁' : '0岁') +'</p>')
					if(v1.zuobiao){ 
						var zuobiao = v1.zuobiao.split(',');
						var point = new BMap.Point(zuobiao[0],zuobiao[1]);
						var myIcon = new BMap.Icon("http://app229.51edn.com/api/Public/images/map.png", new BMap.Size(22,32));
						var smarker = new BMap.Marker(point,{icon:myIcon});
						smarker.setLabel('当前位置');
						var label = new BMap.Label((v1.namez ? v1.namez : v1.user),{"offset":new BMap.Size(9,-15)}); 
						smarker.setLabel(label);
						map.addOverlay(smarker); 
						addClickHandler(v1.namez,v1.juli,v1.user,v1.yuers,v1.aid,v1.userspic,smarker);
					}
				});
			
		},
		error:function(e){
			plus.nativeUI.closeWaiting();
			console.log(JSON.stringify(e));
		}
	});
}
function addClickHandler(name,juli,user,years,aid,pic,smarker){
		smarker.addEventListener("click",function(e){
			$('.userspic').attr('src',getAvatar(pic));
			$('.name').text(name ? name :  user);
			$('#juli').text(juli+'m');
			$('#dianji').attr('data-id',aid);
			$('#dianji').on('click',function(){
				var uid = $(this).attr('data-id');
				plus.webview.create('my-active.html','my-active.html',{},{sid:uid}).show('pop-in',200);//后台创建webview并打开show.html
			})
			 
		});
	}