angular.module('app').controller('mainCtrl', function($scope, $interval) {

    $scope.scrollTo = function(id) {
        $('html, body').animate({
            scrollTop: $('#' + id).offset().top - 65
        }, 200);
    };

    $scope.tagLine = '';
    var tagText = 'Full Stack Web Developer | UI/UX | JavaScript';

    function printer(text) {
        var count = 1;
        var print = function() {
            $scope.tagLine = text.slice(0, count);
            count++;
        };
        var delayRand = function() {
            return Math.random() * (120 - 70) + 70;
        };
        $interval(print, delayRand(), text.length);
    }

    printer(tagText);

    $(document).ready(function() {

        var winTop = $(window).scrollTop() + 70;
        var winWidth = $(window).width();
        var innerNav = $('#innerNav'),
            navigation = $('#navigation'),
            navA = navigation.find('a'),
            navToggle = $('#navToggle');

        $(document).on('click', '#navToggle', function() {
            navToggle.toggleClass("active");
            innerNav.css('max-height') === '65px' ? innerNav.css('max-height', '500px') : innerNav.css('max-height', '65px');
        });

        $(document).on('click', '.navLink', function() {
            if (navToggle.hasClass('active')) navToggle.removeClass('active');
            innerNav.css('max-height', '65px');
        });

        $(window).resize(function() {
            winWidth = $(window).width();
            navBarColor();
        });

        function navBarColor() {
            if (winWidth < 768) {
                navigation.css('background-color', 'white');
                navA.css('color', 'black');
            } else if (winTop < 75) {
                navigation.css('background-color', 'transparent');
                navA.css('color', '#ebeaea');
            } else {
                navigation.css('background-color', 'white');
                navA.css('color', 'black');
            }
        }

        navBarColor();

        var navSkills = $('#navSkills'),
            navPortfolio = $('#navPortfolio'),
            navContact = $('#navContact'),
            top = $('#top'),
            portfolio = $('#portfolio'),
            skills = $('#skills'),
            about = $('#about'),
            navAbout = $('#navAbout');


        $(window).scroll(function() {
            winTop = $(window).scrollTop() + 70;
            navBarColor();
            if (winTop < top.offset().top + top.height()) {
                navAbout.css('text-decoration', 'none');
                navSkills.css('text-decoration', 'none');
                navPortfolio.css('text-decoration', 'none');
                navContact.css('text-decoration', 'none');
            }
            if (winTop > portfolio.offset().top && winTop < portfolio.offset().top + portfolio.height()) {
                navAbout.css('text-decoration', 'none');
                navSkills.css('text-decoration', 'none');
                navPortfolio.css('text-decoration', 'underline');
                navContact.css('text-decoration', 'none');
            }
            if (winTop > skills.offset().top && winTop < skills.offset().top + skills.height()) {
                navAbout.css('text-decoration', 'none');
                navSkills.css('text-decoration', 'underline');
                navPortfolio.css('text-decoration', 'none');
                navContact.css('text-decoration', 'none');
            }
            if (winTop > about.offset().top && winTop < about.offset().top + about.height()) {
                navAbout.css('text-decoration', 'underline');
                navSkills.css('text-decoration', 'none');
                navPortfolio.css('text-decoration', 'none');
                navContact.css('text-decoration', 'none');
            }
            if ($(window).scrollTop() + $(window).height() > $(document).height() - 25 || winTop > $('#contact').offset().top) {
                navAbout.css('text-decoration', 'none');
                navSkills.css('text-decoration', 'none');
                navPortfolio.css('text-decoration', 'none');
                navContact.css('text-decoration', 'underline');
            }
        });

    });
});