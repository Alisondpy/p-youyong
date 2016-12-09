/**
 * Created by admin on 2016/12/9 0009.
 */

define(function(require, exports, module) {
	'use strict';
	var $ = require('jquery');
	var form = require('lib/core/1.0.0/utils/form');
	var template=require("template");
	var io = require('lib/core/1.0.0/io/request');
	var Hot=require('module/hot-activity/1.0.0/hot-activity');
	new Hot('jHotActive',{
		url:"/p-youyong/source/api/sub/hot-activity.json",
		temId:'hot',
		formatNum:true
	});
});
