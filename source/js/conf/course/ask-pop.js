/**
 * Created by admin on 2016/12/9 0009.
 */
define(function(require, exports, module) {
	'use strict';
	var $ = require('jquery');
	var box = require('lib/ui/box/1.0.1/box');
	var io = require('lib/core/1.0.0/io/request');
	var validate = require('plugins/validator/1.0.0/validator');
	var template = require("template");
	var jContainer = $('#jContainer');
	var form = require('lib/core/1.0.0/utils/form');

	var handshake = {
		init:function () {},
		handle:function (data) {
			var ucData = form.serializeForm('#jSigninForm');
			io.get($PAGE_DATA['getInfo'], ucData ,function(data){
				box.ok('提交成功')
			},function(res) {
				box.error('网络错误,请重试');
			}, this)
		}
	};
	handshake.init();
	$('#jSigninForm').validate({
		rules: {
			title: {
				required: true
			},
			content:{
				required: true
			}
		},
		messages:{
			title:{
				required:"请填写标题"
			},
			content:{
				required:"请填写内容"
			}
		},
		submitHandler:function(form){
			handshake.handle();
		},
		//失去焦点验证
		onfocusout: function(element){
			$(element).valid();
		}
	})

	//评论字数限制
	$('#jContainer').on('keyup','#jContent',function(){
		var txtLen = $('#jContent').val().length;
		if(txtLen > 100){
			$(this).addClass('text-error');
			$('#jTxtNum').css({'color':'red'});
			$('#jContainer').find('input[type=submit]').addClass('ui-btn-disabled');
		}else {
			$(this).removeClass('text-error');
			$('#jTxtNum').css({'color':'#666'});
			$('#jContainer').find('input[type=submit]').removeClass('ui-btn-disabled');
		}
		$('#jTxtNum').children('span').text(txtLen);
	});
});
