define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var io = require('lib/core/1.0.0/io/request');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var validate = require('plugins/validator/1.0.0/validator');

    $().ready(function(){

        $('#jSignupForm').validate({
            debug:true,
            rules: {
            	
            }
        })
    
    })


});