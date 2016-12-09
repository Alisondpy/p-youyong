define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var template=require("template");
    var io = require('lib/core/1.0.0/io/request');
    var Box = require('lib/ui/box/1.0.1/box');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var Pager = require('plugins/pager/1.0.0/pager');
    var navigation = require('module/navigation-bar/1.0.0/navigation-bar');
    var lazy;
    var jContainer = $('#jContainer');
    var jPagination = $('.jPagination');
    //var loadActivity = $PAGE_DATA['loadActivity'];
    var loadTest = $PAGE_DATA['loadTest'];
    var jTestModule=$("#jTestModule");/*ģ��*/

    var pager;
    var renderList = function(url,data){
        if(typeof pager !== 'undefined'){
            pager.destroy();
        }
        pager = new Pager(jPagination,{
            url:url,
            data:data
        });

        var loading = null;
        pager.on("ajaxStart",function(){
            loading = Box.loading('���ڼ��ء�����',{
                modal:false
            });
        });

        pager.on('ajaxSuccess', function(res, callback) {
            if(res && res.data &&  res.data.resultList && res.data.resultList.length > 0){
                var strHtml = template('test', res.data);
                jContainer.html(strHtml);
                //ͼƬ������
                lazy = new Lazyload(jContainer.find('.jImg'), {
                    mouseWheel: true,
                    effect: 'fadeIn',
                    snap: true
                })
                callback && callback(res.data.records);//��Ⱦ��ҳ����
            }else {
                jContainer.html(template('jTestModule'))
                callback && callback(1);//��Ⱦ��ҳ����
            }
        });
        pager.on('ajaxError',function(res,callback){
        });
        pager.on('change', function(pageNum, e) {
        });
    }
    renderList(loadTest,{"type":0});
    var nav = new navigation('#jActivity',{
        currentClass:'active',//��ǰ��ʽ
        navSelector:['#jActClassify','#jActTime'],//������domѡ����
        navItemSlect:'a' //��������ǩ
    });
    nav.on('change',function(callbackData){
        renderList(loadTest,callbackData);
    })

});