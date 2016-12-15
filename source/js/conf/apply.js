define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/crossbox');
    var io = require('lib/core/1.0.0/io/request');
    var validate = require('plugins/validator/1.0.0/validator');
    var template = require("template");
    var form = require('lib/core/1.0.0/utils/form');
    var jMSubBtn = $("#jMSubBtn");
    var handshake = {
        handle:function () {
            var ucData = form.serializeForm('#jSigninForm');
            io.post($PAGE_DATA['getInfo'], $.extend({activityId:$PAGE_DATA['activityId']},ucData) ,function(data){
                //isSubmit = false;
                var topBox = box.get(window);
                box.ok('恭喜您，报名成功！')
                setTimeout(function(){
                    window.top.window.location.reload();
                    topBox.hide();
                },2000);
            },function(res) {
                box.error(res.msg || '网络错误,请重试');
            },jMSubBtn[0]);
        }
    };
    jMSubBtn.click(function(){
        $("#jSigninForm").submit();
    });
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
            school:{
                required: true
            },
            qq:{
                qq:true
            },
            wechat:{
                wechat:true
            }
        },
        //失去焦点校验
        onfocusout: function(element){
            $(element).valid();
        },
        submitHandler:function(form){
            handshake.handle();
        }
    });
});
