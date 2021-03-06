/**
 * Created by admin on 2016/12/9 0009.
 */
define(function(require, exports, module) {
	'use strict';
	var $ = require('jquery');
	var box = require('lib/ui/box/1.0.1/crossbox');
	var io = require('lib/core/1.0.0/io/request');
	var validate = require('plugins/validator/1.0.0/validator');
	var template = require("template");
	var jContainer = $('#jContainer');
	var form = require('lib/core/1.0.0/utils/form');

//提交提问路径
	var submitQuestionUrl = $PAGE_DATA['submitQuestionUrl'];
	var sourceId = $PAGE_DATA['sourceId'] ;
	var handshake = {
		handle:function () {
			var ucData = form.serializeForm('#jSigninForm');
			io.get(submitQuestionUrl, $.extend({},ucData,{"sourceId":sourceId}),function(res){
				if(res){
					var topBox = box.get(window);
					topBox.hide();
					box.ok('提问成功');
					if(window.top && window.top.window.pager){
						window.top.window.pager();
					}else if(window.top && window.top.window.url){
						window.top.window.location.href = window.top.window.url;
					}
				}else {
					box.error(res.msg || '提问失败');
				}
			},function(res) {
				box.error(res.msg || '网络错误');
			},jContainer.find('input[type=button]')[0])
		}
	};

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
			if(!jContainer.find('input[type=button]').hasClass('ui-btn-disabled')){
				handshake.handle();
			}
		},
		//失去焦点验证
		onfocusout: function(element){
			$(element).valid();
		}
	})

	$("#jSubmit").click(function(){
		$('#jSigninForm').submit();
	})
	//评论字数限制
	jContainer.on('input propertychange','#jContent',function(){
		var txtLen = $('#jContent').val().length;
		if(txtLen > 500){
			$(this).addClass('text-error');
			$('#jTxtNum').css({'color':'red'});
			jContainer.find('input[type=submit]').addClass('ui-btn-disabled');
		}else {
			$(this).removeClass('text-error');
			$('#jTxtNum').css({'color':'#666'});
			jContainer.find('input[type=submit]').removeClass('ui-btn-disabled');
		}
		$('#jTxtNum').children('span').text(txtLen);
	});
});
