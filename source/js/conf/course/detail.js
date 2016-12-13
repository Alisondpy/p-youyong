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
    var cookie = require("lib/core/1.0.0/io/cookie");
    var Login = require('module/login-status/1.0.0/login');
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

    /*后台全局变量*/
    var sourceId = $PAGE_DATA['sourceId'];
    var toQuestionPage = $PAGE_DATA['toQuestionPage'];
    var jPagination = $('#jPagination');

    /*提问弹窗*/
    $('.jWrap2').on('click','#jQuestion',function(){
        if(Login.isLogin()){
            box.loadUrl(toQuestionPage+"?id="+sourceId, {
                title: '提问页面',
                autoRelease: true,
                modal: false
            });
        }else {
            Login.login(window.location.href);
        }
    });

    //图片懒加载
    var allLazy = new Lazyload($('.mod-detail .jImg'),{
        mouseWheel: true,
        effect: 'fadeIn',
        snap: true
    });

    /* 渲染分页列表 */
    var lazy,pager;
    function renderList(url,data,tmpEl,htmEl,pagEl){
        if(typeof pager !== 'undefined'){
            pager.destroy();
        }
        pager = new Pager(pagEl, {
            url:url,
            data:data,
            options:{
                pageSize: 10,
                currentPage: 1
            }
        });

        var loading = null;

        pager.on('ajaxStart', function() {
            loading = box.loading('正在加载...', {
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

    /*首屏默认加载*/
    function init(){
        var data = $('#jSubNav').find('.current').attr("data-type");
        renderList($PAGE_DATA['LessonUrl'],{'type':data,"id":sourceId},'jWrap0','jWrap0Box',jPagination);
    }
    init();

    /*tab页切换*/
    var jTab = $('#jTab');
    var tab = new Tab(jTab);
    var sourceType,showType;
    tab.on('change', function(el) {
        var type = el.hd.attr('data-target');
        sourceType = el.hd.attr('data-type');
        showType = el.hd.attr('show-type');
        switch (type){
            case '1':
                renderList($PAGE_DATA['LessonUrl'],{'type':sourceType,"id":sourceId},'jWrap0','jWrap0Box',jPagination);
                break;
            case '2':
                renderList($PAGE_DATA['commentUrl'],{'sourceType':sourceType,"sourceId":sourceId},'jWrap1','jWrap1Box',jPagination);
                break;
            case '3':
                renderList($PAGE_DATA['loadQuestionUrl'],{'id':sourceId},'jWrap2','jWrap2Box',jPagination);
                break;
            case '4':
                renderList($PAGE_DATA['loadNoteUrl'],{'sourceType':sourceType,"showType":showType,"sourceId":sourceId},'jWrap3','jWrap3Box',jPagination);
                break;
        }
        allLazy.update();
    });

    /*导航菜单切换*/
    //var nav1 = new navigation('.jWrap2',{
    //    currentClass:'active',//当前样式
    //    navSelector:['#jSubNav'],//导航栏dom选择器
    //    navItemSlect:'.bar-left'
    //});
    //nav1.on('change',function(data){
    //    renderList($PAGE_DATA['baseStaticUrl']+'source/api/course/details.json',{'data':data},'jWrap2','jWrap2Box',jPagination);
    //});
    //var nav2 = new navigation('.jWrap3',{
    //    currentClass:'active',//当前样式
    //    navSelector:['#jSubNav'],//导航栏dom选择器
    //    navItemSlect:'.bar-left'
    //});
    //nav2.on('change',function(data){
    //    renderList($PAGE_DATA['baseStaticUrl']+'source/api/course/details.json',{'data':data},'jWrap3','jWrap3Box',jPagination);
    //});

    /*评论交互*/
    //评论字数限制
    var wrap1 = $('.jWrap1');
    var publish = $('.jPublish');
    var arrow = $('.jArrow');
    var txtNum = $('.jTxtNum');
    var txt = $('.jTxt');
    wrap1.on('input propertychange','.jTxt',function(){
        var txtLen = txt.val().length;
        if(txtLen > 300){
            $(this).addClass('text-error');
            publish.addClass('publish-error');
            arrow.addClass('arrow-error');
            txtNum.css({'color':'red'});
        }else {
            $(this).removeClass('text-error');
            publish.removeClass('publish-error');
            arrow.removeClass('arrow-error');
            txtNum.css({'color':'#666'});
        }
        txtNum.children('i').text(txtLen);
    });

    //发表评论
    wrap1.on('click','.jPublish',function(){
        if(Login.isLogin()){
            var content = txt.val();
            if(content == ''){
                box.error('请输入发表内容');
            }else {
                if(!$(this).hasClass('publish-error')){
                    io.get($PAGE_DATA['commentPostUrl'],{'sourceType':sourceType,"sourceId":sourceId,'content':content},function(res){
                        if(res){
                            if(res.code == 0){
                                box.ok('发表成功');
                                txt.val('');
                                pager.pagination.selectPage(pager.pagination.get('currentPage'));
                            }else {
                                box.error(res.msg || '发表失败');
                            }
                        }else {
                            box.error('发表失败，请重试');
                        }
                    },function(res){
                        box.error(res.msg || '网络错误,请重试');
                    });
                }
            }
        }else {
            Login.login(window.location.href);
        }
    });

    //评论focus效果
    wrap1.on('focus','.jTxt',function(){
        $('.jArrow').addClass('arrow-focus');
        $(this).addClass('text-focus').attr('placeholder','');
        $(this).css('color','#333');
    }).on('blur','.jTxt',function(){
        if($(this).val() === ''){
            $(this).removeClass('text-focus').attr('placeholder','看点糟点，不吐不快！别憋着，马上大声说出来吧！');
            $('.jArrow').removeClass('arrow-focus');
            $(this).css('color','#ccc');
        }
    });


    /*点赞交互*/
    //点赞和采集的接口处理
    function clickInterface(url,data,msg){
        io.get(url,data,function(res){
            if(res){
                if(res.code == 0){
                    box.ok(msg+'成功');
                    pager.pagination.selectPage(pager.pagination.get('currentPage'));
                }else {
                    box.error(res.msg || msg+'失败');
                }
            }else {
                box.error(msg+'失败，请重试');
            }
        },function(res){
            box.error(res.msg || '网络错误,请重试');
        });
    };

    //点赞
    $('#jWrap1Box,#jWrap3Box').on('click','.mod-item .like',function(){
        if(Login.isLogin()){
            var dataType = $(this).attr('data-dataType');
            var type = $(this).attr('data-type');
            var id = $(this).attr('data-value');
            var data;
            if($(this).hasClass("activeLike")){
                data = {
                    "dataType":dataType,
                    "type":type,
                    "id":id
                }
                clickInterface($PAGE_DATA['commentClickUrl'],data,'取消点赞');
            }else {
                data = {
                    "dataType":dataType,
                    "type":type,
                    "id":id
                }
                clickInterface($PAGE_DATA['commentClickUrl'],data,'点赞');
            }
        }else {
            Login.login(window.location.href);
        }
    });

    //采集
    $('#jWrap3Box').on('click','.mod-item .pick',function(){
        if(Login.isLogin()){
            var id = $(this).attr('data-id');
            if($(this).hasClass("picked")){
                clickInterface($PAGE_DATA['baseStaticUrl']+'source/api/course/details.json',id,'取消采集');
                $(this).find('i').text('采集');
                $(this).removeClass('picked');
            }else {
                clickInterface($PAGE_DATA['baseStaticUrl']+'source/api/course/details.json',id,'采集');
                $(this).find('i').text('已采集');
                $(this).addClass('picked');
            }
        }else {
            Login.login(window.location.href);
        }

    });

    //只看我的
    $('.jWrap3').on('click','.bar-right',function(){
        if(Login.isLogin()){
            if($(this).text() === '只看我的'){
                renderList($PAGE_DATA['loadNoteUrl'],{'sourceType':sourceType,"showType":1,"sourceId":sourceId},'jWrap3','jWrap3Box',jPagination);
                $(this).text('取消只看我的');
            }else {
                renderList($PAGE_DATA['loadNoteUrl'],{'sourceType':sourceType,"showType":0,"sourceId":sourceId},'jWrap3','jWrap3Box',jPagination);
                $(this).text('只看我的');
            }
        }else {
            Login.login(window.location.href);
        }
    });

    window.pager = function(){
        pager.pagination.selectPage(pager.pagination.get('currentPage'));
    };
});
