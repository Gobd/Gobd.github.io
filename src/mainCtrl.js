angular.module('app').controller('mainCtrl', function($scope, $document, $window, $interval) {

    $scope.scrollTo = function(id) {
        var el = angular.element(document.getElementById(id));
        $document.scrollToElement(el, 50, 200);
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
        $interval(print, delayRand(), text.length)
    }

    printer(tagText);

    var svgList = document.getElementsByTagName('svg');
    var aboutOff = angular.element(document.getElementById('about'))[0].offsetTop;
    var skillsOff = angular.element(document.getElementById('skills'))[0].offsetTop;
    var portOff = angular.element(document.getElementById('portfolio'))[0].offsetTop;
    var navAbout = document.getElementById('navAbout');
    var navSkills = document.getElementById('navSkills');
    var navPortfolio = document.getElementById('navPortfolio');
    var navContact = document.getElementById('navContact');

    function isScrolledIntoView(el) {
        var elemTop = el.getBoundingClientRect().top;
        var elemBottom = el.getBoundingClientRect().bottom;
        var isVisible = (elemTop >= 0) && (elemBottom <= $window.innerHeight);
        return isVisible;
    }

    $scope.pxScr = 0;
    $scope.navStyle = {
        'color': '#ebeaea'
    };
    $document.on('scroll', function() {
        $scope.$apply(function() {
            [].forEach.call(svgList, function(e) {
                if (isScrolledIntoView(e)) {
                    $(e).addClass('svgGrow');
                } else {
                    $(e).removeClass('svgGrow');
                }
            });
            $scope.pxScr = $window.scrollY;
            if ($scope.pxScr > 75) {
                $scope.navStyle = {
                    'color': '#131829'
                };
            } else {
                $scope.navStyle = {
                    'color': '#ebeaea'
                };
            }
            if ($scope.pxScr === 0) {
                navAbout.style.textDecoration = 'none';
                navSkills.style.textDecoration = 'none';
                navPortfolio.style.textDecoration = 'none';
            }
            if ($scope.pxScr > aboutOff - 65) {
                navAbout.style.textDecoration = 'underline';
                navSkills.style.textDecoration = 'none';
                navPortfolio.style.textDecoration = 'none';
            }
            if ($scope.pxScr > skillsOff - 65) {
                navAbout.style.textDecoration = 'none';
                navSkills.style.textDecoration = 'underline';
                navPortfolio.style.textDecoration = 'none';
            }
            if ($scope.pxScr > portOff - 65) {
                navAbout.style.textDecoration = 'none';
                navSkills.style.textDecoration = 'none';
                navPortfolio.style.textDecoration = 'underline';
            }
            if ($window.innerHeight + $document[0].body.scrollTop >= $document[0].body.scrollHeight - 50) {
                navContact.style.textDecoration = 'underline';
                navPortfolio.style.textDecoration = 'none';
            } else {
                navContact.style.textDecoration = 'none';
            }
        });
    });

});