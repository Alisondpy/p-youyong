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
		_this.el = $(selector);
		var defaults = {
			duration:1000,
			add:{
				offsetTop:_this.el.height()+20,
				initCss:{
					zIndex:1,
					color:"#ea3e48"
				},
				fontSize: _this.el.height()/2
			},
			delete:{
				offsetTop:_this.el.height()+20,
				initCss:{
					zIndex:1,
					color:"#666"
				},
				fontSize: _this.el.height()/2
			}
		};
		_this.options = $.extend(true,{},defaults,options)
		_this._init();
	};

	//继承自定义事件
	Util.inherits(Praise, EventEmitter);

	Praise.prototype._init = function(){
		var _this = this;
		_this.x = _this.el.offset().left+(_this.el.width()/2);
		_this.y = _this.el.offset().top;
		_this.b = $("<div></div>");
		_this.b.css({
			position: "absolute",
			top: _this.y,
			left: _this.x-(_this.el.width()/2),
			width:_this.el.width(),
			"text-align":'center'
		});
	};

	Praise.prototype.add = function() {
		var _this = this;
		_this.b.text('+1');
		_this.b.css(_this.options.add.initCss);
		$("body").append(_this.b);
		_this.b.animate({
			"font-size": _this.options.add.fontSize,
			top: _this.y - _this.options.add.offsetTop,
			left: _this.x - (_this.b.width()/2),
			opacity: 0
		},  _this.options.duration, function() {
			_this.destroy();
		});
	};

	Praise.prototype.delete = function(){
		var _this = this;
		_this.b.text('-1');
		_this.b.css(_this.options.delete.initCss);
		$("body").append(_this.b);
		_this.b.animate({
			"font-size": _this.options.delete.fontSize,
			top: _this.y - _this.options.delete.offsetTop,
			left: _this.x - (_this.b.width()/2),
			opacity: 0
		}, _this.options.duration, function() {
			_this.destroy();
		});
	};

	Praise.prototype.destroy = function(){
		var _this = this;
		_this.b.remove();
	}

	module.exports = Praise;

});