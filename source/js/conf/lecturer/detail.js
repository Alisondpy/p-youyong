define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var Tab = require('lib/ui/tab/1.0.0/tab');
    var io = require('lib/core/1.0.0/io/request');
    require('lib/plugins/validation/1.15.1/jquery-validate');
    require('lib/plugins/validation/1.15.1/localization/messages_zh');
    var template = require('template');
    var form = require('lib/core/1.0.0/utils/form'); 
    var jTinfo = $('.jTinfo');
    var tab1 = $('.jTab-l');
    var tab2 = $('.jTab-r');
    var jLi = $('.jLi');
    var mask = $('.jMod-mask');
    // var f = $('.f');

    var jTab = $('#jTab');
    var tab = new Tab(jTab);
    console.log(tab);
    // tab.on('click',function(){
    //     console.log(0);
    // })
       
    
     // tab.setCurrent(1);

    //模板加载
    io.get('/p-youyong/source/api/lecturer/detail.json', function(res) {
            var html = template('test', res.data);
            document.getElementById('content').innerHTML = html;
            //主讲课效果
            $('.jList').mouseenter(function(){
                var titleLen = $(this).find('.jTitle').text().length;
                if(titleLen > 13){
                    $(this).find('.jModLabel').stop(true,false).slideUp();
                }
            }).mouseleave(function(){
                var titleLen = $(this).find('.jTitle').text().length;
                if(titleLen > 13){
                    $(this).find('.jModLabel').stop(true,false).slideDown();
                }
            });
    },function(error){
    });


    //图片懒加载
    var lazy = new Lazyload($('.jImg'), {
        mouseWheel: true,
        effect: 'fadeIn',
        snap: true
    });




    //讲师介绍和主讲课程的tab切换
    // tab1.on('click',function(){
    //     jTinfo.addClass('active').css('display','block').siblings('.jLi').removeClass('active').css('display','none');
    // });

    // tab2.on('click',function(){
    //     jLi.addClass('active').css('display','block').siblings('.jTinfo').removeClass('active').css('display','none');
    // });

    //关于遮罩层的操作
    $('.invite-btn').on('click',function(){
        mask.css('display','block');
    });

    $('#btn').on('click',function(){
        io.post();
        cvalidate();
        var formData = form.serializeForm(cvalidate());
            console.log(formData);
    });



        $().ready(function(){
           $('#cvalidate').validate({
             onfocusout: function(element){
                $(element).valid();
            },
            debug:true,
            rules:{
                cname:{
                    required:true,
                    minlength:2
                },
                ctel:{
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
                    minlength:"姓名不合法",
                    isname:"孩子长点心吧。你的名字都能写错？"
                },
                ctel:{
                    required:"请填写手机号",
                    isphonenum:"请填写正确的手机号码"

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
        jQuery.validator.addMethod('isphonenum',function(value, element){
            var tel = /0?(13|14|15|18)[0-9]{9}/;
            return this.optional(element) || (tel.test(value));
        });
        jQuery.validator.addMethod('isname',function(value, element){
            var name = /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/;
            return this.optional(element) || (name.test(value));
        });
});
