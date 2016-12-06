/**
 * Created by temulun on 2016/12/06 12:05.
 */
define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    $(function() {
		var Accordion = function(el, multiple) {
			this.el = el || {};
			this.multiple = multiple || false;
			// Variables privadas
			var links = this.el.find('.link');
			// Evento
			links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown);

		}
		Accordion.prototype.dropdown = function(e) {
			var $el = e.data.el,
				$this = $(this),
				$next = $this.next();
			$next.slideToggle();
			if($this.parent().children().length>1) {
				$this.parent().toggleClass('spread').siblings().removeClass('open');
			} else {
				$this.parent().toggleClass('open').siblings().removeClass('open');
			}
			if($this.parent().siblings('spread')){
				if (!e.data.multiple) {
					$el.find('.submenu').not($next).slideUp().parent().removeClass('spread');
				} else if($this.parent().children().length>1) {
					$this.parent().siblings().removeClass('open');
				}
			}
		}
		var accordion = new Accordion($('#accordion'), false);
		$('#accordion .sublist').on('click', function () {
			$(this).addClass('stamp').siblings().removeClass('stamp');
		});

	});


})