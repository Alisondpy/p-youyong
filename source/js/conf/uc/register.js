define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var io = require('lib/core/1.0.0/io/request');
    var validate = require('lib/plugins/validation/1.15.1/jquery-validate');
    var message = require('lib/plugins/validation/1.15.1/localization/messages_zh');
    $().ready(function(){
        $('#jSignupForm').validate({debug:true})/*{
            rules: {
                name: "required"
               
            },
            messages: {
                name: "Please enter your firstname"
            }
        })*/
    })
});
