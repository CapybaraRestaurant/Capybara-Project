const express = require("express");
const bodyParser = require("body-parser");
const lodash = require('lodash');
const path = require('path');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//Variable Placeholder
var item = { name: "John Doe",
    number: 1,
    time: new Date("2011-04-20T09:30:51.01").toLocaleTimeString(),
    price: '฿120'};
var newListItems = [item];
var tabTitle = 'Hi';
var proceedBtn = 'Send to Cooking';

app.get('/', (req, res) => {
    res.redirect('/restaurant');
})

app.get('/restaurant', (req, res) => {
    res.render('list', {newListItems, tabTitle, proceedBtn});
})

app.listen("3000", () => {
    console.log("Server is running on Port 3000.");
  });
  