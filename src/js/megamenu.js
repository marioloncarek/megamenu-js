(function ($) {

    'use strict';

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

        //vars

        var responsiveBreakpoint = 767;

        //menu

        $('.menu > ul > li').on({
            mouseenter: function () {
                if (getWindowWidth() >= responsiveBreakpoint) {
                    $(this).children('ul').stop().css('z-index', 999).css('display', 'block').removeClass('animation-out').addClass('animation-in');
                }
            },
            mouseleave: function () {
                if (getWindowWidth() >= responsiveBreakpoint) {
                    $(this).children('ul').stop().css('z-index', -10).removeClass('animation-in').addClass('animation-out').delay(200).queue(function (next) {
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

        //classic menu

        $('.menu > ul > li > ul:not(:has(ul))').addClass('is-classic-dropdown');

        //dropdown indicator

        $('.menu > ul > li:has(ul)').attr('aria-haspopup', 'true').append('<button class="dropdown-indicator" type="button">+</button>');

        //mobile menu

        $('.menu > ul').attr({
            'role': 'menubar',
            'aria-hidden': 'false'
        }).before('<button class="hamburger hamburger--squeeze" type="button" aria-label="Menu" aria-controls="navigation"><span class="hamburger-menu-text">Navigation</span><span class="hamburger-box"><span class="hamburger-inner"></span></span></button>');

        $('.hamburger').on('click', function () {
            $(this).toggleClass('is-active');
            $('.menu > ul').toggleClass('is-shown-on-mobile');
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

    /*$(window).resize(function () {
     $(".menu > ul > li").children("ul").hide();
     $(".menu > ul").removeClass('show-on-mobile');
     });*/

}($));