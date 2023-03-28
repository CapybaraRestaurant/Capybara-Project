$('a.nav-link').click(function (e) { 
    e.preventDefault();
    $('a.nav-link').removeClass('active');
    $('a.nav-link').css('border-bottom', '');
    $(this).addClass('active');
    $(this).css('border-bottom', '3px solid white');
});