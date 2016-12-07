define(function(require, exports, module) {
	'use strict';
	var $ = require('jquery');
	var EventEmitter = require('lib/core/1.0.0/event/emitter');
	var Util = require('lib/core/1.0.0/utils/util');

	/* @param selector [dom selector] dom选择器
	 * @param options [mix] 参数详情见defaults
	 */
	function NavigationBar(selector,options){
		var _this = this;
		var defaults = {
			currentClass:'',//当前样式
			navSelector:[]//导航栏dom选择器
		};

		_this.el = $(selector);
		_this.options = $.extend(true,{},defaults,options);

		_this._initEvent();
	};

	//继承自定义事件
	Util.inherits(NavigationBar, EventEmitter);
	NavigationBar.prototype._initEvent = function() {
		var _this = this;
		_this.el.on('click','li',function() {
			var $li = $(this);
			if (!$li.hasClass(_this.options.currentClass)) {
				$li.addClass(_this.options.currentClass).siblings().removeClass(_this.options.currentClass);
			}
			_this._get();
		});
	}

	NavigationBar.prototype._get = function(){
		var _this = this;
		var typeData = {};
		$.each(_this.options.navSelector,function(i,n){
			if(!$(n).is(':hidden')){
				var name = $(n).attr('name');
				var val = $(n).find('.'+_this.options.currentClass).attr('data-value');
				typeData[name] = val;
			}
		});
		_this.emit('change',typeData);
	};
	module.exports = NavigationBar;

});