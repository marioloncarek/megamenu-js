(function ($) {

    'use strict';

    function getWindowWidth() {
        var windowWidth = 0;
        if (typeof(window.innerWidth) === 'number') {
            windowWidth = window.innerWidth;
        } else {
            if (document.documentElement && document.documentElement.clientWidth) {
                windowWidth = document.documentElement.clientWidth;
            } else {
                if (document.body && document.body.clientWidth) {
                    windowWidth = document.body.clientWidth;
                }
            }
        }
        return windowWidth;
    }

    $(document).ready(function () {

        var responsiveBreakpoint = 767;

        $('.menu > ul').before('<button class="hamburger hamburger--squeeze" type="button"><span class="hamburger-menu-text">Navigation</span><span class="hamburger-box"><span class="hamburger-inner"></span></span></button>');

        $('.hamburger').on('click', function () {
            $(this).toggleClass('is-active');
            $('.menu > ul').toggleClass('is-shown-on-mobile');
        });

        $('.menu > ul > li > ul:not(:has(ul))').addClass('is-classic-dropdown');

        $('.menu > ul > li').on({
            mouseenter: function () {
                if (getWindowWidth() >= responsiveBreakpoint) {
                    $(this).children('ul').css('display', 'block').removeClass('fadeOutUp').addClass('fadeInDown');
                }
            },
            mouseleave: function () {
                if (getWindowWidth() >= responsiveBreakpoint) {
                    $(this).children('ul').removeClass('fadeInDown').addClass('fadeOutUp').delay(200).queue(function (next) {
                        $(this).css('display', 'none');
                        next();
                    });
                }
            },
            click: function () {
                if (getWindowWidth() < responsiveBreakpoint) {
                    $(this).children('ul').stop(true, false).toggle();
                }
            }
        });
    });

    /*$(window).resize(function () {
     $(".menu > ul > li").children("ul").hide();
     $(".menu > ul").removeClass('show-on-mobile');
     });*/

}($));
