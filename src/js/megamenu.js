/*
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
        console.log(windowWidth);
        return windowWidth;
    }

    $(document).ready(function () {

        var responsiveBreakpoint = 767;

        $('.menu > ul > li').on({
            mouseenter: function () {
                if (getWindowWidth() >= responsiveBreakpoint) {
                    $(this).children('ul').stop(true, false).show();
                }
            },
            mouseleave: function () {
                if (getWindowWidth() >= responsiveBreakpoint) {
                    $(this).children('ul').stop(true, false).hide();
                }
            },
            click: function () {
                if (getWindowWidth() < responsiveBreakpoint) {
                    $(this).children('ul').stop(true, false).toggle();
                }
            }
        });
    });

}($));*/
