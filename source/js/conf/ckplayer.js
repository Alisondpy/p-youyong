define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    require('plugins/ckplayer6.7/ckplayer');

    var flashvars={
        //f:'http://demo.zhongzhihui.com/resources/courseware/2014/5/2014-05-19/a3e4d79ea2ea40d3a094b631c175c73e/df08a2068c25463b9e053df286281af7.flv',
        f:$PAGE_DATA['m3u8'],
        a:$PAGE_DATA['play'],//调用时的参数，只有当s>0的时候有效
        s:'4',//调用方式，0=普通方法（f=视频地址），1=网址形式,2=xml形式，3=swf形式(s>0时f=网址，配合a来完成对地址的组装)
        c:'0',//是否读取文本配置,0不是，1是
        x:'',//调用xml风格路径，为空的话将使用ckplayer.js的配置
        i:'',//初始图片地址
        u:'',//暂停时如果是图片的话，加个链接地址
        r:'',//前置广告的链接地址，多个用竖线隔开，没有的留空
        t:'',//视频开始前播放swf/图片时的时间，多个用竖线隔开
        y:'',//这里是使用网址形式调用广告地址时使用，前提是要设置l的值为空
        z:'',//缓冲广告，只能放一个，swf格式
        e:'0',//视频结束后的动作，0是调用js函数，1是循环播放，2是暂停播放并且不调用广告，3是调用视频推荐列表的插件，4是清除视频流并调用js功能和1差不多，5是暂停播放并且调用暂停广告
        v:'100',//默认音量，0-100之间
        p:'0',//视频默认0是暂停，1是播放
        h:'0',//播放http视频流时采用何种拖动方法，=0不使用任意拖动，=1是使用按关键帧，=2是按时间点，=3是自动判断按什么(如果视频格式是.mp4就按关键帧，.flv就按关键时间)，=4也是自动判断(只要包含字符mp4就按mp4来，只要包含字符flv就按flv来)
        q:'',//视频流拖动时参考函数，默认是start
        m:'0',//默认是否采用点击播放按钮后再加载视频，0不是，1是,设置成1时不要有前置广告
        o:'',//当m=1时，可以设置视频的时间，单位，秒
        w:'',//当m=1时，可以设置视频的总字节数
        g:'0',//视频直接g秒开始播放
        j:'',//视频提前j秒结束
        wh:'',//这是6.2新增加的宽高比，可以自己定义视频的宽高或宽高比如：wh:'4:3',或wh:'1080:720'
        ct:'2',//6.2新增加的参数，主要针对有些视频拖动时时间出错的修正参数，默认是2，自动修正，1是强制修正，0是强制不修正
        drift:'',
        loaded:'gLoadedHandler',
        my_url:encodeURIComponent(window.location.href)//本页面地址
    };
    //创建播放器对象

    var params={bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'};
    CKobject.embedSWF($PAGE_DATA['ckplayer'],'video','ckplayer_a1','100%','500',flashvars,params);

    var video;//全局变量video
    //function loadedHandler(){
    //    video = CKobject.getObjectById("ckplayer_a1");
    //    video.addListener('error','errorVideo');
    //    video.addListener('loadComplete','errorVideo');
    //    video.addListener('play','a');
    //    video.addListener('pause','stopHandle');
    //    video.addListener('time','scrollTime');
    //    video.addListener('ended','endVideo');
    //}

    function loadedHandler(){
        //video = new Player();
        video = CKobject.getObjectById("ckplayer_a1")
        console.log(video);
        video.addListener('play','aaa');
        CKobject.getObjectById('ckplayer_a1').addListener('time','timeHandler');
    }

    window.gLoadedHandler = loadedHandler();
    window.aaa = aaa();

    function timeHandler(t){
        console.log(1);
    }

    //
    function aaa(){
        console.log(1);
    }

    //实时输出方法
    function scrollTime(){
        console.log(1);
        //实时输出时间
        console.log(video.getStatus().time);
    }


        //实时监测
    $(".start").on("click",function(){
        video.play();
    });
    $(".pause").on("click",function(){
        video.pause();
    });
    $(".next").on("click",function(){
        video.goVideoUrl($PAGE_DATA['m3u8']);
    });
    $(".time").on("click",function(){
        var time = video.time();//当前时间
        console.log(time);
    });

    $(".resize").on("click",function(){
        video.resize(160,90);
    })

    $(".continue").on("click",function(){
        video.continue();
    })

    function getstart(){
        var a = CKobject.getObjectById('ckplayer_a1').getStatus();
        var ss='';
        var time='';
        var totaltime='';
        for (var k in a){
            if("time" == k){
                time = a[k];
            }
            if("totalTime"== k){
                totaltime = a[k];
            }
        }
    }
    function Player(el, options) {
            var video = CKobject.getObjectById(el);
            //this.video = CKobject.getObjectById(el);;
            this.addListene = function(name,fn){
                video.addListene(name,fn)
            }
            //播放
            this.play = function (fn) {
                video.videoPlay();
            };
            //暂停
            this.pause = function () {
                video.videoPause()
            };
            //调整视频宽高
            this.resize = function(width,height){
                //获得默认宽高计算比例
                var normalWidth = $("#"+el).width();
                $("#"+el).find("embed").width((width/100) * normalWidth).height((height/100) * normalWidth);
            };
            this.continue = function(){
                video.addListener('time','scrollTime');
            };
            //跳转到指定秒数
            this.goSecond = function (time) {
                var _this = this;
                setTimeout(function () {
                    //获取最大时长
                    var maxTime = video.getStatus().totaltime;
                    //如果小于0,回到开始,如果大于时长,回到底
                    if (time < 0) {
                        video.fastNext(0)
                    } else if (time > 100) {
                        video.fastNext(time);
                    }
                    video.fastNext(time);
                    _this.play();
                }, 300);
            };
            //跳到新地址
            this.goVideoUrl = function (url) {
                //参数形式
                flashvars["f"] = url;
                video.newAddress(flashvars);
            };
            this.time = function (fn) {
                return video.getStatus().time;
            };
        }
});