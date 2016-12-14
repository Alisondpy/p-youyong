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

    //临时代码,触发初始化,修改无法初始验证手机号,触发验证码按钮的bug
    //setTimeout(function(){
    //    $(".submit").trigger("click");
    //    $("label.error").hide();
    //    $(".item.error").removeClass("error");
    //},0);
    $(".jMSubBtn").click(function(){
        $("#jsForgetPwd").submit();
    })
    //表单提交
    $("#jsForgetPwd").validate({
        rules: {
            mobile:{
                lms : ".jsVerifyCode",
                required: true,
                mobile:true
            },
            //vierfyCode: {
            //    required: true
            //},
            password : {
                required : true,
                minlength : 6
            }
        },
        messages: {
            mobile:{
                required: "请输入手机号码",
                mobile:"请正确的输入手机号码"
            },
            password: {
                required: "请输入密码",
                minlength: "密码长度不能小于6个字母,不允许包含空格"
            },
        },
        errorPlacement : function(error,element){
            //console.log(error,element);
            error.appendTo(element.parent());
            $(element).parent().addClass("error");
            //debugger;
        },
        onfocusout: function(element) {
            if($(element).valid()){
                $(element).parent(".item").removeClass("error");
            }else{
                $(element).parent(".item").addClass("error");
            }
        },
        onkeyup: function(element) {
            if($(element).valid()){
                $(element).parent(".item").removeClass("error");
            }else{
                $(element).parent(".item").addClass("error");
            }
        },
        success: function(label) {
            // set &nbsp; as text for IE
            label.html("&nbsp;").addClass("checked");
            label.parent().removeClass("error");
        },
        submitHandler: function(formRes){
            //判断jNextStep是否提交,没有可以提交
            if(!$("#jNextStep").hasClass("jNextStep")){
                var formData = form.serializeForm(formRes);
                var refer = document.referrer;
                var locationUrl = "";//业务指定跳转的链接
                formData.returnUrl = encodeURI(refer);
                io.get($PAGE_DATA['forgetPwd'],formData,function(res){
                    box.ok("修改密码成功");
                    //等待1秒跳转页面
                    setTimeout(function(){
                        if(locationUrl){
                            location.href = locationUrl;
                        }else{
                            //否则跳回referrer
                            location.href = decodeURI(res.data.returnUrl);
                        }
                    },1000);
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


    //获取验证码
    $(".jsVerifyCode").on("click",function(){
        var verifyCode = $(this);
        //获取阶段直接返回
            //ui-btn-disable判断是否
        if(verifyCode.hasClass("ui-btn-disable")){
            return false;
        };
        //发送ajax请求
        io.get($PAGE_DATA['code'],{mobile : $("#jName").val(), type:3},
            function(res){
                //成功后的回调
                //成功点击获取,1出现新密码框,2移除class--jNextStep允许提交,3修改提交input的文字
                $(".jnewPwd").show();
                $("#jNextStep").removeClass("jNextStep").val("提交");
                $('#jDynamic').removeAttr("disabled");
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