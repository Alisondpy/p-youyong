define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    require('plugins/validator/1.0.0/validator');
    var Tab = require('lib/ui/tab/1.0.0/tab');
    var io = require('lib/core/1.0.0/io/request');
    var build = require('lib/core/1.0.0/dom/build');
    var Pager = require('plugins/pager/1.0.0/pager');
    var template = require('template');
    var form = require('lib/core/1.0.0/utils/form'); 
    var jTinfo = $('.jTinfo');
    var tab1 = $('.jTab-l');
    var tab2 = $('.jTab-r');
    var jLi = $('.jLi');
    var bg= $('.jBg');
    var mask = $('.jMod-mask');

    var jTab = $('#jTab');
    var tab = new Tab(jTab);
    var pager;
    tab.on('change',function(el){
        
        //模板加载
            var content = $('#content');
                 //tab body data-id="1"
            var jPagination = $('#jPagination');
            if(el.body.hasClass('teacher-info')){
                pager.destroy();
            }else{
                pager = new Pager(jPagination, {
                url: $PAGE_DATA['getPager'],
                data: {
                    // class: 'djune'
                },
                options: {
                    currentPage: 2, // start with 1
                    pageSize: 20
                }
            });

            var loading = null;

            pager.on('ajaxStart', function() {
                loading = box.loading('正在加载...', {
                    modal: false
                });
            });

            pager.on('ajaxSuccess', function(data, callback) {
                if(!$.isEmptyObject(data.data) && data.data.records.length>0){
                     content.html(template('test',data.data));
                     //图片懒加载
                    var lazy = new Lazyload($('.jImg'), {
                    mouseWheel: true,
                    effect: 'fadeIn',
                    snap: true
                    });
                }else{
                    content.html('<div class="ui-empty-list">'+
                                    '<div class="iyoyo iyoyo-box"></div>'+
                                    '<div class="txt">暂时没有课程</div>'+
                                '</div>')
                }
               
               

                callback && callback(data.data.records);
                loading && loading.hide();
            });

            pager.on('ajaxError', function(data) {
                content.html('网络错误，请重试！');
                loading && loading.hide();
            });

            pager.on('change', function(pageNum, e) {
                $('#jCurrentPage').html(pageNum)
            });

            }

           
       
 
    })


       
    
    

    


    //图片懒加载
    var lazy = new Lazyload($('.jImg'), {
        mouseWheel: true,
        effect: 'fadeIn',
        snap: true
    });





});
