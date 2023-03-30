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
var item = { name: "John Doe",
    number: 1,
    time: new Date("2011-04-20T09:30:51.01").toLocaleTimeString(),
    price: '฿120'};
var newListItems = [item];
var tabTitle = 'Queue';
var proceedBtn = 'Send to Cooking';

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

app.get('/', (req, res) => {
    res.redirect('/restaurant');
})

app.get('/restaurant', (req, res) => {
    res.render('list', {newListItems, tabTitle, proceedBtn});
})

app.get('/queue', async (req, res) => {
    res.render('list', { tabTitle: tabs[0].tabTitle, proceedBtn: tabs[0].proceedBtn, newListItems });
});

app.get('/cooking', async (req, res) => {
    res.render('list', { tabTitle: tabs[1].tabTitle, proceedBtn: tabs[1].proceedBtn, newListItems });
});

app.get('/delivery', async (req, res) => {
    res.render('list', { tabTitle: tabs[2].tabTitle, proceedBtn: tabs[2].proceedBtn, newListItems });
});

db.connect();

app.listen("3000", () => {
    console.log("Server is running on Port 3000.");
  });
  