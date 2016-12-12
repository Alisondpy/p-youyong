/**
 * Created by linzhixiang on 16/12/9.
 */
define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/crossbox');
    var io = require('lib/core/1.0.0/io/request');
    var validate = require('plugins/validator/1.0.0/validator');
    var form = require("lib/core/1.0.0/utils/form");
    /*底部 start*/
    var Footer = require('module/footer/1.0.0/footer');
    var footer = new Footer();
    /*底部 end*/


    //临时代码,触发初始化,修改无法初始验证手机号,触发验证码按钮的bug
    //setTimeout(function(){
    //    $(".submit").trigger("click");
    //    $("label.error").hide();
    //    $(".error-red").removeClass("error-red");
    //},0);

    //手机号正确才允许点击验证码
    $.validator.addMethod("lms", function(value, element, param) {
        var mobile = /^0?(13[0-9]|15[0-9]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if(mobile.test(value)){
            //修改点击提交触发验证,恢复验证码按钮色彩的功能
            //change修改提交时触发验证手机号的bug
            if($(".jsVerifyCode").hasClass("change")) {

            }else{
                $(param).removeClass("ui-btn-disable");
            }
            return this.optional(element) || true;
        }else{
            $(param).addClass("ui-btn-disable");
            return false;
        }

    }, $.validator.format("请输入正确的手机号"));

    // 手机动态码
    $.validator.addMethod("vierfyCode", function(value, element) {
        var code = /^\d{4}$/;
        return this.optional(element) || (code.test(value));
    }, "请输入动态码");

    //验证成功时执行方法
    function validateSuccess(url,formRes){
        var formData = form.serializeForm(formRes);
        var refer = document.referrer;//来源页面
        formData.returnUrl = encodeURI(refer);
        io.get(url,formData,function(res){
            box.ok("注册成功");
            refer = decodeURI(res.data.returnUrl);
            alert(refer);
            //等待1秒跳转页面
            setTimeout(function(){
                //注册成功,返回来源页面或登陆页面
                //登陆页url
                location.href = refer;
            },1000);
        },function(res){
            if(res.msg){
                box.error(res.msg);
            }else{
                box.error('网络错误');
            }

        });
    }

    //注册页面验证
    $("#jsRightSignin").validate({
        rules: {
            mobile:{
                lms: ".jsVerifyCode",
                required: true,
                mobile:true
            },
            email:{
                required: true,
                email:true
            },
            vierfyCode : {
                required : true,
                minlength : 4
            },
            password : {
                required : true,
                minlength : 6
            }
        },
        messages : {
            mobile:{
                required: "请输入手机号",
                mobile:"请输入正确的手机号码"
            },
            vierfyCode : {
                required : "请输入动态码",
                minlength : ""
            },
            email:{
                required: "请输入邮箱",
                email:"请输入正确的邮箱"
            },
            password : {
                required : "请输入密码",
                minlength : "密码长度不小于6位,且不包含空格"
            }
        },
        //失去焦点校验
        onfocusout: function(element){
            $(element).valid();
        },
        errorPlacement : function(error,element){
            //验证码特殊结构,修改错误信息放置位置
            if(element.attr("id") === "jDynamic"){
                error.appendTo(element.parents(".item"));
                $(element).parent().addClass("error-red");
                $(element).parents(".item").addClass("error-red");
            }else {
                error.appendTo(element.parent());
                $(element).parent().addClass("error-red");
            }
        },
        success: function(label) {
            //验证码特殊结构,修改错误信息放置位置
            if(label.attr("id") === "jDynamic-error"){
                label.html("&nbsp;").addClass("checked");
                $(label).parent().removeClass("error-red");
                $(label).siblings().children("label").removeClass("error-red");
            }else {
                label.html("&nbsp;").addClass("checked");
                label.parent().removeClass("error-red");
            }
        },
        submitHandler: function(formRes) {
            debugger;
            //验证成功时执行方法
            validateSuccess($PAGE_DATA['register'], formRes)
        }
    });

    //获取验证码
    $(".jsVerifyCode").on("click",function(){
        var verifyCode = $(this);
        //获取阶段直接返回
        if(verifyCode.hasClass("ui-btn-disable")){
            return false;
        }
        //发送ajax请求
        io.get($PAGE_DATA['code'],{mobile : $("#jName").val()},
            function(res){
                //成功后的回调
                console.log({mobile : $("#jName").val()});

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
        //class:change ==== 修改点击提交触发验证,触发验证手机号,恢复验证码按钮色彩的bug
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
    $(".jPopBtn").on("click",function(){
        box.loadUrl($PAGE_DATA['popUrl'], {
            title: '个人注册协议',
            autoRelease: false,
            modal: true //是否有遮罩层
        });
    })

})