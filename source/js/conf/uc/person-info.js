define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    require('plugins/validator/1.0.0/validator'); 
    var jFormPwd = $('#jFormPwd');
    /*顶部搜索、登录状态、底部、右侧在线客服 start*/
    var TopSearch = require('module/top-search/1.0.0/top-search');
    var LoginStatus = require('module/login-status/1.0.0/login-status');
    var Footer = require('module/footer/1.0.0/footer');
    var Io = require('lib/core/1.0.0/io/request');
    var loginStatus = new LoginStatus();
    var footer = new Footer();
    /*顶部搜索、登录状态、底部、右侧在线客服 end*/

    var form = require('lib/core/1.0.0/utils/form');
    var box = require('lib/ui/box/1.0.1/box');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var Uploader = require('lib/plugins/uploader/1.0.1/uploader');

    //图片上传插件
    var jAvater = $('#jAvater');
    jAvater.on('click', function() {
        var uploader = new Uploader({
            tabs: [{
                type: 'local',
                options: {
                    uploadLimit: 1,
                    fileObjName: 'file_data',
                    swf: $PAGE_DATA['swfUrl'], //swf的路径
                    uploader: $PAGE_DATA['uploadImgUrl'], //后台存放图片的地址
                    formData: $.extend(true, {}, $PAGE_DATA['uploadData'])
                }
            }],
            limit: 1, //上传限制，当是0的时候就代表无限制多选
            selected: [] //选种的图片
        });
        uploader.on('ok', function(urls) {
            var str = '';
            if (urls.length > 0) {
                jImg.attr('src', urls[0]);
            }
            this.hide();
        });
        uploader.show();
    });

     function infoForm(){
        $('#jInfoForm').validate({
             onfocusout: function(element){
                $(element).valid();
            },
             submitHandler: function(formRes){
                var formData = form.serializeForm(formRes);
                Io.get($PAGE_DATA['getPager'],formData,function(data){
                    box.ok("保存成功");
                },function(data){
                    box.error((data && data.msg) || '保存失败');
                });
            },
            rules:{
                password:{
                    minlength:2,
                    maxlength:12
                },
                nickname:{
                    minlength:2,
                    maxlength:12
                },
                realname:{
                    required:true,
                    realname:true
                },
                mobile:{
                    required:true,
                    minlength:11,
                    mobile:true
                },
                email:{
                    required:true,
                    email:true
                },
                occupation:{
                    required:true,
                    minlength:2,
                    maxlength:12
                },
                companyName:{
                    required:true,
                    minlength:2,
                    maxlength:20
                },
                qq:{
                    qq:true
                },
                address:{
                    minlength:2,
                    maxlength:45
                }
            },
            messages:{
                companyName:{
                    required:"请填写公司的名称"
                }
            }
        }) 
    };
 
    infoForm();

    function subForm(){
        jFormPwd.validate({
             onfocusout: function(element){
                $(element).valid();
            },
            submitHandler: function(formRes){
                var formData = form.serializeForm(formRes);
                Io.get($PAGE_DATA['getPager'],formData,function(data){
                    console.log(data);
                    box.ok("保存成功");
                    },function(data){
                        box.error(data.msg || '保存失败了');
                    });
                },
            rules:{
                oldPassword:{
                    required:true,
                    minlength:6,
                    maxlength:16
                },
                newPassword:{
                    required:true,
                    minlength:6,
                    maxlength:16,
                    equalTo:'#sure'
                },
                rePassword:{
                    required:true,
                    minlength:6,
                    maxlength:16,
                    equalTo:'#nepassword'
                }
            },
            messages:{
                password:{
                    required:"密码格式不正确"
                },
                nepassword:{
                    required:"密码格式不正确",
                    equalTo:"密码输入不一致"
                },
                snewpassword:{
                    required:"密码格式不正确",
                    equalTo:"密码输入不一致"
                }
            }
        })
    };

    subForm();

    var Tab = require('lib/ui/tab/1.0.0/tab');
    var jIfmTab = $('#jIfmTab');
    var ifmTab = new Tab(jIfmTab);
    ifmTab.setCurrent();

});
