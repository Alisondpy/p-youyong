define(function(require, exports, module) {
	'use strict';
	var $ = require('jquery');
	var box = require('lib/ui/box/1.0.1/box');
	var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
	var io = require('lib/core/1.0.0/io/request');
	require('plugins/layer/layer');

	//图片懒加载
	//var lazy = new Lazyload($('.jImg'), {
	//	mouseWheel: true,
	//	effect: 'fadeIn',
	//	snap: true
	//});
	//
	//tab.on('change', function(el) {
	//	lazy.update();
	//});
	var jFrame = $('#jFrame');
	var id = jFrame.attr('data-id');
	io.get($PAGE_DATA['LiveShowUrl'],{courseId:id},function(res){
		if(res && res.data && res.data.liveshowUrl){
			console.log(id);
			jFrame.find('iframe').attr('src',res.data.liveshowUrl);
		}else {
			box.error('服务器错误,请重试');
		}
	},function(res){
		box.error(res.msg || '网络错误,请重试');
	})
});
