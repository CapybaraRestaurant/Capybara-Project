var cart = { 
    menu: [],
    order_id: ''
    }

$('.plus').each(function (index, element) {
    $(this).click( (e) => {
        console.log(e);
        var name = $(this).attr('name');
        console.log('add id'+name+' by 1');
        $('div[name="'+name+'"]').text((Number.parseInt($('div[name="'+name+'"]').text())+1));
    }) 
});

$('.minus').each(function (index, element) {
    $(this).click( (e) => {
        console.log(e);
        var name = $(this).attr('name');
        console.log('subtract id'+name+' by 1');
        $('div[name="'+name+'"]').text((Number.parseInt($('div[name="'+name+'"]').text())-1));
    }) 
});

$('.cart').each(function (index, element) {
    $(this).click( (e) => {
        var menu_id = $(this).attr('name');
        var index = cart.menu.findIndex(element => element.menu_id == menu_id);
        console.log(index);
        if (index == -1) {
            cart.menu.push({
                menu_id: menu_id,
                amount: Number.parseInt($('div[name="'+menu_id+'"]').text())
            })
            console.log(cart.menu);
        } else {
            cart.menu[index].amount+=Number.parseInt($('div[name="'+menu_id+'"]').text());
            console.log(cart.menu);
        }
    }) 
});