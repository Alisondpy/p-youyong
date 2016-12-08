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
    //热门活动列表
   /* new Hot('jHotActive',{
        url:"/p-youyong/source/api/sub/hot-activity.json",
        temId:'hot',
        formatNum:true
});*/

    var pager;
    var renderList = function(url,data){
        if(typeof pager !== 'undefined'){
            pager.destroy();
        }
            pager = new Pager(jPagination,{
            url:url,
            data:data,
            alias: {
                currentPage: 'currentPage',
                pageSize: 'pageSize'
            },
            options: {
                currentPage: 1, // start with 1
                pageSize:10
            }
        });

        var loading = null;
        pager.on("ajaxStart",function(){
            loading = Box.loading('正在加载。。。',{
                modal:false
            });
        });

        pager.on('ajaxSuccess', function(res, callback) {
            if(!$.isEmptyObject(res.data) && res.data.list.length > 0){
                var strHtml = template('test', res.data);
                jContainer.html(strHtml);
            }else{
                jContainer.html('<div class="ui-empty-list">'+
                                    '<div class="iyoyo iyoyo-box"></div>'+
                                    '<div class="txt">还木有专题活动</div>'+
                                '</div>')
                pager.destroy();
            }
            //图片懒加载
            lazy = new Lazyload(jContainer.find('.jImg'), {
                mouseWheel: true,
                effect: 'fadeIn',
                snap: true
            })
            callback && callback(res.data.records);//渲染分页数据
        });
        pager.on('ajaxError',function(res,callback){
        });
        pager.on('change', function(pageNum, e) {
            console.log('pageNum', pageNum, e);
            $('#jCurrentPage').html(pageNum)
        });
    }
    renderList($PAGE_DATA['baseStaticUrl']+"/source/api/sub/sub.json");
    var nav = new navigation('#jActivity',{
        currentClass:'active',//当前样式
        navSelector:['#jActClassify','#jActTime'],//导航栏dom选择器
        navItemSlect:'a' //导航栏标签
    });
    nav.on('change',function(data){
        console.log(data);
        renderList($PAGE_DATA['baseStaticUrl']+'source/api/course/tab0.json',data);
        /*switch (type){
            case '0':
                renderList('source/api/course/tab0.json');
                break;
            case '1':
                renderList('source/api/course/tab1.json');
                break;
            case '2':
                renderList('source/api/course/tab2.json');
                break;
        }*/
    })

});