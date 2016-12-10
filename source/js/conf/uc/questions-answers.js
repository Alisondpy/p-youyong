/**
 * Created by temulun on 2016/12/04 14:18.
 */
define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var Pager = require('plugins/pager/1.0.0/pager');
    var io = require('lib/core/1.0.0/io/request');
    var template = require("template");
    var lazy;
    var jIfmTab = $('#jMain');
    var isEdit = false;
    var pager;

    lazy = new Lazyload($('.jImg'), {
        mouseWheel: true,
        effect: 'fadeIn',
        snap: true
    });
    call();
    function call(data) { 
        var jContainer = $('#jContainer');
        var jPagination = $('#jPagination');
        if(typeof pager != 'undefined'){
            pager.destroy();
        }
        pager = new Pager(jPagination, {
            url: $PAGE_DATA['getPager'],
            data: data,
        });

        var loading = null;
        pager.on('ajaxStart', function() {
            loading = box.loading('正在加载...', {
                modal: false
            });
        });
        
        pager.on('ajaxSuccess', function(data, callback) {
            if (!$.isEmptyObject(data) ) {
                jContainer.html(template('jPage', data.data));
            } else if (res.error < 0) {
                box.warn('有问题');
            } else {
                document.getElementById(htmEl).innerHTML = '<div class="ui-empty-list"><div class="isema isema-box"></div><div class="txt">暂时没有相关内容</div></div>';
            }
            //发表评论
            $('#jPublish').on('click', function(e) {
                var jTxt = $(this).find('.jTxt');
                var $target = $(e.target);
                var txtcontent = jTxt.val();
                if($target.is('.jBtn')&&jTxt.val()!='') {
                    call({
                        'txt':txtcontent
                    });
                    box.ok('评论成功');
                } else if($target.is('.jBtn')&&jTxt.val()==='') {
                     box.warn('请填写内容');
                }
            });
            //赞和回复
            $('.jClkRefavour').on('click', function(e) {
                if ($(e.target).is('.jClkFavour')) {
                    call({
                        'favour':1
                    });
                    $(e.target).addClass('favour');
                } 
            })
            
            lazy = new Lazyload($('.jImg'), {
                mouseWheel: true,
                effect: 'fadeIn',
                snap: true
            });
            callback && callback(data.data.records);
            loading && loading.hide();
        });
        pager.on('ajaxError', function(data) {
            jContainer.html('网络错误，请重试！');
            loading && loading.hide();
        });

        pager.on('change', function(pageNum, e) {
            $('#jCurrentPage').html(pageNum)
        });
    }

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
});
