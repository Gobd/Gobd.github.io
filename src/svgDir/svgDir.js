angular.module('app').directive('svgDir', function($window) {
    return {
        templateUrl: 'svgDir.html',
        controller: function($scope, $document) {

            var svgList = document.getElementsByTagName('svg');

            function isScrolledIntoView(el) {
                var elemTop = el.getBoundingClientRect().top;
                var elemBottom = el.getBoundingClientRect().bottom;
                var isVisible = (elemTop >= 0) && (elemBottom <= $window.innerHeight);
                return isVisible;
            }

            $document.on('scroll', function() {
                $scope.$apply(function() {
                    [].forEach.call(svgList, function(e) {
                        if (isScrolledIntoView(e)) {
                            $(e).addClass('svgGrow');
                        } else {
                            $(e).removeClass('svgGrow');
                        }
                    });
                });
            });

        }
    };
});