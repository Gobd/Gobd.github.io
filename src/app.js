$(document).ready(function() {

    jQuery.fn.outerHTML = function() {
        return (this[0]) ? this[0].outerHTML : '';
    };

    window.onhashchange = function() {
        showBody(false);
        render();
    };

    var obj = {},
        $main = $('#main'),
        $body = $('body');

    if (!window.location.hash || window.location.hash === '#/') {
        if ($main.html()) {
            obj.indexHtml = $main.html();
        }
    }

    function showBody(bool) {
        if (bool) {
            $body.css('visibility', 'visible');
        } else {
            $body.css('visibility', 'hidden');
        }
    }

    function render() {
        if (window.location.hash === '#/asd') {
            if (!obj.testHtml) {
                $.get('/test.html', function(data) {}).then(function(data) {
                    obj.testHtml = data;
                    $main.html(data);
                    showBody(true);
                });
            } else {
                $main.html(obj.testHtml);
                showBody(true);
            }
        } else {
            window.location.hash = '#';
            if (!obj.indexHtml) {
                $.get('/mainTemp.html', function(data) {}).then(function(data) {
                    obj.indexHtml = data;
                    $main.html(data);
                    mainPage();
                    showBody(true);

                });
            } else {
                $main.html(obj.indexHtml);
                mainPage();
                showBody(true);
            }
        }
    }

    render();
});