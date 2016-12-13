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
    var box = require('lib/ui/box/1.0.1/crossbox');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var io = require('lib/core/1.0.0/io/request');
    var Tab = require('lib/ui/tab/1.0.0/tab');
    var template = require("template");
    var Question = require('module/monitor/1.0.0/question');
    var Note = require('module/monitor/1.0.0/note');
    var Login = require('module/login-status/1.0.0/login');
    var catlog = $('.jMod-catlog');
    var jTab = $('#jTab');
    require('plugins/layer/layer');
    var tab = new Tab(jTab);
    var lazy, question, note;

    var jQuestionTab1 = $('#jQuestionTab1'); //我的问答容器
    var jQuestionTab2 = $('#jQuestionTab2'); //全部问答容器
    var jNoteTab1 = $('#jNoteTab1'); //我的笔记容器
    var jNoteTab2 = $('#jNoteTab2'); //全部笔记容器

    //====================播放器 start

    //获取参数
    var sourceId = $PAGE_DATA['courseId'];
    var lessonId = $PAGE_DATA['lessonId'];
    var examId = $PAGE_DATA['examId'];

    var Player = require('plugins/ckplayer/6.7.0/player');

    var player = new Player('#jAudio', {
        swfPlayer: $PAGE_DATA['ckplayer'],
        embed: {
            width: '871',
            height: '655'
        },
        flash: {
            i: $PAGE_DATA['lessonImageUrl'], //初始图片地址
            g: $PAGE_DATA['startTime'] || 0,
            f: $PAGE_DATA['m3u8'], //必填 请别跨域 要播放文件的路径
            a: $PAGE_DATA['play'] //必填 请别跨域 如果要调用m3u8格式的文件，必须要用到的播放插件【调用时的参数，只有当s>0的时候有效】
        }
    });

    var isSendPlayTime = true;
    var isLayer = false;
    var isYou = false;
    //监听当前播放器进度
    player.on('time', function(seconds) {
        if (isSendPlayTime && seconds > 0) {
            isSendPlayTime = false;
            var _params = $.extend(true, {}, $PAGE_DATA['setPlayTimeParams'], {
                playTime: seconds,
                duration: player.getTotalTime(),
                courseId: sourceId,
                lessonId: lessonId
            });
            io.get($PAGE_DATA['setPlayTime'], _params, function(data) {
                isSendPlayTime = true;
            }, function(data) {
                isSendPlayTime = true;
            });
        }
        if(player.getTotalTime() && (seconds == player.getTotalTime()) && (player.getTotalTime() != 0) && (examId != '') && (seconds != 0)){
            if(!isLayer){
                box.confirm('是否进入考试页面？',
                    function() {
                        box.loadUrl($PAGE_DATA['examUrl'] + '?examId=' + examId + '?prepare&bizType=0&bizId=' + lessonId + '&courseId=' + sourceId, {
                            title: '考试',
                            className: 'ui-test-box',
                            fixed: true,
                            width: $(window).width(),
                            height: $(window).height()
                        });
                    },
                    function() {}, this);
                isLayer = true;
            }
        }
        if (!isYou) {
            if (seconds > 60) {
                if (!Login.isLogin()) {
                    player.pause();
                    box.confirm('游客只能观看一分钟,是否前往登录？',
                        function() {
                            Login.login(window.location.href);
                        },
                        function() {}, this);
                    isYou = true;
                }
            }
        }
    });
    //====================播放器 end

    //====================字数限制 start
    var publishA = $('.jPublishA'); //发布笔记
    var publishQ = $('.jPublishQ'); //发布问答
    var txtNumA = $('.jTxtNumA'); //笔记字数
    var txtNumQ = $('.jTxtNumQ'); //问答字数
    var txtA = $('.jTxtA'); //笔记输入框
    var txtQ = $('.jTxtQ'); //问答输入框
    function limit(txtLen, num, _this, publish, txtNum) {
        if (txtLen > num) {
            _this.addClass('text-error');
            publish.addClass('publish-error');
            txtNum.css({ 'color': 'red' });
        } else {
            _this.removeClass('text-error');
            publish.removeClass('publish-error');
            txtNum.css({ 'color': '#666' });
        }
        txtNum.children('.num').text(txtLen);
    }
    jTab.on('input propertychange', '.jTxtA', function() {
        var txtLen = $(this).val().length;
        limit(txtLen, 500, $(this), publishA, txtNumA);
    });

    jTab.on('input propertychange', '.jTxtQ', function() {
        var txtLen = $(this).val().length;
        limit(txtLen, 500, $(this), publishQ, txtNumQ);
    });

    //====================字数限制 end
    //====================发布按钮 start
    function pubAjax(content,_this,url,data,txt,txtNum){
        if(content == ''){
            box.error('请输入内容');
        }else {
            if(!_this.hasClass('publish-error')){
                io.get(url,data,function(res){
                    box.ok('发表成功');
                    txt.val('');
                    txtNum.children('.num').text('0');
                },function(res){
                    box.error(res.msg || '网络错误,请重试');
                });
            }
        }
    }
    var answer = $('#jAnswer');
    var publishDataA = {
        sourceType: 2,
        sourceId: lessonId,
        content: "",
        showType: 1
    }
    jTab.on('click', '.jPublishA', function() {
        if (Login.isLogin()) {
            var content = txtA.val();
            publishDataA.content = content;
            if (answer.is(':checked')) {
                publishDataA.showType = 1;
            } else {
                publishDataA.showType = 2;
            }
            pubAjax(content,$(this),$PAGE_DATA['note'].publish,publishDataA,txtA,txtNumA);
            renderTemp($PAGE_DATA['note'].note,reqNoteData,'tAnswer','jNoteTab1');
        }else {
            Login.login(window.location.href);
        }
    });
    var jQuesTitle = $('#jQuesTitle');
    jTab.on('focus', '#jQuesTitle', function() {
        jQuesTitle.removeClass('question-input-error');
    });
    var publishDataQ = {
        sourceType: 2,
        sourceId: lessonId,
        content: "",
    }
    jTab.on('click', '.jPublishQ', function() {
        if (Login.isLogin()) {
            var title = jQuesTitle.val();
            var content = txtQ.val();
            if (title == '') {
                box.error('请输入问题标题');
                jQuesTitle.addClass('question-input-error');
            } else {
                publishDataQ.title = title;
                publishDataQ.content = content;
                pubAjax(content,$(this),$PAGE_DATA['question'].publish,publishDataQ,txtQ,txtNumQ);
                jQuesTitle.val('');
                renderTemp($PAGE_DATA['question'].question,reqQuesData,'tQuestion','jQuestionTab1');
            }
        } else {
            Login.login(window.location.href);
        }
    });
    //====================发布按钮 end

    //评论focus效果
    jTab.on('focus', '.jTxt', function() {
        $(this).addClass('text-focus').attr('placeholder', '');
        $(this).css('color', '#333');
    }).on('blur', '.jTxt', function() {
        if ($(this).val() === '') {
            $(this).removeClass('text-focus').attr('placeholder', '有疑问?快来记录吧~(限500字)!');
            $(this).css('color', '#ccc');
        }
    });

    //点赞和采集的接口处理
    function clickInterface(url, data, msg) {
        io.get(url, data, function(res) {
            box.ok(msg + '成功');
        }, function(res) {
            box.error(res.msg || '网络错误,请重试');
        });
    };

    //笔记点赞
    jTab.on('click','.like',function(){
        if(Login.isLogin()){
            var id = $(this).attr('data-id');

            var data;
            if ($(this).hasClass("activeLike")) {
                data = {
                    "dataType":4,
                    "type":1,
                    "id":id
                }
                clickInterface($PAGE_DATA['note'].like,data,'取消点赞');
                renderTemp($PAGE_DATA['note'].note,reqNoteData,'tAnswer','jNoteTab1');
            }else {
                data = {
                    "dataType":4,
                    "type":2,
                    "id":id
                }
                clickInterface($PAGE_DATA['note'].like,data,'点赞');
                renderTemp($PAGE_DATA['note'].note,reqNoteData,'tAnswer','jNoteTab1');
            }
        } else {
            Login.login(window.location.href);
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
    function renderTemp(url, data, temEl, htmlEl) {
        var loading = box.loading('正在加载...', {
            modal: false
        });
        io.get(url, data, function(res) {
            if (!$.isEmptyObject(res.data) && res.data && res.data.resultList && res.data.resultList.length > 0) {
                var html = template(temEl, res.data);
                document.getElementById(htmlEl).innerHTML = html;
                //图片懒加载
                lazy = new Lazyload($("#" + htmlEl).find('.jImg'), {
                    mouseWheel: true,
                    effect: 'fadeIn',
                    snap: true
                });
            } else {
                var html = template('tEmpty', 1);
                document.getElementById(htmlEl).innerHTML = html;
            }
            loading && loading.hide();
        },function(res){
            var html = template('tEmpty',1);
            document.getElementById(htmlEl).innerHTML = html;
            loading && loading.hide();
        });
    }
    var reqNoteData = {
        id:0,
        pageSize:20,
        sortType:1,
        showType:1,
        sourceType:2,
        sourceId:lessonId
    }
    var reqQuesData = {
        id:0,
        pageSize:20,
        sortType:1,
        showType:1,
        sourceType:2,
        sourceId:lessonId
    }
    function init(type){
        switch (type){
            case '0'://笔记我的
                jNoteTab1.show();
                jNoteTab2.hide();
                jQuestionTab1.hide();
                jQuestionTab2.hide();
                if (question) {
                    question.stop();
                }
                if (note) {
                    note.stop();
                }
                renderTemp($PAGE_DATA['note'].note, reqNoteData, 'tAnswer', 'jNoteTab1');
                break;
            case '1': //笔记全部
                var reqNoteData = {
                    id: 0,
                    pageSize: 20,
                    sortType: 1,
                    showType: 0,
                    sourceType: 2,
                    sourceId: lessonId
                }
                jNoteTab1.hide();
                jNoteTab2.show();
                jQuestionTab1.hide();
                jQuestionTab2.hide();
                if (!note) {
                    note = new Note('#jNoteTab2', {
                        pollingAjax: {
                            url: $PAGE_DATA['note'].note,
                            data: reqNoteData
                        },
                        pagerAjax: {
                            url: $PAGE_DATA['note'].note,
                            data: reqNoteData
                        }
                    });
                }
                if (question) {
                    question.stop();
                }
                note.start();
                break;
            case '2'://问答我的
                jNoteTab1.hide();
                jNoteTab2.hide();
                jQuestionTab1.show();
                jQuestionTab2.hide();
                if (question) {
                    question.stop();
                }
                if (note) {
                    note.stop();
                }
                renderTemp($PAGE_DATA['question'].question,reqQuesData,'tQuestion','jQuestionTab1');
                break;
            case '3': //问答全部
                var reqNoteData = {
                    id: 0,
                    pageSize: 20,
                    sortType: 1,
                    showType: 0,
                    sourceType: 2,
                    sourceId: lessonId
                }
                jNoteTab1.hide();
                jNoteTab2.hide();
                jQuestionTab1.hide();
                jQuestionTab2.show();
                /*问答实时监听*/
                if (!question) {
                    question = new Question('#jQuestionTab2', {
                        pollingAjax: {
                            url: $PAGE_DATA['question'].question,
                            data: reqNoteData
                        },
                        pagerAjax: {
                            url: $PAGE_DATA['question'].question,
                            data: reqNoteData
                        }
                    });
                }
                question.start();
                if (note) {
                    note.stop();
                }
                break;
        }
    };

    jTab.on('click', '.jSubNav', function() {
        $(this).addClass('ui-current').siblings().removeClass('ui-current');
        var type = $(this).attr('data-type');
        init(type);
    });

    var reqDirData = {
        id: lessonId,
        type: 2,
        pageNo: 1,
        pageSize: 20
    };
    renderTemp($PAGE_DATA['dirUrl'], reqDirData, 'tDir', 'jDir');
    tab.on('change', function(el) {
        var type = el.body.find('.ui-current').attr('data-type');
        init(type);
        var target = el.body.attr('data-id');
        if (target == "1") {
            renderTemp($PAGE_DATA['dirUrl'], reqDirData, 'tDir', 'jDir');
        }
        lazy.update();
    });
});
