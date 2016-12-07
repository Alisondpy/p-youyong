define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    require('plugins/validator/1.0.0/validator');
    var form = require('lib/core/1.0.0/utils/form');
    var Uploader = require('lib/plugins/uploader/1.0.1/uploader');
    var io = require('lib/core/1.0.0/io/request');
    var box = require('lib/ui/box/1.0.1/box');

    var jChooseBg = $('#jChooseBg');
    var jImgList = $('#jImgList');

    //图片上传插件
    jChooseBg.on('click', function() {
        var uploader = new Uploader({
            tabs: [{
                type: 'local',
                options: {
                    uploadLimit: 0,
                    swf: '../../../lib/plugins/uploader/1.0.1/uploadify.swf',//swf的路径
                    uploader: '/Upload/images/'//后台存放图片的地址
                }
            }],
            limit: 0, //上传限制，当是0的时候就代表无限制多选
            selected: [] //选种的图片
        });
        uploader.on('ok', function(urls) {
            console.log(urls);
            var str = '';
            for (var i = 0; i < urls.length; i++) {
                str += '<img src="' + urls[i] + '">';
            }
            jImgList.html(urls);
            this.hide();
        });
        uploader.show();
    });
    //意见反馈表单验证
/*    submitHandler: function(form){
        var formData = form.serializeForm($('#jViewSub'));
        io['post']($PAGE_DATA['feedbacksUrl'],formData,function(data){
            box.success('gongxx');
        },function(data){
            box.error('ddddk');
        });
    }*/

    $("#jViewSub").validate({
        submitHandler: function(form){
            var imgSrc=$("#jImgUpload").attr("src");
            $("#imgFile").val(imgSrc);
            var formData = form.serializeForm($('#jViewSub'));
            io['post']($PAGE_DATA['feedbacksUrl'],formData,function(data){
                box.success('你已成功到达后台');
            },function(){
                box.error("sorry,表单提交失败");
            });
        },
        //失去焦点校验
        onfocusout: function(element){
            $(element).valid();
        },
        //onkeyup:false,
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
});