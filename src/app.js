$(document).ready(function() {
    window.onhashchange = function() {
        render();
    };

    function render() {
        if (window.location.hash === '#/asd') {
            $.get('test.html', function(data) {}).then(function(data) {
                $('body').html(data);
            });
        } else {
            $.get('/mainTemp.html', function(data) {}).then(function(data) {
                $('body').html(data);
                mainPage();
            });
        }
    }

    render();
});