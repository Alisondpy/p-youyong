define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var io = require('lib/core/1.0.0/io/request');
    require('lib/plugins/validation/1.15.1/jquery-validate');
    require('lib/plugins/validation/1.15.1/localization/messages_zh');
    var form = require('lib/core/1.0.0/utils/form');
    var template = require('template');
    var jTinfo = $('.jTinfo');
    var tab1 = $('.jTab-l');
    var tab2 = $('.jTab-r');
    var jLi = $('.jLi');
    var mask = $('.jMod-mask');
    var f = $('.f');

    //模板加载
    io.get('/path/to/file',function(data) {
            var html = template('test',data);
            docuemnt.getElementById('content').innerHTML = html;
    });


    //图片懒加载
    var lazy = new Lazyload($('.jImg'), {
        mouseWheel: true,
        effect: 'fadeIn',
        snap: true
    });


    //点播课和直播课效果
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

    //讲师介绍和主讲课程的tab切换
    tab1.on('click',function(){
        jTinfo.addClass('active').css('display','block').siblings('.jLi').removeClass('active').css('display','none');
    });

    tab2.on('click',function(){
        jLi.addClass('active').css('display','block').siblings('.jTinfo').removeClass('active').css('display','none');
    });

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
                    required:"",
                    minlength:""
                },
                ctel:{
                    required:""

                },
                ccompany:{
                    required:""
                },
                cneed:{
                    required:""

                }
            }
        }) 
    })
        // jQuery.validator.addMethod('phone',function(value, element){
        //     var tel = /0?(13|14|15|18)[0-9]{9}/;
        //     return this.optional(element) || (tel.test(value));
        // },'请填写正确的手机号码');
        
});
