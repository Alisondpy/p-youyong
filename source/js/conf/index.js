/**
 * Created by wangLiang on 2016/11/30 0030.
 */
define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    require('lib/ui/slider/1.0.0/slider');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var io = require('lib/core/1.0.0/io/request');
    var swiper = require('lib/plugins/swiper/2.7.0/swiper');
    var Tab = require('lib/ui/tab/1.0.0/tab');
    require('plugins/layer/layer');

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

    //轮播图
    $('#jSlider').slider();

    //图片懒加载
    var lazy = new Lazyload($('.jImg'), {
        mouseWheel: true,
        effect: 'fadeIn',
        snap: true
    });

    //师资团队滚动
    var teacherSwiper = new swiper('#jSwiper', {
        slidesPerView: 3
    });

    $('#jRight').on('click', function() {
        teacherSwiper.swipeNext();
    });
    $('#jLeft').on('click', function() {
        teacherSwiper.swipePrev();
    });


    //教学环境合作企业tab切换
    var jTab = $('#jTab');
    var tab = new Tab(jTab);
    tab.on('change', function(el) {
        var type = el.hd.attr('data-target');
        lazy.update();
        if(type == '2'){
            //合作企业滚动
            var companySwiper = new swiper('#jSubSwiper', {
                slidesPerView: 4
            });

            $('#jSubSwiper').on('click','#jSubRight', function() {
                companySwiper.swipeNext();
            });
            $('#jSubSwiper').on('click', '#jSubLeft',function() {
                companySwiper.swipePrev();
            });
        }
    });

    //弹出相框
    function getAlums(photoId) {
        io.get($PAGE_DATA['loadPicture'], {"pid":photoId}, function(data) {
            // console.log(data);
            if (data.error < 0) {
                box.error(data.msg);
            } else {
                try {
                    var imgData = data.data;
                    var title = imgData[0].imageName;
                    var id = imgData[0].imageId;
                    var imgList = [];
                    $.each(imgData, function(i, n) {
                        imgList[i] = {
                            "alt": n.imageName,
                            "pid": n.imageId,
                            "src": n.imageUrl,
                            "thumb": ""
                        }
                    });
                    var imgJson = {
                        "title": title,
                        "id": id,
                        "start": 0,
                        "status": 1,
                        "data": imgList
                    };
                    layer.photos({
                        photos: imgJson,
                        anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
                    });
                } catch (e) {
                    box.error('暂无数据');
                }
            }
        }, function(res) {
            box.error('网络错误');
        }, this);
    };
    $('.jAlum').on('click', function() {
        var photoId = $(this).attr("data-id");
        // console.log(photoId);
        getAlums(photoId);
    });
});
