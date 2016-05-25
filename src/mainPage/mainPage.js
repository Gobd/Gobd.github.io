var scrollGlobe = function(id, bool) {
    var scrollLoc;
    if (!bool) {
        scrollLoc = id.slice(3, id.length).toLowerCase();
    } else {
        scrollLoc = id;
    }
    root.animate({
        scrollTop: $('#' + scrollLoc).offset().top - 65
    }, 200);
    return false;
};

var root = $('html, body');

function mainPage() {

    var tagText = 'Full Stack Web Developer | UI/UX | JavaScript',
        devInfo = $('#devInfo');

    function printer(text) {
        var count = 1;
        var print = function() {
            devInfo.text(text.slice(0, count));
            count++;
            if (count === tagText.length + 1) {
                clearInterval(int);
            }
        };
        var delayRand = function() {
            return Math.random() * (100 - 70) + 70;
        };
        var int = window.setInterval(print, delayRand());
    }

    printer(tagText);

    var svgList = document.getElementsByTagName('svg');

    function isScrolledIntoView(el) {
        var elemTop = el.getBoundingClientRect().top,
            elemBottom = el.getBoundingClientRect().bottom,
            isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
        return isVisible;
    }

    var winTop = $(window).scrollTop() + 70,
        winWidth = $(window).width(),
        innerNav = $('#innerNav'),
        navigation = $('#navigation'),
        navA = navigation.find('a'),
        navToggle = $('#navToggle');

    $(document).on('click', '#navToggle', function() {
        navToggle.toggleClass("active");
        innerNav.css('max-height') === '65px' ? innerNav.css('max-height', '500px') : innerNav.css('max-height', '65px');
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
        stateObj.scrollData = winTop;
        navBarColor();

        [].forEach.call(svgList, function(e) {
            if (isScrolledIntoView(e)) {
                $(e).addClass('svgGrow');
            } else {
                $(e).removeClass('svgGrow');
            }
        });

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

    $(document).on('click', '.navLink', function(e) {
        e.preventDefault();
        scrollGlobe(e.target.id);
        if (navToggle.hasClass('active')) {
            navToggle.removeClass('active')
        };
        innerNav.css('max-height', '65px');
    });

};