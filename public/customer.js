var orderItem = {
    name: "Chicken Tikka Masala",
    price: 165,
    amount: 1
}

var order = {
    id: '',
    customer: '',
    time: Date.now(),
    address: '',
    telNo: '',
    items: [orderItem],
    note: '',
    totalPrice: '',
    status: 1,
    totalItems: '',
    location: ''
}

$('.plus').click(function (e) {
    var amount = Number.parseInt($('strong[name="'+$(this).attr('name')+'"].order').text())+1;
    orderItem.amount = amount;
    $('strong[name="'+$(this).attr('name')+'"]').text(orderItem.amount);
});

$('.minus').click(function (e) {
    var amount = Number.parseInt($('strong[name="'+$(this).attr('name')+'"].order').text())-1;
    $('strong[name="'+$(this).attr('name')+'"]').text(amount);
    orderItem.amount = amount;
});
