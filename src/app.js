    var stateObj = {};

    $(document).ready(function() {

        var $main = $('#main'),
            $body = $('body');

        window.onhashchange = function() {
            // hide body on hash change, the render function shows the body once it has rendered the page
            showBody(false);
            render();
        };

        // store the main page if that is where the user starts
        if (!window.location.hash || window.location.hash === '#/') {
            if ($main.html()) {
                stateObj.indexHtml = $main.html();
            }
        }

        // hides body if hide is true, otherwise shows it
        function showBody(hide) {
            if (hide) {
                $body.css('visibility', 'visible');
            } else {
                $body.css('visibility', 'hidden');
            }
        }

        // used to scroll down upon loading the main page after coming back from another view
        function scrollDown() {
            $(window).scrollTop(stateObj.scrollData - 70);
        }

        // makes it easy to show a new template with less repeating
        function showTemplate(data) {
            $main.html(data);
            showBody(true);
        }
        // the if-else inside each if handle the cases where the template is already cached or not
        function render() {
            if (window.location.hash === '#/projects') {
                if (!stateObj.projectsHtml) {
                    $.get('/projects.html', function(data) {}).then(function(data) {
                        stateObj.projectsHtml = data;
                        showTemplate(data);
                    });
                } else {
                    showTemplate(stateObj.projectsHtml);
                }
                // must remove scroll listeners otherwise the stateObj.scrollData doesn't work
                $(window).off();
            } else {
                window.location.hash = '#';
                if (!stateObj.indexHtml) {
                    $.get('/mainTemp.html', function(data) {}).then(function(data) {
                        stateObj.indexHtml = data;
                        showTemplate(data);
                        // this is the javascript that this view requires
                        mainPage();
                        // function that scrolls to the stateObj.scrollData height, taking into account the navBars height
                        scrollDown();
                    });
                } else {
                    showTemplate(stateObj.indexHtml);
                    mainPage();
                    scrollDown();
                }
            }
        }
        // call render function to kick things off
        render();
    });