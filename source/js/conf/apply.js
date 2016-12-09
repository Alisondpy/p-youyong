define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var io = require('lib/core/1.0.0/io/request');
    var validate = require('plugins/validator/1.0.0/validator');
    var template = require("template");
    var jContainer = $('#jContainer');
    var form = require('lib/core/1.0.0/utils/form');
      /*box.loadUrl('http://www.baidu.com', {
                data: { t: +new Date },
                content: '加载中',
                success: function(res) {
                    console.log(res);
                    alert(JSON.stringify(res));
                }
            });*/
    // var data = null;

    var ucData ;
    var handshake = {
        init:function () {
            io.get($PAGE_DATA['getInfo'], function(data) {
                // console.log(data);
                if (data.error < 0) {
                    box.error(data.msg);
                } else {
                    try {
                        data = data.data;
                        // ucData = {
                        //     'userid': data.userId,
                        //     'companyId':data.companyId,
                        //     'activityId':data.activityId,
                        //     'userId':data.userId,
                        //     'realname':data.realname,
                        //     'mobile':data.mobile,
                        //     'email':data.email,
                        //     'wechat':data.wechat,
                        //     'qq':data.qq,
                        //     'school':data.school
                        // };
                        jContainer.html(template('jForm', data));
                        console.log(form.serializeForm('#jSigninForm'));
                    } catch (e) {
                        box.error('暂无数据');
                    }
                }
            }, function(res) {
                box.error('网络错误');
            }, this);
        },
        handle:function (data) {
            // console.log(ucData)
            var ucData = $('#jSigninForm').serialize();
            io.get($PAGE_DATA['getInfo'], {data:ucData} ,function(data){
                // alert()
            })
        }
    };
    handshake.init();
    $().ready(function(){
        $('#jSigninForm').validate({
            //debug:true,
            rules: {
                admin: {
                    required: true,
                    admin:true
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
    
    })
});
