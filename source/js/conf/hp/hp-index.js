define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var Io = require('lib/core/1.0.0/io/request');
    $(".help-nav").on("click","li",function(){
        $(this).addClass("current").siblings("li").removeClass("current");
        Io.get('',function(res){
            $("#jContent").html();
        },
        function(){

        }
        )
    })


});