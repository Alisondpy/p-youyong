define(function(require, exports, module) {
	'use strict';
	var $ = require('jquery');
	var box = require('lib/ui/box/1.0.1/box');
	var io = require('lib/core/1.0.0/io/request');
	require('plugins/layer/layer');

	//tab.on('change', function(el) {
	//	lazy.update();
	//});
	var jFrame = $('#jFrame');
	var id = jFrame.attr('data-id');
	io.get($PAGE_DATA['LiveShowUrl'],{courseId:id},function(res){
		if(res && res.data && res.data.liveshowUrl){
			layer.open({
				type: 2,
				title: '直播',
				shadeClose: true,
				shade: false,
				maxmin: true, //开启最大化最小化按钮
				area: ['100%','100%'],
				content: res.data.liveshowUrl
			});
		}else {
			box.error('服务器错误,请重试');
		}
	},function(res){
		box.error(res.msg || '网络错误,请重试');
	})
});
