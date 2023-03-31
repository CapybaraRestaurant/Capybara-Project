const mongoose = require('mongoose');

exports.connect = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/capybaraDB')
    .then(()=> console.log('Database is connected'))
    .catch((e) => console.log(e));
    };