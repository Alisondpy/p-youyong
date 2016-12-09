define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var io = require('lib/core/1.0.0/io/request');
    var validate = require('plugins/validator/1.0.0/validator');
    var template = require("template");
    var jContainer = $('#jContainer');
      /*box.loadUrl('http://www.baidu.com', {
                data: { t: +new Date },
                content: '加载中',
                success: function(res) {
                    console.log(res);
                    alert(JSON.stringify(res));
                }
            });*/
            var data = null;
    var handshake = {
        init:function () {
            io.get($PAGE_DATA['getInfo'], function(res){
                jContainer.html(template('jForm', res));
                data = {
                    'userid':
                };
            })
        },
        handle:function () {
            io.get($PAGE_DATA['postInfo'], {data:data} ,function(data){
                alert();
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
