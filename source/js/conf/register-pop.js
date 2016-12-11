define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/crossbox');

    $(".jCloseBtn").click(function () {
        var topBox = box.get(window);
        topBox.hide();
    })
})

