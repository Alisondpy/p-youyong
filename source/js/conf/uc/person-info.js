define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var jFormPwd = $('#jFormPwd');
    require('./common');

    /*顶部搜索、登录状态、底部、右侧在线客服 end*/

    var form = require('lib/core/1.0.0/utils/form');
    var box = require('lib/ui/box/1.0.1/box');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var Uploader = require('lib/plugins/uploader/1.0.1/uploader');
    require('plugins/validator/1.0.0/validator');
    var Io = require('lib/core/1.0.0/io/request');
    //图片上传插件
    var jAvater = $('#jAvater');
    var jImg = $('.jImg');
    //三级联动
    var location = require();
    jAvater.on('click', function() {
        var uploader = new Uploader({
            tabs: [{
                type: 'local',
                options: {
                    uploadLimit: 1,
                    fileObjName: 'file_data',
                    swf: $PAGE_DATA['swf'], //swf的路径
                    uploader: $PAGE_DATA['uploader'], //后台存放图片的地址
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
                jAvater.val(urls[0]);
                $("#avatarUrl").val(urls[0]);

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
                Io.post($PAGE_DATA['submit'],formData,function(data){
                    box.alert("保存成功", function(){
                          window.location.reload();
                    });
                },function(data){
                    box.error((data && data.msg) || '保存失败');
                });
            },
            rules:{
                password:{
                    minlength:2,
                    maxlength:12
                },
                nickName:{
                    required:true,
                    minlength:2,
                    maxlength:12
                },
                realName:{
                    required:true,
                    realname:true
                },
                mobile:{
                    required:true,
                    mobile:true,
                    minlength:11
                    
                },
                email:{
                    required:true,
                    email:true
                },
                job:{
                    required:true,
                    minlength:2,
                    maxlength:12
                },
                unit:{
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
                unit:{
                    required:"请输入您所属的公司名字"
                },
                email:{
                    required:"请输入您的邮箱"
                },
                realName:{
                    required:"请输入您的真实姓名"
                },
                mobile:{
                    required:"请输入您的手机号码"
                },
                job:{
                    required:"请输入您的职业"
                },
                nickName:{
                    required:"请输入您的昵称"
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
                Io.post($PAGE_DATA['editInfo'],formData,function(data){
                    box.alert("密码修改成功",function(){
                        window.location.reload();
                    });

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

    $(".jMSubBtn").click(function(){
        $("#jInfoForm").submit();
    })
    $(".jSubBtn").click(function(){
        $("#jFormPwd").submit();
    })

    var Tab = require('lib/ui/tab/1.0.0/tab');
    var jIfmTab = $('#jIfmTab');
    var ifmTab = new Tab(jIfmTab);
    ifmTab.setCurrent();

    //加载省市区三级联动
    var basePath = $("base").attr('href');

    $.extend({
        // 省市区三级联动
        loadAreaSelect : function(elementName) {
            var element = $("#" + elementName);
            var province = element.find("select").eq(0);
            var provinceName = province.attr("name");
            //var provinceMap = loadArea($PAGE_DATA['location']+1);
            var provinceMap = loadArea($PAGE_DATA['location']);
            province.empty();
            province.append("<option value='0'>请选择省</option>");
            if (provinceMap != null) {
                $.each(provinceMap, function(i, n) {
                    province.append("<option value='" + n.id + "'>" + n.name + "</option>");
                });
            
                var provinceValue = $("input[name='" + provinceName + "_hide']").val();
                if (typeof (provinceValue) != "undefined" && provinceValue != "" && provinceValue != null && provinceValue != "0") {
                    province.val(provinceValue);
                    var city = element.find("select").eq(1);
                    var cityName = city.attr("name");
                    city.empty();
                    city.append("<option value='0'>请选择市</option>");
                    var cityMap = loadArea($PAGE_DATA['location'] + provinceValue);
                    if (cityMap != 0) {
                        $.each(cityMap, function(i, n) {
                            city.append("<option value='" + n.id + "'>" + n.name + "</option>");
                        });
                        var cityValue = $("input[name='" + cityName + "_hide']").val();
                        if (cityValue != "" && typeof (cityValue) != "undefined" && cityValue != null && cityValue != "0") {
                            city.val(cityValue);
                            var county = element.find("select").eq(2);
                            var countyName = county.attr("name");
                            var countyValue = $("input[name='" + countyName + "_hide']").val();
                            var countyMap = loadArea($PAGE_DATA['location'] + cityValue);
                            county.empty();
                            county.append("<option value='0'>请选择县/区</option>");
                            if (countyMap != null) {
                                $.each(countyMap, function(i, n) {
                                    county.append("<option value='" + n.id + "'>" + n.name + "</option>");
                                });

                                if (countyValue != "" && typeof (countyValue) != "undefined" && countyValue != null && countyValue != "0") {
                                    county.val(countyValue);
                                }
                            }

                        }
                    }
                }
            }
            province.change(function() {
                element.find("select").each(function(i) {
                    switch (i) {
                        case 1:
                            $(this).empty();
                            $(this).append("<option value='0'>请选择市</option>");
                            break;
                        case 2:
                            $(this).empty();
                            $(this).append("<option value='0'>请选择区/县</option>");
                            break;
                    }
                });
                var province_change = $(this).val();

                var cityMap = loadArea($PAGE_DATA['location'] + province_change);
                if (cityMap != 0) {

                    $.each(cityMap, function(i, n) {
                        city.append("<option value='" + n.id + "'>" + n.name + "</option>");
                    });
                }
            });

            var province_val = $("#" + province.attr("name") + "_hid").val();
            var city = element.find("select").eq(1);
            if (province_val != null && typeof (province_val) != "undefined" && province_val != '') {
                province.val(province_val);
                var city_change_Map = loadArea($PAGE_DATA['location'] + province_val);
                city.empty();
                city.append("<option value='0'>请选择市</option>");
                if (city_change_Map != 0) {
                    $.each(city_change_Map, function(i, n) {
                        city.append("<option value='" + n.id + "'>" + n.name + "</option>");
                    });
                }
            }
            city.change(function() {
                var city_change = $(this).val();
                var county_change_Map = loadArea($PAGE_DATA['location'] + city_change);
                county.empty();
                county.append("<option value='0'>请选择县/区</option>");
                if (county_change_Map != null) {
                    $.each(county_change_Map, function(i, n) {
                        county.append("<option value='" + n.id + "'>" + n.name + "</option>");
                    });
                }
            });

            var city_val = $("#" + city.attr("name") + "_hid").val();
            var county = element.find("select").eq(2);
            if (city_val != null && typeof (city_val) != "undefined" && city_val != '') {
                city.val(city_val);
                var countyMap = loadArea($PAGE_DATA['location'] + city_val);
                county.empty();
                county.append("<option value='0'>请选择县/区</option>");
                if (countyMap != null) {
                    $.each(countyMap, function(i, n) {
                        county.append("<option value='" + n.id + "'>" + n.name + "</option>");
                    });
                }
            }

            var county_val = $("#" + county.attr("name") + "_hid").val();
            if (county_val != null && typeof (county_val) != "undefined" && county_val != '') {
                county.val(county_val);
            }
        }
    });

    function loadArea(url) {
        var areaMap;
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'POST',
            async: false,
            success: function (data) {
                areaMap = data.regionInfoList;
            }
        });
        return areaMap;
    }

    $.loadAreaSelect("areaSelect");
});