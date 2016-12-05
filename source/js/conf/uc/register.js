define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var io = require('lib/core/1.0.0/io/request');
    var validate = require('lib/plugins/validation/1.15.1/jquery-validate');
    var message = require('lib/plugins/validation/1.15.1/localization/messages_zh');

      /*box.loadUrl('http://www.baidu.com', {
                data: { t: +new Date },
                content: '加载中',
                success: function(res) {
                    console.log(res);
                    alert(JSON.stringify(res));
                }
            });*/

    $().ready(function(){
        $.validator.addMethod('telephone', function(value, el, params) {
            var reg = /^1[1-9]{10}$/;
            if(reg.test(value)) {
                return true;
            }else{
                return false;
            }
        }, '请输入11位有效的手机号');
        $('#jSignupForm').validate({
            debug:true,
            rules: {
                name: {
                    required: true,
                    minlength: 6,
                    maxlength: 10
                },
                telnum:{
                    required: true,
                    telephone:12345678912
                },
                email:{
                    required: true,
                    email:true
                },
                scholl:{
                    required: true
                }
                
            },        
            messages: {
            }
        })
    
    })
});
