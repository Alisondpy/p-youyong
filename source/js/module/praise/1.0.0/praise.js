define(function(require, exports, module) {
	'use strict';
	var $ = require('jquery');
	var EventEmitter = require('lib/core/1.0.0/event/emitter');
	var Util = require('lib/core/1.0.0/utils/util');

	/* @param selector [dom selector] dom选择器
	 * @param options [mix] 参数详情见defaults
	 */
	function Praise(selector,options){
		var _this = this;
		var defaults = {
			start:{
				color:"#E94F06"
			},
			end:{

			},
			duration:1500
		};
		_this.el = $(selector);
		console.log(_this.el.offset(),_this.el.width(),_this.el.height());
		_this.options = $.extend(true,{},defaults,options);
		_this._init();
	};

	//继承自定义事件
	Util.inherits(Praise, EventEmitter);

	Praise.prototype._init = function(){
		var _this = this;
		_this.x = _this.el.offset().left+(_this.el.width()/2);
		_this.y = _this.el.offset().top;
	};

	Praise.prototype.add = function() {
		var _this = this;
		var $b = $("<b>+1</b>");
		$b.css({
			top: _this.y,
			left: _this.x,
			position: "absolute",
			color: _this.options.start.color
		});
		$("body").append($b);
		$b.animate({
			top: _this.y - _this.el.height(),
			left: _this.x - (_this.el.width()/4),
			opacity: 0,
			"font-size": _this.el.width()/2
		},  _this.options.duration, function() {
			$b.remove();
		});
	};

	Praise.prototype.delete = function(){
		var _this = this;
		var $b = $("<b>-1</b>");
		$b.css({
			top: _this.y,
			left: _this.x,
			position: "absolute",
			color: _this.options.start.color
		});
		$("body").append($b);
		$b.animate({
			top: _this.y - _this.el.height(),
			left: _this.x - (_this.el.width()/4),
			opacity: 0,
			"font-size": _this.el.width()/2
		}, _this.options.duration, function() {
			$b.remove();
		});
	};

	module.exports = Praise;

});