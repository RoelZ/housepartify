//scrollIndicator module
//dependencies: jquery
define(['jQuery'], function ($) {
    var init = function (element, options) {

        options = options || {}; //defaults

        var scrollIndicator = {};
        var _self = element;
        c = options;
        c.scrollHeight = 0;

        var bindEvents = function () {
            $(window).on('resize', function () {
                findScrollHeight();
            });

            $(window).on('scroll', function () {
                if (($(document).height() - $(window).height()) <= $(window).scrollTop() + 150) {
                    //Rotate icon
                    $(_self).addClass('rotate');
                } else {
                    $(_self).removeClass('rotate');
                }
            });

            $(_self).on('click', function () {
                //Check position of scrollbar
                if (($(document).height() - $(window).height()) <= $(window).scrollTop() + 150) {
                    //if bottom, scroll back to top
                    $("html, body").animate({ scrollTop: 0 });
                } else {
                    //if not, scroll down by 80% of the screen height
                    $("html, body").animate({ scrollTop: $(window).scrollTop() + findScrollHeight() });
                }
            });
        };

        var findScrollHeight = function () {
            c.scrollHeight = $(window).height() * 0.8; // max scroll multiplier
            return c.scrollHeight;
        };

        findScrollHeight();
        bindEvents();

        return scrollIndicator;
    };

    return init;
});