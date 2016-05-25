// things outside of the mainPage function are global
// changes are they are being used directly in the html
var scrollGlobe = function(id, bool) {
    var scrollLoc = id;
    root.animate({
        scrollTop: $('#' + scrollLoc).offset().top - 65
    }, 200);
    return false;
};

var root = $('html, body');

function mainPage() {

    //this does the printing word effect on pageload
    var devInfo = $('#devInfo'),
        devText = 'Full Stack Web Developer | UI/UX | JavaScript';

    function printer(text) {
        var count = 1;
        var print = function() {
            devInfo.text(text.slice(0, count));
            count++;
            if (count === text.length + 1) {
                clearInterval(int);
                stateObj.printed = true;
            }
        };
        var delayRand = function() {
            return Math.random() * (100 - 70) + 70;
        };
        var int = window.setInterval(print, delayRand());
    }
    // sets property on state so it doesn't get re-printed every time used goes back and forth on one visit
    // only prints on first pagelaod
    if (!stateObj.printed) {
        printer(devText);
    } else {
        devInfo.text(devText);
    }

    // list of svg skills to animate when they come into view
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

    // bind to window resize so we can update width and call navBarColor to ensure navBar changes from transparent to white
    // this ensures if someone simply resizes their window the color effect still happens
    // this also closes and resets the navBar if someone widens their window with the navBar expanded
    $(window).resize(function() {
        winWidth = $(window).width();
        navBarColor();
    });

    function navBarColor() {
        if (winWidth < 768 || winTop > 75) {
            navigation.css('background-color', 'white');
            navA.css('color', 'black');
        } else {
            navigation.css('background-color', 'transparent');
            navA.css('color', '#ebeaea');
        }
        if (winWidth > 768) {
            innerNav.css('max-height', '65px');
            navToggle.removeClass('active');
        }
    }

    var navSkills = $('#navSkills'),
        navPortfolio = $('#navPortfolio'),
        navContact = $('#navContact'),
        top = $('#top'),
        portfolio = $('#portfolio'),
        skills = $('#skills'),
        about = $('#about'),
        navAbout = $('#navAbout');

// function that underlines the first element in an array and removes underline from all otherwise
// if skip is true it removes underline from all elements in the array
    var textDecorator = function(arr, skip) {
        arr.forEach(function(e, i) {
            if (i === 0 && !skip) {
                e.css('text-decoration', 'underline');
            } else {
                e.css('text-decoration', 'none');
            }
        });
    };

// runs the textDecorator on scroll, and updates the stateObj with the current scroll position
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

        if ($(window).scrollTop() + $(window).height() > $(document).height() - 30 || winTop > $('#contact').offset().top) {
            textDecorator([navContact, navAbout, navSkills, navPortfolio]);
        } else if (winTop < top.offset().top + top.height()) {
            textDecorator([navAbout, navSkills, navPortfolio, navContact], true);
        } else if (winTop > portfolio.offset().top && winTop < portfolio.offset().top + portfolio.height()) {
            textDecorator([navPortfolio, navAbout, navSkills, navContact]);
        } else if (winTop > skills.offset().top && winTop < skills.offset().top + skills.height()) {
            textDecorator([navSkills, navPortfolio, navAbout, navContact]);
        } else if (winTop > about.offset().top && winTop < about.offset().top + about.height()) {
            textDecorator([navAbout, navSkills, navPortfolio, navContact]);
        }
    });

    var navToggler = function(id) {
        if (id !== 'top' || navToggle.hasClass("active")) {
            navToggle.toggleClass("active");
            innerNav.css('max-height') === '65px' ? innerNav.css('max-height', '500px') : innerNav.css('max-height', '65px');
        }
    };

    $(document).on('click', '#navToggle', function() {
        navToggler();
    });

    $(document).on('click', '.navLink', function(e) {
        var id = e.target.id.slice(3, e.target.id.length).toLowerCase();
        e.preventDefault();
        scrollGlobe(id);
        navToggler(id);
    });

}