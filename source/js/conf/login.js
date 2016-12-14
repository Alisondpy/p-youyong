define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var io = require('lib/core/1.0.0/io/request');
    var validate = require('plugins/validator/1.0.0/validator');
    var form = require("lib/core/1.0.0/utils/form");
    var Utils = require("lib/core/1.0.0/utils/util");
    var cookie = require("lib/core/1.0.0/io/cookie");
    /*底部 start*/
    var Footer = require('module/footer/1.0.0/footer');
    var footer = new Footer();
    /*底部 end*/

    /*图片懒加载 start*/
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var lazy = new Lazyload($('.jImg'), {
        mouseWheel: true,
        effect: 'fadeIn',
        snap: true
    });
    /*底部 start*/

    //页面进入先失去焦点
    //$("#jMobile").blur();
    // 实时检测恢复验证码
    $.validator.addMethod("lms", function(value, element, param) {
        var mobile = /^0?(13[0-9]|15[0-9]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (mobile.test(value)) {
            //修改点击提交触发验证,恢复验证码按钮色彩的功能
            if ($(".jsVerifyCode").hasClass("change")) {} else {
                $(param).removeClass("ui-btn-disable");
                $('#jDynamic').removeAttr("disabled");
            }
            return this.optional(element) || true;
        } else {
            $('#jDynamic').attr("disabled", "disabled");
            $(param).addClass("ui-btn-disable");
            return false
        }
    }, $.validator.format("请输入正确的手机号"));

    // 手机或邮箱验证
    $.validator.addMethod("mobileEmail", function(value, element) {
        var rMobile = /^0?(13[0-9]|15[0-9]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
            rEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        return this.optional(element) || (rMobile.test(value)) || (rEmail.test(value));
    }, "请正确填写您的手机号或邮箱");

    // 手机动态码
    $.validator.addMethod("vierfyCode", function(value, element) {
        var code = /^\d{4}$/;
        return this.optional(element) || (code.test(value));
    }, "请输入动态码");

    //手机动态码登陆
    $("#jRightLoginMobile").validate({
        submitHandler: function(formRes) {
            //验证成功时执行方法
            validateSuccess($PAGE_DATA['mobileLogin'], formRes);
        },
        errorPlacement: function(error, element) {
            //验证码特殊结构,修改错误信息放置位置
            if (element.attr("id") === "jDynamic") {
                error.appendTo(element.parents(".item"));
                $(element).parents(".item").addClass("error-red");
            } else {
                error.appendTo(element.parent());
                $(element).parent().addClass("error");
            }

        },
        //失去焦点校验
        onfocusout: function(element) {
            if($(element).valid()){
                $(element).parent(".item").removeClass("error");
                $(element).parents(".item").removeClass("error-red");
            }else{
                $(element).parent(".item").addClass("error");
                $(element).parent().addClass("error-red");
                $(element).parents(".item").addClass("error-red");
            }
        },
        onkeyup: function(element) {
            if($(element).valid()){
                $(element).parent(".item").removeClass("error");
                $(element).parents(".item").removeClass("error-red");
            }else{
                $(element).parent(".item").addClass("error");
                $(element).parents(".item").addClass("error-red");
            }
        },
        success: function(label) {
            //验证码特殊结构,修改错误信息放置位置
            if (label.attr("id") === "jDynamic-error") {
                label.html("&nbsp;").addClass("checked");
                $(label).parent().removeClass("error-red");
                $(label).siblings().children("label").removeClass("error-red");
            } else {
                label.html("&nbsp;").addClass("checked");
                label.parent().removeClass("error");
            }
        },
        rules: {
            mobile: {
                lms: '.jsVerifyCode',
                required: true,
                mobile: true
            },
            vierfyCode: {
                required: true
            }
        },
        messages: {
            mobile: {
                required: "请输入您的手机号",
                mobile: "请正确填写您的手机号"
            },
            vierfyCode: {
                required: "请输入动态码"
            }
        }
    });

    //普通登陆
    $("#jLoginForm").validate({
        rules: {
            username: {
                required: true,
                mobileEmail: true
            },
            password: {
                required: true,
                minlength: 6
            }
        },
        //失去焦点校验
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
        errorPlacement: function(error, element) {
            error.appendTo(element.parent());
            $(element).parent().addClass("error");
        },
        success: function(label) {
            // set &nbsp; as text for IE
            label.html("&nbsp;").addClass("checked");
            label.parent().removeClass("error");
        },
        messages: {
            username: {
                required: "请输入您的手机或邮箱",
                mobile: "请正确填写您的手机号或邮箱地址"
            },
            password: {
                required: "请输入您的密码",
                minlength: "您输入的密码和账户名不匹配"
            }
        },
        submitHandler: function(formRes) {
            //验证成功时执行方法
            validateSuccess($PAGE_DATA['normalLogin'], formRes);
        }
    });
    $(".jMSubBtn").click(function(){
        $("#jLoginForm").submit();
    })
    $(".jSubBtn").click(function(){
        $("#jRightLoginMobile").submit();
    })
    //登陆页面切换登陆形态
    $(".jsTab").on("click", "span", function() {
        if ($(this).hasClass("active")) {
            return false;
        }
        $(this).addClass("active").siblings().removeClass("active");
        $(".mod-login form").toggle();
    });

    //获取验证码
    $(".jsVerifyCode").on("click", function() {
        var verifyCode = $(this);
        //获取阶段直接返回
        if (verifyCode.hasClass("ui-btn-disable")) {
            return false;
        }
        //发送ajax请求
        io.post($PAGE_DATA['code'], { mobile: $("#jMobile").val(), type:2 }, function(res) {
                //验证码发送成功
                var count = 60;
                verifyCode.val(count).addClass("ui-btn-disable change");
                var time = setInterval(function() {
                    if (count > 1) {
                        count--;
                        verifyCode.val(count);
                    } else {
                        verifyCode.removeClass("ui-btn-disable change").val("获取验证码");
                        clearInterval(time);
                    }
                }, 1000);
            },
            function(res) {
                //验证码发送失败
                verifyCode.removeClass("ui-btn-disable change").val("重新获取");
                box.error((res && res.msg) || '获取验证失败，请重试！', verifyCode[0]);
            });
    });

    //验证成功时执行方法
    function validateSuccess(url, formRes) {
        var formData = form.serializeForm(formRes);
        formData.returnUrl = getReturnUrl();
        io.post(url, formData, function(res) {
            box.ok("登陆成功");
            //等待1秒跳转页面
            var refer = res.data.returnUrl;
            cookie.set('__returnUrl', null);
            if (refer) {
                refer = decodeURIComponent(refer);
                setTimeout(function() {
                    window.location.href = refer;
                }, 1000);
            }
        }, function(res) {
            box.error((res && res.msg) || '网络错误，请重试！');
        });
    }

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }


    //验证refer是否属于白名单里面
    function getReturnUrl() {
        //白名单
        var allowerList = [
            /zhongzhihui.com/,
            /localhost:/
        ];
        var defaultReturnUrl = ($PAGE_DATA && $PAGE_DATA['defaultReturnUrl']) || 'http://www.zhongzhihui.com';
        //从哪里来到哪里去
        //如果url带有returnUrl，优先跳转
        //如果url没有就从cookie去取，
        //如果cookie没有就从document.referrer
        //如果document.referrer没有就用默认
        var returnUrl = getQueryString('returnUrl');
        if (returnUrl) {
            returnUrl = decodeURIComponent(returnUrl);
        } else {
            returnUrl = cookie.get('__returnUrl');
            if (returnUrl) {
                returnUrl = decodeURIComponent(returnUrl)
            } else {
                returnUrl = document.referrer;
                if (!returnUrl) {
                    returnUrl = defaultReturnUrl;

                }
            }
        }

        if (returnUrl) {
            for (var i = 0; i < allowerList.length; i++) {
                if (allowerList[i].test(returnUrl)) {
                    returnUrl = encodeURIComponent(returnUrl);
                    cookie.set('__returnUrl', returnUrl, { expires: 0.04 });
                    return returnUrl;
                }
            }
        }
        return encodeURIComponent(defaultReturnUrl);
    }

});
