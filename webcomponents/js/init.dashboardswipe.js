$(document).ready(function() {
    $(".desktop-apps-wrapper").swiperight(function() {
        $(".carousel").carousel('prev');
    });
    $(".desktop-apps-wrapper").swipeleft(function() {
        $(".carousel").carousel('next');
    });
});