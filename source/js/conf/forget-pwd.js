/**
 * Created by linzhixiang on 16/12/9.
 */
define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var io = require('lib/core/1.0.0/io/request');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var validate = require('plugins/validator/1.0.0/validator');
    var form = require("lib/core/1.0.0/utils/form");

    //手机号正确才允许点击验证码
    $.validator.addMethod("lms", function(value, element, param) {
        var mobile = /^0?(13[0-9]|15[0-9]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if(mobile.test(value)){
            //修改点击提交触发验证,恢复验证码按钮色彩的功能
            if($(".jsVerifyCode").hasClass("change")){
            }else{
                $(param).removeClass("ui-btn-disable");
            }
            return this.optional(element) || true;
        }else{
            $(param).addClass("ui-btn-disable");
            return false
        }

    }, $.validator.format("请输入正确的手机号"));

    $("#jsForgetPwd").validate({
        rules: {
            mobile:{
                lms : ".jsVerifyCode",
                required: true,
                mobile:true
            },
            dynamic: {
                required: true
            },
            password : {
                required : true,
                minlength : 6
            }
        },
        messages: {
            password: {
                required: "请输入密码",
                minlength: "密码长度不能小于6个字母,不允许包含空格"
            },
        },
        submitHandler: function(formRes){
            //判断jNextStep是否提交,没有可以提交
            if(!$("#jNextStep").hasClass("jNextStep")){
                var formData = form.serializeForm(formRes);
                io.get($PAGE_DATA['login'],formData,function(data){
                    box.ok("修改密码成功");
                    var refer = document.referrer;
                    //等待两秒跳转页面
                    //是否跳转
                    setTimeout(function(){
                        //location.href = "./login.html";
                    },2000);
                },function(res){
                    if(res.msg){
                        box.error(res.msg);
                    }else{
                        box.error('网络错误');
                    }
                });
            }

        }
    });

    //成功点击获取,出现新密码框,移除class--jNextStep允许提交
    $(".jsVerifyCode").on("click",function(){
        if(!$(this).hasClass("ui-btn-disable")){
            $(".jnewPwd").show();
            $("#jNextStep").removeClass("jNextStep");
        }
    })
    //获取验证码
        .on("click",function(){
        var verifyCode = $(this);
        //获取阶段直接返回
        if(verifyCode.hasClass("ui-btn-disable")){
            return false;
        }
        //发送ajax请求
        io.get($PAGE_DATA['code'],{mobile : $("#jName").val()},
            function(res){
                //成功后的回调

            },function(res){
                //fail
                if(res.msg){
                    box.error(res.msg);
                }else{
                    box.error('网络错误');
                }
            });
        //验证码循环
        var count = 60;
        verifyCode.val(count).addClass("ui-btn-disable change");
        var time = setInterval(function(){
            if(count > 1){
                count --;
                verifyCode.val(count);
            }else{
                verifyCode.removeClass("ui-btn-disable change").val("获取验证码");
                clearInterval(time);
            }
        },1000);
    });

    //验证是否属于白名单里面
    function includeUrl(refer){
        for(var i = 0;i < allowerList.length;i ++){
            if(refer.indexOf(allowerList[i])){
                return true
            }
        }
        return false;
    }
})