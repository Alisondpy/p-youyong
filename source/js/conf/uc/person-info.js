define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    require('plugins/validator/1.0.0/validator'); 
    /*顶部搜索、登录状态、底部、右侧在线客服 start*/
    var TopSearch = require('module/top-search/1.0.0/top-search');
    var LoginStatus = require('module/login-status/1.0.0/login-status');
    var Footer = require('module/footer/1.0.0/footer');
    var loginStatus = new LoginStatus();
    var footer = new Footer();
    /*顶部搜索、登录状态、底部、右侧在线客服 end*/

    var form = require('lib/core/1.0.0/utils/form');
    var box = require('lib/ui/box/1.0.1/box');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var Uploader = require('lib/plugins/uploader/1.0.1/uploader');
    var btn = $('.btn');
    //图片上传插件
    var jAvater = $('#jAvater');
    jAvater.on('click', function() {

        //徐丽华变淡
        console.log( 'ddd:',form.serializeForm('#jInfoForm'));


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

    //个人信息表单验证
     $().ready(function(){
           $('#jInfoForm').validate({
             onfocusout: function(element){
                $(element).valid();
            },
            debug:true,
            rules:{
                cname:{
                    required:true,
                },
                phone:{
                    required:true,
                    minlength:11
                },
                ccompany:{
                    required:true,
                },
                email:{
                    required:true,
                }
            },
            messages:{
                cname:{
                    required:"请填写姓名",
                    minlength:"姓名不合法"
                },
                ccompany:{
                    required:"请填写公司的名称"
                }
                // email:{
                //     required:"请填写您的需求"

                // }
            }
        }) 
    })


    var Tab = require('lib/ui/tab/1.0.0/tab');
    var jIfmTab = $('#jIfmTab');
    var ifmTab = new Tab(jIfmTab);

    ifmTab.setCurrent();




});
