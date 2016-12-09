define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/crossbox');
    var io = require('lib/core/1.0.0/io/request');
    var validate = require('plugins/validator/1.0.0/validator');
    var template = require("template");
    var form = require('lib/core/1.0.0/utils/form');

    var handshake = {
        init:function () {
            io.get($PAGE_DATA['getInfo'], function(data) {
                if(data && data.data) {
                    form.setFormData('#jSigninForm', data);
                }
            }, function(res) {
                box.error(res.msg || '网络错误,请重试' );
            });
        },
        handle:function (data) {
            var ucData = form.serializeForm('#jSigninForm');
            io.get($PAGE_DATA['getInfo'], $.extend({activityId:$PAGE_DATA['activityId']},ucData) ,function(data){
                var topBox = box.get(window);
                box.ok('恭喜您，报名成功！')
                setTimeout(function(){
                    topBox.hide();
                },3000);
            },function(res) {
                box.error(res.msg || '网络错误,请重试');
            }, this)
        }
    };
    handshake.init();
    $('#jSigninForm').validate({
        rules: {
            realname: {
                required: true,
                realname:true
            },
            mobile:{
                required: true,
                mobile:true
            },
            email:{
                required: true,
                email:true
            },
            scholl:{
                required: true
            },
            qq:{
                qq:true
            },
            wechat:{
                wechat:true
            }
        },
        submitHandler:function(form){
            handshake.handle();
        }
    })

});
