(function ($) {

    'use strict';

    //vars

    var responsiveBreakpoint = 767;


    //get real window width for responsive

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

        //menu

        $('.menu > ul > li').on({
            mouseenter: function () {
                if (getWindowWidth() >= responsiveBreakpoint) {
                    $(this).children('ul').stop().show();
                }
            },
            mouseleave: function () {
                if (getWindowWidth() >= responsiveBreakpoint) {
                    $(this).children('ul').stop().hide();
                }
            }
        });

        //classic menu

        $('.menu > ul > li > ul:not(:has(ul))').addClass('is-classic-dropdown');

        //mobile menu

        $('.menu > ul').attr({
            'role': 'menubar',
            'aria-hidden': 'false'
        }).before('<button class="hamburger hamburger--squeeze" type="button" aria-label="Menu" aria-controls="navigation"><span class="hamburger-menu-text">Navigation</span><span class="hamburger-box"><span class="hamburger-inner"></span></span></button>');

        $('.hamburger').on('click', function () {
            $(this).toggleClass('is-active');
            $('.menu > ul').toggleClass('is-shown-on-mobile');
        });

        //mobile menu - dropdown button

        $('.menu li:has(ul)').attr('aria-haspopup', 'true').append('<button class="dropdown-button" type="button"><span class="dropdown-button-text"></span></button>');

        $('.dropdown-button').click(function () {
            if (getWindowWidth() < responsiveBreakpoint) {
                $(this).prev('ul').stop(true, false).toggle();
                $(this).find('.dropdown-button-text').toggleClass('is-active');
            }
        });

        //aria

        $('.menu li').attr('role', 'menuitem');

        $('.menu li > a').attr('tabindex', 0);

        $('.menu > ul > li > ul').attr({
            'role': 'menu',
            'aria-hidden': 'true',
            'aria-label': 'submenu'
        });

    });

    $(window).resize(function () {
        if (getWindowWidth() < responsiveBreakpoint) {
            $('.menu > ul').removeClass('is-shown-on-mobile');
            $('.menu li').children('ul').hide();
            $('.dropdown-button-text').removeClass('is-active');
            $('.hamburger').removeClass('is-active');
        } else {
            $('.menu > ul > li > ul > li').children('ul').show();
        }
    });

}($));