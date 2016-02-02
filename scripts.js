$(function() {
  $("a[href=#menuExpand]").click(function(e) {
    $(".outer").toggleClass("grow");
    e.preventDefault();
  });
});

$(function() {
  $("a[href=#menuExpand]").click(function(e) {
    $(".menu").toggleClass("menuOpen");
    e.preventDefault();
  });
});

$(".rotate").click(function() {
  $(this).toggleClass("down");
});
