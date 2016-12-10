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

    //页面进入先失去焦点
    //$("#jMobile").blur();
    // 中文字两个字节
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

    //手机动态码登陆
    $("#jRightLoginMobile").validate({
        submitHandler: function(formRes){
            var formData = form.serializeForm(formRes);
            io.get($PAGE_DATA['mobileLogin'],formData,function(data){
                box.ok("登陆成功");
                var refer = document.referrer;
                setTimeout(function(){
                    //如果来源是zzh或白名单,返回refer
                    if(refer.indexOf("zhongzhihui.com") || includeUrl(refer)){
                        //如果需要解码
                        //refer = decodeURI(refer)
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
                return false;
            });
        },
        errorPlacement : function(error,element){
            //console.log(error,element);
            error.appendTo(element.parent());
            $(element).parent().addClass("error");
        },
        rules: {
            mobile:{
                lms:'.jsVerifyCode',
                required: true,
                mobile:true
            },
            //vierfyCode : {
            //    require : true,
                //digits : true
            //}
        },
        messages: {
            mobile: {
                required: "请输入手机号",
                mobile:"请正确地填写你的手机号"
            }
        }
    });


    //普通登陆
    $("#jLoginForm").validate({
        rules: {
            username:{
                required: true,
                mobile:true
            },
            password: {
                required: true,
                minlength: 6
            },
        },
        errorPlacement : function(error,element){
            //console.log(error,element);
            error.appendTo(element.parent());
            $(element).parent().addClass("error");
        },
        success: function(label) {
            // set &nbsp; as text for IE
            label.html("&nbsp;").addClass("checked");
            label.parent().removeClass("error");
        },
        messages: {
            username:{
                required: "请输入手机或邮箱",
                mobile:"请输入正确的手机号或邮箱地址"
            },
            password: {
                required: "请输入密码",
                minlength: "密码长度不能小于6个字符"
            },
        },
        submitHandler: function(formRes){
            var formData = form.serializeForm(formRes);
            io.get($PAGE_DATA['normalLogin'],formData,function(data){
                box.ok("登陆成功");
                var refer = document.referrer;
                //等待两秒跳转页面
                setTimeout(function(){
                    //如果来源是zzh或白名单,返回refer
                    console.log(refer.indexOf("zhongzhihui.com"));
                    console.log(includeUrl(refer));
                    if(refer.indexOf("zhongzhihui.com") || includeUrl(refer)){
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

    //登陆页面切换登陆形态
    $(".jsTab").on("click","span",function(){
        if($(this).hasClass("active")){
            return false;
        }
        $(this).addClass("active").siblings().removeClass("active");
        $(".mod-login form").toggle();
    });

    //获取验证码
    $(".jsVerifyCode").on("click",function(){
        var verifyCode = $(this);
        //获取阶段直接返回
        if(verifyCode.hasClass("ui-btn-disable")){
            return false;
        }
        //发送ajax请求
        io.get($PAGE_DATA['code'],{mobile : $("#jMobile").val()},
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


});