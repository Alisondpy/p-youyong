define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
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
    var box = require('lib/ui/box/1.0.1/box');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var io = require('lib/core/1.0.0/io/request');
    var Tab = require('lib/ui/tab/1.0.0/tab');
    var template=require("template");
    var Question = require('module/monitor/1.0.0/question');
    var Note = require('module/monitor/1.0.0/note');
    var catlog = $('.jMod-catlog');
    var jTab = $('#jTab');
    var tab = new Tab(jTab);
    var lazy,question,note;

    var jQuestionTab1 = $('#jQuestionTab1');//我的问答容器
    var jQuestionTab2 = $('#jQuestionTab2');//全部问答容器
    var jNoteTab1 = $('#jNoteTab1');//我的笔记容器
    var jNoteTab2 = $('#jNoteTab2');//全部笔记容器

    //====================播放器 start

    //获取参数
    var sourceId = $PAGE_DATA['courseId'];

    var Player = require('plugins/ckplayer/6.7.0/player');

    var player = new Player('#jAudio', {
        swfPlayer: $PAGE_DATA['ckplayer'],
        embed: {
            width: '871',
            height: '655'
        },
        flash: {
            g:$PAGE_DATA['startTime'] || 0,
            f: $PAGE_DATA['m3u8'], //必填 请别跨域 要播放文件的路径
            a: $PAGE_DATA['play'] //必填 请别跨域 如果要调用m3u8格式的文件，必须要用到的播放插件【调用时的参数，只有当s>0的时候有效】
        }
    });
    var isSendPlayTime = true;
    //监听当前播放器进度
    player.on('time', function(seconds) {
        if(isSendPlayTime && seconds >0){
            isSendPlayTime = false;
            var _params = $.extend(true,{},$PAGE_DATA['setPlayTimeParams'], {
                playTime: seconds,
                duration: player.getTotalTime()
            });
            io.get($PAGE_DATA['setPlayTime'],_params,function(data){
                isSendPlayTime = true;
            },function(data){
                isSendPlayTime = true;
            });
        }
    });
    //====================播放器 end


    //====================字数限制 start
    var publishA = $('.jPublishA');//发布笔记
    var publishQ = $('.jPublishQ');//发布问答
    var txtNumA = $('.jTxtNumA');//笔记字数
    var txtNumQ = $('.jTxtNumQ');//问答字数
    var txtA = $('.jTxtA');//笔记输入框
    var txtQ = $('.jTxtQ');//问答输入框
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
    //====================字数限制 end
    //====================发布按钮 start
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
    var publishData = {
        sourceType:200,
        sourceId:10,
        content:"",
        showType:1
    }
    jTab.on('click','.jPublishA',function(){
        var content = txtA.val();
        publishData.content = content;
        if(answer.is(':checked')){
            publishData.showType = 1;
        }else {
            publishData.showType = 2;
        }
        pubAjax(content,$(this),$PAGE_DATA['note'].publish,publishData,txtA);
    });
    jTab.on('click','.jPublishQ',function(){
        var content = txtQ.val();
        publishData.content = content;
        if(ques.is(':checked')){
            publishData.showType = 1;
        }else {
            publishData.showType = 2;
        }
        pubAjax(content,$(this),$PAGE_DATA['question'].publish,publishData,txtQ);
    });
    //====================发布按钮 end

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
            clickInterface($PAGE_DATA['note'].like,data,'取消点赞');
            $(this).removeClass('activeLike');
        }else {
            data = {
                "dataType":dataType,
                "type":type,
                "id":id
            }
            clickInterface($PAGE_DATA['question'].like,data,'点赞');
            $(this).addClass('activeLike');
        }
    });

    ////采集
    //jTab.on('click','.pick',function(){
    //    var id = $(this).attr('data-id');
    //    if($(this).hasClass("picked")){
    //        clickInterface($PAGE_DATA['note'].picked,id,'取消采集');
    //        $(this).find('em').text('采集');
    //        $(this).removeClass('picked');
    //    }else {
    //        clickInterface($PAGE_DATA['note'].picked,id,'采集');
    //        $(this).find('em').text('已采集');
    //        $(this).addClass('picked');
    //    }
    //});

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
            case '0'://笔记我的
                var reqNoteData = {
                    id:0,
                    pageSize:20,
                    sortType:1,
                    showType:1,
                    sourceType:2,
                    sourceId:sourceId
                }
                jNoteTab1.show();
                jNoteTab2.hide();
                jQuestionTab1.hide();
                jQuestionTab2.hide();
                if(question){
                    question.stop();
                }
                if(note){
                    note.stop();
                }
                renderTemp($PAGE_DATA['note'].note,reqNoteData,'tAnswer','jNoteTab1');
                break;
            case '1'://笔记全部
                var reqNoteData = {
                    id:0,
                    pageSize:20,
                    sortType:1,
                    showType:1,
                    sourceType:2,
                    sourceId:sourceId
                }
                jNoteTab1.hide();
                jNoteTab2.show();
                jQuestionTab1.hide();
                jQuestionTab2.hide();
                note = new Note('#jNoteTab2', {
                    pollingAjax: {
                        url: $PAGE_DATA['note'].note,
                        data:reqNoteData
                    },
                    pagerAjax: {
                        url: $PAGE_DATA['note'].note,
                        data:reqNoteData
                    }
                });
                if(question){
                    question.stop();
                }
                note.start();
                break;
            case '2'://问答我的
                var reqNoteData = {
                    id:0,
                    pageSize:20,
                    sortType:1,
                    showType:1,
                    sourceType:2,
                    sourceId:sourceId
                }
                jNoteTab1.hide();
                jNoteTab2.hide();
                jQuestionTab1.show();
                jQuestionTab2.hide();
                if(question){
                    question.stop();
                }
                if(note){
                    note.stop();
                }
                renderTemp($PAGE_DATA['question'].question,reqNoteData,'tQuestion','jQuestionTab1');
                break;
            case '3'://问答全部
                var reqNoteData = {
                    id:0,
                    pageSize:20,
                    sortType:1,
                    showType:1,
                    sourceType:2,
                    sourceId:sourceId
                }
                jNoteTab1.hide();
                jNoteTab2.hide();
                jQuestionTab1.hide();
                jQuestionTab2.show();
                /*问答实时监听*/
                question = new Question('#jQuestionTab2', {
                    pollingAjax: {
                        url: $PAGE_DATA['question'].question,
                        data:reqNoteData
                    },
                    pagerAjax: {
                        url: $PAGE_DATA['question'].question,
                        data:reqNoteData
                    }
                });
                question.start();
                if(note){
                    note.stop();
                }
                break;
        }
    };

    jTab.on('click','.jSubNav',function(){
        $(this).addClass('ui-current').siblings().removeClass('ui-current');
        var type = $(this).attr('data-type');
        init(type);
    });

    var reqDirData = {
        id:sourceId,
        sourceType:2
    };
    renderTemp($PAGE_DATA['dirUrl'],reqDirData,'tDir','jDir');
    tab.on('change', function(el) {
        var type = el.body.find('.ui-current').attr('data-type');
        init(type);
        var target = el.body.attr('data-id');
        if(target == "1"){
            renderTemp($PAGE_DATA['dirUrl'],reqDirData,'tDir','jDir');
        }
        lazy.update();
    });
});
