const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/db.js");
const lodash = require('lodash');
const MongoStore = require('connect-mongo')

const app = express();

const session = require("express-session");
const Authen = require("./control/authen.js");
const user = require('./model/user.js');
const User = user.User;

const listItem = require("./model/order.js");
const { log } = require("console");
const Menu = listItem.Menu;
const MenuAmount = listItem.MenuAmount;
const Order = listItem.Order;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

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

app.use(session({
    secret: "jklfsodifjsktnwjasdp465dd", // Never ever share this secret in production, keep this in separate file on environmental variable
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }, //one hour
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/todolistDB"}
      )
    }
));


app.get('/', async (req, res) => {
    const menuList = await Menu.find({});
    const latestOrder = await Order.find({});
    console.log(getNewId(latestOrder));
    res.render('customer', { menuItems: menuList , order_id: getNewId(latestOrder)});
})

// find 
function getNewId(latestOrder) {
    var most = -1;
    for (let index = 0; index < latestOrder.length; index++) {
        const element = latestOrder[index];
        if (element.id > most) {
            most = element.id;
        }
    }
    return most+1;
}

app.post('/logout',(req,res)=>{
    req.session.destroy(function (err) {
    res.redirect('/restaurant'); 
    });
})

app.get('/restaurant', (req, res) => {
    res.render('login', {credential: true});
})

// app.get('/address', (req, res) => {
//     res.render('address');
// })

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const oldUser = await User.findOne({ username: username, password: password });
    if (oldUser != null) {
      req.session.userId = oldUser.id;
      console.log(req.session);
    } else {
        res.render('login', { credential: false});
        return;
    }
    res.redirect('/queue');
});

  app.get('/neworder', (req, res) => {
    res.redirect('/address');
  })

app.get('/queue', Authen.authentication, async (req, res) => {
    const foundList = await Order.find({ status: '1'});
    res.render('list', { tabTitle: tabs[0].tabTitle, proceedBtn: tabs[0].proceedBtn, foundList});
});

app.get('/cooking', Authen.authentication, async (req, res) => {
    const foundList = await Order.find({ status: '2'});
    res.render('list', { tabTitle: tabs[1].tabTitle, proceedBtn: tabs[1].proceedBtn, foundList });
});

app.get('/delivery', Authen.authentication, async (req, res) => {
    const foundList = await Order.find({ status: '3'});
    res.render('list', { tabTitle: tabs[2].tabTitle, proceedBtn: tabs[2].proceedBtn, foundList });
});

app.post('/send', Authen.authentication, async (req, res) => {
    var changeList = req.body.ids;
    var newStatus = Number.parseInt(req.body.status)+1;
    console.log(changeList);
    for (let i = 0; i < changeList.length; i++) {
        var foundList = await Order.updateOne({ id: changeList[i]}, { $set: { status: newStatus }});     
    }
    res.json(req.body);
})

db.connect();

app.listen("3000", () => {
    console.log("Server is running on Port 3000.");
});

function injectDummyDB(){
    User.insertMany([{
        "_id": {
          "$oid": "642651c785069fdfe805d52a"
        },
        "username": "admin",
        "password": "1234"
      }]);
    Order.insertMany([{
        "_id": {
          "$oid": "64252c7993e4cc92d4173992"
        },
        "id": 1,
        "customer": "John Doe",
        "time": {
          "$date": "2011-04-20T02:30:51.010Z"
        },
        "address": "Robert Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678",
        "telNo": "0832221155",
        "items": [
          {
            "name": "Chicken curry",
            "price": 60,
            "_id": {
              "$oid": "64252c7993e4cc92d4173993"
            },
            "amount": "1"
          },
          {
            "name": "Naan",
            "price": "60",
            "amount": "1"
          }
        ],
        "totalPrice": "120",
        "status": 2,
        "__v": 0,
        "totalItems": "2",
        "note": "Make chicken curry less spicy",
        "location": "LatLng(18.78828218510149, 98.9929770532485)"
      },{
        "_id": {
          "$oid": "64258c9ec121f3bcd1236682"
        },
        "id": 2,
        "customer": "Jane Doe",
        "time": {
          "$date": "2011-04-20T02:30:51.010Z"
        },
        "address": "Robert Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678",
        "telNo": "0832221155",
        "items": [
          {
            "name": "Chicken curry",
            "price": 60,
            "_id": {
              "$oid": "64252c7993e4cc92d4173993"
            },
            "amount": "1"
          },
          {
            "name": "Naan",
            "price": "60",
            "amount": "1"
          }
        ],
        "totalPrice": "120",
        "status": 1,
        "__v": 0,
        "totalItems": "2",
        "note": "Make chicken curry less spicy",
        "location": "LatLng(18.78828218510149, 98.9929770532485)"
      }]);
}