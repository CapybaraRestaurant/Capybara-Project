var map = L.map('map').setView([51.505, -0.09], 13);
var marker;

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

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
    let selector2 = 'p[name="'+$(this).attr('name')+'"]';
    let location = $(selector2).text().replace('LatLng(','').replace(')','').split(', ');
    console.log(location);
    map.setView(location, 13);
    marker = L.marker(location).addTo(map);
});

// uncheck order when close order detail
// remove marker when close
$('.btn-close').click(function (e) { 
    $("input[type='checkbox']").prop('checked', false);
    marker.remove();
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
