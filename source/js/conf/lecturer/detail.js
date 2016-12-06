define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    require('plugins/validator/1.0.0/validator');
    var Tab = require('lib/ui/tab/1.0.0/tab');
    var io = require('lib/core/1.0.0/io/request');
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
    tab.on('change',function(el){
    })
    

    //模板加载
    io.get('/p-youyong/source/api/lecturer/detail.json', function(res) {
            var html = template('test', res.data);
            document.getElementById('content').innerHTML = html;
                //图片懒加载
            var lazy = new Lazyload($('.jImg'), {
                mouseWheel: true,
                effect: 'fadeIn',
                snap: true
                });
            },function(error){
    });


    //图片懒加载
    var lazy = new Lazyload($('.jImg'), {
        mouseWheel: true,
        effect: 'fadeIn',
        snap: true
    });



    //关于遮罩层的操作
    $('.invite-btn').on('click',function(){
        mask.css('display','block');
        bg.css('display','block');
    });

    $('#btn').on('click',function(){
        io.post();
    });


    //关于遮罩层上面的的验证。
        $().ready(function(){
           $('#cvalidate').validate({
             onfocusout: function(element){
                $(element).valid();
            },
            debug:true,
            rules:{
                cname:{
                    required:true,
                },
                phone:{
                    required:true,
                    minlength:11
                },
                ccompany:{
                    required:true,
                },
                cneed:{
                    required:true,
                }
            },
            messages:{
                cname:{
                    required:"请填写姓名",
                    minlength:"姓名不合法"
                },
                ccompany:{
                    required:"请填写公司的名称"
                },
                cneed:{
                    required:"请填写您的需求"

                }
            }
        }) 
    })

});
