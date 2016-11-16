/*Menu-toggle*/
$('#menu-toggle-left').click(function(e) {
    e.preventDefault();
    $('#wrapper').toggleClass('active-left');
    $('#sidebar-wrapper-left').toggleClass('maximized');
    if ($(this).hasClass('fa fa-chevron-right')) {
        $(this).removeClass('fa fa-chevron-right').addClass('fa fa-times');
    } else {
        $(this).removeClass('fa fa-times').addClass('fa fa-chevron-right');
    }

});

$('#menu-toggle-right').click(function(e) {
    e.preventDefault();
    console.log('great');
    $('#wrapper').toggleClass('active-right');
    $('#sidebar-wrapper-right').toggleClass('maximized');
    $('#menu-toggle-left').toggle();
});

$('#sidebar-wrapper-left').on('click', 'li', function() {
    $(this).addClass('active').siblings('li').removeClass('active');
});

$('#menu-toggle, #menu-icon').on('click', function() {
    $('#slide-in-menu').toggleClass('open');
});

$('#slide-menu-close').on('click', function() {
    $('#slide-in-menu').removeClass('open');
});

/* Dropdown Menu - Homepage */
$('#language-dropdown > a').on('click', function() {
    console.log('dropdown toggled');
    $(this).parent().toggleClass('open');
});

/* Full Page Menu Toggle */
$('#main-menu-toggle').on('click', function () {
    $('.full-page-bg-white').show();
});

$('.full-page-bg-white').on('click', '.close', function() {
    $('.full-page-bg-white').hide();
});

/* lawyer card - hover effect */
$('.lawyer-card').on('mouseover', function () {
    $(this).find('.hovercard').addClass('open');
}).on('mouseleave', function () {
    $(this).find('.hovercard').removeClass('open');
});