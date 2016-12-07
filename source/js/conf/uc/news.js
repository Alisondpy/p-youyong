define(function (require, exports, module) {
	'use strict';
	var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    // alert(123)
    $('.jIems').on('click', function (e) {
    	var $this = $(this);
    	var target = $(e.target);
    	if(target.is('.jMore')&&target.text()=='查看全部') {
    		target.text('收起');
    		$this.addClass('mark');
    	} else if(target.text()=='收起') {
    		target.text('查看全部');
    		$this.removeClass('mark');
    	}
    })
})