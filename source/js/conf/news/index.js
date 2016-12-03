/**
 * Created by wangLiang on 2016/11/30 0030.
 */
define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var io = require('lib/core/1.0.0/io/request');
    var template=require("template");
    var lazy;

    function getLists(url,data,tmpEl,htmEl){
        io.get(url,{"data":data},function(res){
            if(!$.isEmptyObject(res.data) && res.data.list.length > 0){
                var html = template(tmpEl,res.data);
                document.getElementById(htmEl).innerHTML = html;
            }else {
                document.getElementById(htmEl).innerHTML = "<div style='color: #000;'>暂无数据</div>";
            }

            //图片懒加载
            lazy = new Lazyload($('.jImg'), {
                mouseWheel: true,
                effect: 'fadeIn',
                snap: true
            });
        },function(res){
            document.getElementById(htmEl).innerHTML = "<div style='color: #000;'>请求超时请重试！<a href=''>刷新</a></div>";
        });
    }

    getLists('/p-youyong/source/api/news/index.json','资讯','wrap2','jWrap2');

    //tab页切换
    $('.mod-wrap .mod-sub-nav a').click(function(){
        $(this).addClass('current').siblings().removeClass('current');
        $('.mod-sub-wrap').hide();
        $('.jWrap'+$(this).attr('data-value')+'').show();
    });

});
