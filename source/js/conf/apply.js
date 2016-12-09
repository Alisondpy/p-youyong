define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var io = require('lib/core/1.0.0/io/request');
    var validate = require('plugins/validator/1.0.0/validator');
    var template = require("template");
    var jContainer = $('#jContainer');
    var form = require('lib/core/1.0.0/utils/form');

    var ucData ;
    var handshake = {
        init:function () {
            io.get($PAGE_DATA['getInfo'], function(data) {
                if (data.error < 0) {
                    box.error(data.msg);
                } else {
                    try {
                        data = data.data;
                        form.setFormData('#jSigninForm',data);
                    } catch (e) {
                        box.error('暂无数据');
                    }
                }
            }, function(res) {
                box.error('网络错误');
            });
        },
        handle:function (data) {
            var ucData = form.serializeForm('#jSigninForm');
            io.get($PAGE_DATA['getInfo'], ucData ,function(data){
                box.ok('提交成功')
            },function(res) {
                box.error('网络错误,请重试');
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
                required: true,
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
