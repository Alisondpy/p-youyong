define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var io = require('lib/core/1.0.0/io/request');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var validate = require('plugins/validator/1.0.0/validator');
    var form = require("lib/core/1.0.0/utils/form");
    //白名单
    var allowerList = [
        "www.baidu.com",
        "www.google.com"
    ];
    //$().ready(function(){

        //$('#jSignupForm').validate({
        //    debug:true,
        //    rules: {
        //
        //    }
        //})
    //})
    $("#jsRightLoginMobile").validate({
        submitHandler: function(formRes){
            var formData = form.serializeForm(formRes);
            debugger;
            io.get($PAGE_DATA['login'],formData,function(data){
                box.ok("登陆成功");
                var refer = document.referrer;
                setTimeout(function(){
                    //如果来源是zzh或白名单,返回refer
                    if(refer.indexOf("zhongzhihui") || includeUrl(refer)){
                        location.href = refer;
                    }else{
                        //否则返回到指定域名
                        location.href = "www.zhongzhihui.com";
                    }
                },2000);
            },function(res){
                if(res.msg){
                    box.error(res.msg);
                }else{
                    box.error('网络错误');
                }

            });
        },


    });

    //获取验证码
    $(".jsVerifyCode").on("click",function(){
        //获取阶段直接返回
        if($(".jsVerifyCode").hasClass("ui-disable")){
            return false;
        }
        //验证码循环
        VerificationCode();
    });

    //验证码循环
    function VerificationCode(){
        var verifyCode = $(".jsVerifyCode");
        var count = 3;
        verifyCode.val(count).addClass("ui-disable");
        var time = setInterval(function(){
            console.log(count);
            if(count > 1){
                count --;
                verifyCode.val(count);
            }else{
                verifyCode.removeClass("ui-disable").val("获取验证码");
                clearInterval(time);
            }
        },1000);
    }

    //验证是否属于白名单里面
    function includeUrl(refer){
        //var host = refer.slice(0,refer.indexOf("/"));
        for(var i = 0;i < allowerList.length;i ++){
            if(refer.indexOf(allowerList[i])){
                return true
            }
        }
        return false;
    }

    //手机动态码登录
    $(".jsRightLoginMobile").on("click",".subbtn input",function(){
        io.get($PAGE_DATA['login'],{},
            function(){

            }, function(){})
    });

});