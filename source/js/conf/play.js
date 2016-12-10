define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var io = require('lib/core/1.0.0/io/request');
    var Tab = require('lib/ui/tab/1.0.0/tab');
    var template=require("template");
    var catlog = $('.jMod-catlog');
    var note = $('.jMod-note');
    var question = $('.jMod-question');
    var jTab = $('#jTab');
    var tab = new Tab(jTab);
    var lazy;
    //图片懒加载
    lazy = new Lazyload($('.jImg'), {
        mouseWheel: true,
        effect: 'fadeIn',
        snap: true
    });

    /*交互*/
    //字数限制
    var publishA = $('.jPublishA');
    var publishQ = $('.jPublishQ');
    var txtNumA = $('.jTxtNumA');
    var txtNumQ = $('.jTxtNumQ');
    var txtA = $('.jTxtA');
    var txtQ = $('.jTxtQ');
    function limit(txtLen,num,_this,publish,txtNum){
        if(txtLen > num){
            _this.addClass('text-error');
            publish.addClass('publish-error');
            txtNum.css({'color':'red'});
        }else {
            _this.removeClass('text-error');
            publish.removeClass('publish-error');
            txtNum.css({'color':'#666'});
        }
        txtNum.children('.num').text(txtLen);
    }
    jTab.on('keyup','.jTxtA',function(){
        var txtLen = $(this).val().length;
        limit(txtLen,500,$(this),publishA,txtNumA);
    });

    jTab.on('keyup','.jTxtQ',function(){
        var txtLen = $(this).val().length;
        limit(txtLen,500,$(this),publishQ,txtNumQ);
    });

    //发表
    function pubAjax(content,_this,url,data,txt){
        if(content == ''){
            box.error('请输入发表内容');
        }else {
            if(!_this.hasClass('publish-error')){
                io.get(url,data,function(res){
                    if(res){
                        if(res.code == 0){
                            box.ok('发表成功');
                            txt.val('');
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
    }
    var answer = $('#jAnswer');
    var ques = $('#jQues');
    var showType;
    jTab.on('click','.jPublishA',function(){
        var content = txtA.val();
        if(answer.is(':checked')){
            showType = 1;
        }else {
            showType = 2;
        }
        pubAjax(content,$(this),$PAGE_DATA['commentPostUrl'],{"content":content,"showType":showType},txtA);
    });
    jTab.on('click','.jPublishQ',function(){
        var content = txtQ.val();
        if(ques.is(':checked')){
            showType = 1;
        }else {
            showType = 2;
        }
        pubAjax(content,$(this),$PAGE_DATA['commentPostUrl'],{"content":content,"showType":showType},txtQ);
    });

    //评论focus效果
    jTab.on('focus','.jTxt',function(){
        $(this).addClass('text-focus').attr('placeholder','');
        $(this).css('color','#333');
    }).on('blur','.jTxt',function(){
        if($(this).val() === ''){
            $(this).removeClass('text-focus').attr('placeholder','有疑问?快来记录吧~(限500字)!');
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
    jTab.on('click','.like',function(){
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
            $(this).removeClass('activeLike');
        }else {
            data = {
                "dataType":dataType,
                "type":type,
                "id":id
            }
            clickInterface($PAGE_DATA['commentClickUrl'],data,'点赞');
            $(this).addClass('activeLike');
        }
    });

    //采集
    jTab.on('click','.pick',function(){
        var id = $(this).attr('data-id');
        if($(this).hasClass("picked")){
            clickInterface($PAGE_DATA['baseStaticUrl']+'source/api/course/details.json',id,'取消采集');
            $(this).find('em').text('采集');
            $(this).removeClass('picked');
        }else {
            clickInterface($PAGE_DATA['baseStaticUrl']+'source/api/course/details.json',id,'采集');
            $(this).find('em').text('已采集');
            $(this).addClass('picked');
        }
    });

    /*模板渲染*/
    function renderTemp(url,data,temEl,htmlEl){
        var loading = box.loading('正在加载...', {
            modal: false
        });
        io.get(url,data,function(res){
            if(!$.isEmptyObject(res.data) && res.data && res.data.resultList && res.data.resultList.length > 0){
                var html = template(temEl,res.data);
                document.getElementById(htmlEl).innerHTML = html;
                //图片懒加载
                lazy = new Lazyload($("#"+htmlEl).find('.jImg'), {
                    mouseWheel: true,
                    effect: 'fadeIn',
                    snap: true
                });
            }else {
                var html = template('tEmpty',1);
                document.getElementById(htmlEl).innerHTML = html;
            }
            loading && loading.hide();
        },function(res){
            document.getElementById(htmlEl).innerHTML = "<div style='color: #000;'>请求超时请重试！<a href=''>刷新</a></div>";
            loading && loading.hide();
        });
    }

    function init(type){
        switch (type){
            case '0':
                renderTemp($PAGE_DATA['baseStaticUrl']+'source/api/course/details.json',type,'tAnswer','jAnswerTab');
                break;
            case '1':
                renderTemp($PAGE_DATA['baseStaticUrl']+'source/api/course/details.json',type,'tAnswer','jAnswerTab');
                break;
            case '2':
                renderTemp($PAGE_DATA['baseStaticUrl']+'source/api/course/details.json',type,'tQuestion','jQuestionTab');
                break;
            case '3':
                renderTemp($PAGE_DATA['baseStaticUrl']+'source/api/course/details.json',type,'tQuestion','jQuestionTab');
                break;
        }
    };
    jTab.on('click','.jSubNav',function(){
        $(this).addClass('ui-current').siblings().removeClass('ui-current');
        var type = $(this).attr('data-type');
        init(type);
    });

    tab.on('change', function(el) {
        var type = el.body.find('.ui-current').attr('data-type');
        init(type);
    });
});
