define(function(require, exports, module) {
	'use strict';
	var $ = require('jquery');
	var box = require('lib/ui/box/1.0.1/box');
	var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
	var io = require('lib/core/1.0.0/io/request');
	var Tab = require('lib/ui/tab/1.0.0/tab');
	var catlog = $('.jMod-catlog');
	var note = $('.jMod-note');
	var question = $('.jMod-question');
	var jTab = $('#jTab');
	var tab = new Tab(jTab);
	tab.on('change', function(el) {
		console.log(el.body);
	});

	//图片懒加载
	var lazy = new Lazyload($('.jImg'), {
		mouseWheel: true,
		effect: 'fadeIn',
		snap: true
	});

	// 页面上最大的三个tab切换
	// $('.jCatlog').on('click',function(){
	//     catlog.css('display','block').siblings().not('.jUp').css('display','none');
	// })
	// $('.jNote').on('click',function(){
	//     note.css('display','block').siblings().not('.jUp').css('display','none');
	// })
	// $('.jQuestion').on('click',function(){
	//     question.css('display','block').siblings().not('.jUp').css('display','none');
	// })




});
