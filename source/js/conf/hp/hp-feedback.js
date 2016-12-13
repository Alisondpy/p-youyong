var define2 = define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    require('plugins/validator/1.0.0/validator');
    var form = require('lib/core/1.0.0/utils/form');
    var Uploader = require('lib/plugins/uploader/1.0.1/uploader');
    var io = require('lib/core/1.0.0/io/request');
    var box = require('lib/ui/box/1.0.1/box');

    /*顶部搜索、登录状态、底部、右侧在线客服 start*/
    var TopSearch = require('module/top-search/1.0.0/top-search');
    var LoginStatus = require('module/login-status/1.0.0/login-status');
    var FixBar = require('module/fix-bar/1.0.0/fix-bar');
    var Footer = require('module/footer/1.0.0/footer');
    var topSearch = new TopSearch();
    var loginStatus = new LoginStatus();
    var fixBar = new FixBar();
    var footer = new Footer();
    /*顶部搜索、登录状态、底部、右侧在线客服 end*/

    var jImgList = $('#jImgList');
    var jImgFile = $("#jImgFile");
    //图片上传插件
    jImgList.on('click', function() {
        var uploader = new Uploader({
            tabs: [{
                type: 'local',
                options: {
                    fileObjName:'file_data',
                    swf:$PAGE_DATA['swfUrl'],//swf的路径
                    uploader: $PAGE_DATA['uploadImgUrl'],//后台存放图片的地址
                    formData:$PAGE_DATA['uploadData']
                }
            }],
            limit: 1, //上传限制，当是0的时候就代表无限制多选
            selected: [] //选种的图片
        });
        uploader.on('ok', function(urls) {
            var str='';
            if(urls && urls.length > 0){
                for (var i = 0; i < urls.length; i++) {
                    str += '<img src="' + urls[i] + '">';
                    jImgFile.val(urls[i]);
                    jImgList.html(str);
                }
            }else{
                jImgFile.val("");
            }
            this.hide();
        });
        uploader.show();
    });
    //意见反馈表单验证

    $("#jViewSub").validate({
        submitHandler: function(formRes){
            var formData = form.serializeForm(formRes);
            io.get($PAGE_DATA['saveUrl'],formData,function(data){
                box.ok("意见反馈提交成功");
                jImgList.html('<label id="jChooseBg" class="upload-btn"><span class="iyoyo iyoyo-add-img"></span></label>');
                setTimeout(function(){
                    formRes.reset();
                },3000)
            },function(){
                box.error(data.msg||'提交意见反馈失败');
            });
        },
        //失去焦点校验
        onfocusout: function(element){
            $(element).valid();
        },
        //onkeyup:false,
        rules:{
            title:{
                required:true,
                rangelength:[6,20]
            },
            contact:{
                required:true,
                isContact:"isContact"
            },
            content:{
                required:true
            }

        },
        messages: {
            title: {
                required: "请填写标题",
                rangelength: "请输入长度在 6 到 20 之间的字符串"
            },
            content:'请填写具体内容',
            contact:{
                required: "请填写联系方式",
                isContact:"请填写正确的联系方式"
            }
        }
    })
    //自定义联系方式校验
    jQuery.validator.addMethod("isContact", function(value, element) {
        var contact = /(\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14})|(^\d{5,10}$)/;
        return this.optional(element) || (contact.test(value));
    }, "");
    $("#jSubForm").click(function(){
        $("#jViewSub").submit();
    })
});