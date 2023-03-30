const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/db.js");
const lodash = require('lodash');

const app = express();

const listItem = require("./model/order.js");
const Menu = listItem.Menu;
const Order = listItem.Order;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//Variable Placeholder
var order1 = {
    id: 1,
    customer: "John Doe",
    time: new Date("2011-04-20T09:30:51.01"),
    address: "Robert Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678",
    telNo: '0832221155',
    items: [ {
        name: "Chicken curry",
        price: 120
    }],
    totalPrice: 120,
    status: 'Queue'
};
var orders = [order1];

// Value for tabs
const queueTab = {
    tabTitle: 'Queue',
    proceedBtn: 'Send to Cooking',
}
const cookTab = {
    tabTitle: 'Cooking',
    proceedBtn: 'Send to Delivery',
}
const deliveryTab = {
    tabTitle: 'Delivery',
    proceedBtn: 'Complete Order',
}
var tabs = [queueTab, cookTab, deliveryTab];

//Order.insertMany(orders);
app.get('/', (req, res) => {
    res.redirect('/restaurant');
})

app.get('/restaurant', (req, res) => {
    res.redirect('/queue');
})

app.get('/queue', async (req, res) => {
    const foundList = await Order.find({ status: 'Queue'});
    res.render('list', { tabTitle: tabs[0].tabTitle, proceedBtn: tabs[0].proceedBtn, foundList});
});

app.get('/cooking', async (req, res) => {
    const foundList = await Order.find({ status: 'Cooking'});
    res.render('list', { tabTitle: tabs[1].tabTitle, proceedBtn: tabs[1].proceedBtn, foundList });
});

app.get('/delivery', async (req, res) => {
    const foundList = await Order.find({ status: 'Delivery'});
    res.render('list', { tabTitle: tabs[2].tabTitle, proceedBtn: tabs[2].proceedBtn, foundList });
});


db.connect();

app.listen("3000", () => {
    console.log("Server is running on Port 3000.");
  });
  