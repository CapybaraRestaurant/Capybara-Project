const express = require("express");
const bodyParser = require("body-parser");
const lodash = require('lodash');
const path = require('path');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.redirect('/restaurant');
})

app.get('/restaurant', (req, res) => {
    res.sendFile(__dirname+'/views/index.html');
})

app.listen("3000", () => {
    console.log("Server is running on Port 3000.");
  });
  