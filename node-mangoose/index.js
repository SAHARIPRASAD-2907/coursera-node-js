const { log } = require('console');
const mongoose = require('mongoose')

const Dishes = require('./model/dishes')

const url = 'mongodb://localhost:27017/test';
const connect = mongoose.connect(url);

connect.then((db)=>{
    console.log('connected correctly to server');

    var newDish=Dishes({
        name:"biriyani",
        description:"test"
    });

    newDish.save().then((dish)=>{
        console.log(dish);

        return Dishes.findOne({});
    })
    .then((dishes)=>{
        console.log(dishes);

        return Dishes.deleteMany({})
    })
    .then(()=>{
        return mongoose.connection.close();
    })
    .catch((err)=>{
        console.log(err);
    })
})