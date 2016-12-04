/**
 * Created by temulun on 2016/12/04 14:18.
 */
define(function(require, exports, module){
	'use strict';
	var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var io = require('lib/core/1.0.0/io/request');
    var template=require("template");
    var lazy;
    lazy = new Lazyload($('.jImg'), {
        mouseWheel: true,
        effect: 'fadeIn',
        snap: true
    });
    //发表评论
    $('#jBtnPublish').on('click', function () {
    	box.ok('评论成功');
    });
    //发布新问题
    $('#jBtnNewQuestions').on('click', function () {
    	box.ok('new questions publish success');
    });
    //回复评论
    $('#jReplyList').on('click', function (e) {
    	if($(e.target).is('.jItemsReply')) {
    		box.ok($(e.target).text())
    	}
    })
    //赞和回复
    $('.jClkRefavour').on('click', function (e) {
    	if($(e.target).is('.jClkFavour')) {
    		$(e.target).addClass('favour');
    	}else if( $(e.target).is('.jClkResponse') ) {
    		box.ok('实现什么效果？')
    	}
    })
    //点击查看全部评论
    $('#jMoreComment').on('click', function(){
         $(this).hide();
         insertItems($PAGE_DATA['questions'], '查看全部', 'jReply', 'jReplyList');
     });
    //查看全部评论
    function insertItems(url, data, tmpEl, htmEl){
        io.get(url, {"data":data}, function(res){
        	var data = res.data;
            if(!$.isEmptyObject(data) && data.list.length > 0) {
                var html = template(tmpEl, data);
                document.getElementById(htmEl).innerHTML += html;
            }else if(res.error < 0) {
                box.warn('有问题')
            }else {
            	document.getElementById(htmEl).innerHTML = '<div class="ui-empty-list"><div class="isema isema-box"></div><div class="txt">暂时没有相关内容</div></div>';
            }

            //图片懒加载
            lazy = new Lazyload($('.jImg'), {
                mouseWheel: true,
                effect: 'fadeIn',
                snap: true
            });
        },function(error){
            document.getElementById(htmEl).innerHTML = '<div style="color: #000;">请求超时请重试！<a href="">刷新</a></div>';
        });
    }
    insertAlist($PAGE_DATA['questions'], '发布新问题', 'jAlist', 'jRightQuestions')
    function insertAlist(url, data, tmpEl, htmEl) {
    	io.get(url, {"data":data}, function(res){
        	var data = res.data;
            if(!$.isEmptyObject(data) && data.alist.length > 0) {
                var html = template(tmpEl, data);
                document.getElementById(htmEl).innerHTML += html;
            }else if(res.error < 0) {
                box.warn('有问题');
            }else {
            	document.getElementById(htmEl).innerHTML = '<div class="ui-empty-list"><div class="isema isema-box"></div><div class="txt">暂时没有相关内容</div></div>';
            }
        },function(error){
            document.getElementById(htmEl).innerHTML = '<div style="color: #000;">请求超时请重试！<a href="">刷新</a></div>';
        });
    }
})