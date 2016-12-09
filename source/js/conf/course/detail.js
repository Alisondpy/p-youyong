/**
 * Created by wangLiang on 2016/11/30 0030.
 */
define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/crossbox');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var io = require('lib/core/1.0.0/io/request');
    var Tab = require('lib/ui/tab/1.0.0/tab');
    var template=require("template");
    var Pager = require('plugins/pager/1.0.0/pager');
    var navigation = require('module/navigation-bar/1.0.0/navigation-bar');

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

    var jPagination = $('#jPagination');

    $('.jWrap2').on('click','#jQuestion',function(){
        box.loadUrl('/p-youyong/dist/html/ask-pop.html', {
            title: '提问页面',
            autoRelease: true,
            modal: false
        });
    });
    /*
     * 渲染分页列表
     * */
    var lazy,pager;
    function renderList(url,data,tmpEl,htmEl,pagEl){
        if(typeof pager !== 'undefined'){
            pager.destroy();
        }
        pager = new Pager(pagEl, {
            url:url,
            data:data,
            alias: {
                currentPage: 'currentPage',
                pageSize: 'pageSize'
            },
            options: {
                currentPage: 1, // start with 1
                pageSize: 8
            }
        });

        var loading = null;

        pager.on('ajaxStart', function() {
            loading = Box.loading('正在加载...', {
                modal: false
            });
        });

        pager.on('ajaxSuccess', function(res, callback) {
            if(!$.isEmptyObject(res.data) && res.data && res.data.resultList && res.data.resultList.length > 0){
                var html = template(tmpEl,res.data);
                document.getElementById(htmEl).innerHTML = html;
                //图片懒加载
                lazy = new Lazyload($("#"+htmEl).find('.jImg'), {
                    mouseWheel: true,
                    effect: 'fadeIn',
                    snap: true
                });
                callback && callback(res.data.records);
            }else {
                var html = template('tEmpty',1);
                document.getElementById(htmEl).innerHTML = html;
                pagEl.hide();
            }
            loading && loading.hide();
        });

        pager.on('ajaxError', function(data) {
            document.getElementById(htmEl).innerHTML = "<div style='color: #000;'>请求超时请重试！<a href=''>刷新</a></div>";
            loading && loading.hide();
        });

        pager.on('change', function(pageNum, e) {});
    };


    //图片懒加载
    lazy = new Lazyload($('.jImg'), {
        mouseWheel: true,
        effect: 'fadeIn',
        snap: true
    });

    function init(){
        var data = $('#jSubNav').find('.current').attr("data-value");
        renderList($PAGE_DATA['baseStaticUrl']+'source/api/course/tab0.json',{'type':data},'jWrap0','jWrap0Box',jPagination);
    }
    init();

    //tab页切换
    var jTab = $('#jTab');
    var tab = new Tab(jTab);
    tab.on('change', function(el) {
        var type = el.hd.attr('data-value');
        console.log(type);
        switch (type){
            case '0':
                renderList($PAGE_DATA['baseStaticUrl']+'source/api/course/details.json',{'type':type},'jWrap0','jWrap0Box',jPagination);
                break;
            case '1':
                renderList($PAGE_DATA['baseStaticUrl']+'source/api/course/details.json',{'type':type},'jWrap1','jWrap1Box',jPagination);
                break;
            case '2':
                renderList($PAGE_DATA['baseStaticUrl']+'source/api/course/details.json',{'type':type},'jWrap2','jWrap2Box',jPagination);
                break;
            case '3':
                renderList($PAGE_DATA['baseStaticUrl']+'source/api/course/details.json',{'type':type},'jWrap3','jWrap3Box',jPagination);
                break;
        }
    });

    var nav1 = new navigation('.jWrap2',{
        currentClass:'active',//当前样式
        navSelector:['#jSubNav'],//导航栏dom选择器
        navItemSlect:'.bar-left'
    });
    nav1.on('change',function(data){
        renderList($PAGE_DATA['baseStaticUrl']+'source/api/course/details.json',{'data':data},'jWrap2','jWrap2Box',jPagination);
    });

    var nav2 = new navigation('.jWrap3',{
        currentClass:'active',//当前样式
        navSelector:['#jSubNav'],//导航栏dom选择器
        navItemSlect:'.bar-left'
    });
    nav2.on('change',function(data){
        renderList($PAGE_DATA['baseStaticUrl']+'source/api/course/details.json',{'data':data},'jWrap3','jWrap3Box',jPagination);
    });

    //评论字数限制
    $('.jTxt').keyup(function(){
        var txtLen = $('.jTxt').val().length;
        if(txtLen > 300){
            $(this).addClass('text-error');
            $('.jPublish').addClass('publish-error');
            $('.jArrow').addClass('arrow-error');
            $('.jTxtNum').css({'color':'red'});
        }else {
            $(this).removeClass('text-error');
            $('.jPublish').removeClass('publish-error');
            $('.jArrow').removeClass('arrow-error');
            $('.jTxtNum').css({'color':'#666'});
        }
        $('.jTxtNum').children('i').text(txtLen);
    });

    //评论focus效果
    $('.jTxt').focus(function(){
        $('.jArrow').addClass('arrow-focus');
        $(this).addClass('text-focus').attr('placeholder','');
    }).blur(function(){
        if($(this).val() === ''){
            $(this).removeClass('text-focus').attr('placeholder','看点糟点，不吐不快！别憋着，马上大声说出来吧！');
            $('.jArrow').removeClass('arrow-focus');
        }
    });

    //点赞
    $('#jWrap1Box').on('click','.mod-item .like',function(){
        if($(this).hasClass("activeLike")){
            $(this).removeClass('activeLike');
        }else {
            $(this).addClass('activeLike');
        }
    });

    //采集
    $('#jWrap3Box').on('click','.mod-item .pick',function(){
        if($(this).hasClass("picked")){
            $(this).find('i').text('采集');
            $(this).removeClass('picked');
        }else {
            $(this).find('i').text('已采集');
            $(this).addClass('picked');
        }
    });

    //只看我的
    $('.jWrap3 .bar-right').click(function(){
        if($(this).text() === '只看我的'){
            $(this).text('取消只看我的');
        }else {
            $(this).text('只看我的');
        }
    });

    //查看全文
    $('.jViewAll').click(function(){
        if($(this).text() !== "收起"){
            $(this).parent().parent().siblings('.jWrap3P').css({"overflow":"visible","display":"block"});
            $(this).html('<i class="view-up"></i>收起');
        }else {
            $(this).parent().parent().siblings('.jWrap3P').css({"overflow":"hidden","display":"-webkit-box"});
            $(this).html('<i class="view-down"></i>查看全文');
        }
    });

});
