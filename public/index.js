$('a.nav-link').each(function (index, element) {
    if ($('h1').text() == $(this).text()) {
        $(this).addClass('active');
        $(this).css('border-bottom', '3px solid white');
    }
});

$('a.nav-link').click(function (e) {
    $(this).addClass('active');
    $(this).css('border-bottom', '3px solid white');
});