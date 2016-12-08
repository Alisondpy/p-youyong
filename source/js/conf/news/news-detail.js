define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var lazy;
    var jHotTrain = $("#jHotTrain");
    //图片懒加载
    lazy = new Lazyload(jHotTrain.find('.jImg'), {
        mouseWheel: true,
        effect: 'fadeIn',
        snap: true
    });

});

