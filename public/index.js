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

// check all boxes
$('input[name="all"]').click(function(e) {
    $("input[type='checkbox']").prop({
        checked: $(this).prop("checked")
    });
})

$('button[name="reload"]').click((e) => {
    location.reload();
})

setInterval( () => {
    location.reload();
}, 60000);

const statusList = {
    "Queue": 1,
    "Cooking": 2,
    "Delivery": 3
}

// select that order when click detail
$('a.detail').click(function (e) { 
    $("input[type='checkbox']").prop('checked', false);
    let selector = 'input[name="'+$(this).attr('name')+'"]';
    $(selector).prop('checked', true);
});

// uncheck order when close order detail
$('.btn-close').click(function (e) { 
    $("input[type='checkbox']").prop('checked', false);
});

$('#sendBtn,[name="sendBtn"]').click(function (e) {
    var status = statusList[$('h1').text()];
    var checkboxes = [];
    $(':checked').each((index, element) => {
        if (element.name != 'all')
            checkboxes.push(element.name);
    })
    $.post("/send", {
            ids: checkboxes,
            status: status
        },
        function (data, textStatus, jqXHR) {
            checkboxes.forEach( (e) => {
                var selector = 'tr[name="'+e+'"]';
                $(selector).prop('hidden', true);
                console.log('Order #'+e+ ' hidden');
            })
        }
    );
});