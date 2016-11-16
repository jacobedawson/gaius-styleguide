$(document).ready(function () {
    console.log('scripts active');
    /*Menu-toggle*/
    $("#menu-toggle-left").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active-left");
        $('#sidebar-wrapper-left').toggleClass('minimized');
    });

    $("#menu-toggle-right").click(function(e) {
        e.preventDefault();
        console.log('ok');
        $("#wrapper").toggleClass("active-right");
        $('#sidebar-wrapper-right').toggleClass('minimized');
    });


});


