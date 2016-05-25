    var stateObj = {};

    $(document).ready(function() {

        var $main = $('#main'),
            $body = $('body');

        window.onhashchange = function() {
            showBody(false);
            render();
        };

        if (!window.location.hash || window.location.hash === '#/') {
            if ($main.html()) {
                stateObj.indexHtml = $main.html();
            }
        }

        function showBody(bool) {
            if (bool) {
                $body.css('visibility', 'visible');
            } else {
                $body.css('visibility', 'hidden');
            }
        }

        function scrollDown() {
            $(window).scrollTop(stateObj.scrollData - 70);
        }

        function render() {
            if (window.location.hash === '#/asd') {
                if (!stateObj.testHtml) {
                    $.get('/test.html', function(data) {}).then(function(data) {
                        stateObj.testHtml = data;
                        $main.html(data);
                        showBody(true);
                        $(window).off();
                    });
                } else {
                    $main.html(stateObj.testHtml);
                    showBody(true);
                    $(window).off();
                }
            } else {
                window.location.hash = '#';
                if (!stateObj.indexHtml) {
                    $.get('/mainTemp.html', function(data) {}).then(function(data) {
                        stateObj.indexHtml = data;
                        $main.html(data);
                        mainPage();
                        showBody(true);
                        scrollDown();
                    });
                } else {
                    $main.html(stateObj.indexHtml);
                    mainPage();
                    showBody(true);
                    scrollDown();
                }
            }
        }

        render();
    });