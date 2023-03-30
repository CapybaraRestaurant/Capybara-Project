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

$('#sendBtn').click(function (e) { 
    var status = statusList[$('h1').text()];
    var checkboxes = [];
    $('input').each((index, element) => {
        if (element.name != 'all')
            checkboxes.push(element.name);
    })
    $.post("/send", {
            ids: checkboxes,
            status: status
        },
        function (data, textStatus, jqXHR) {
            console.log(data);
        }
    );
});