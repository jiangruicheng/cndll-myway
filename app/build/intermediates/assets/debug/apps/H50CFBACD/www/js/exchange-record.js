var ws, userid;
document.addEventListener('plusready', function() {
	ws = plus.webview.currentWebview();
	userid = plus.storage.getItem('userid');
	var html = "";
	$.ajax({
		type: "get",
		url: apiRoot + "/home/order/myduihuans",
		data: {
			userid: userid
		},
		dataType: 'json',
		success: function(data) {
			console.log(JSON.stringify(data))
			if(data.code == 1001) {
				$.each(data.content, function(k, v) {
					html += '<ul class="mui-table-view">' +
						'<li class="mui-table-view-cell">' +
						'<p>' + v.time + '</p>' +
						'<p style="margin-top: 8px;">' + v.goods.title + '</p>' +
						'</li>' +
						'</ul>';
				});
				$('#duihuan').html(html);
			} else {
				$('#duihuan').html('<p style="margin-top: 10px;font-size: 16px;">'+data.content+'...<p>');
			}

		},error:function(e){
			console.log(JSON.stringify(e))
		}
	});

})