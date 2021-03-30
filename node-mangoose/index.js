const { log } = require('console');
const mongoose = require('mongoose')

const Dishes = require('./model/dishes')

const url = 'mongodb://localhost:27017/test';
const connect = mongoose.connect(url);

connect.then((db)=>{
    console.log('connected correctly to server');

    Dishes.create({
        name:"biriyani",
        description:"test"
    }).then((dish)=>{
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id,{
            $set:{description:"Updated test"}
        },{
            new:true
        }).exec();
    })
    .then((dish)=>{
        console.log(dish);
        dish.comment.push({
            ratting:5,
            comment:"I am getting a sinking feeling",
            author:"Learnodo di Carpaccio"
        })

        return dish.save()
    })
    .then((dish)=>{
        console.log(dish);

        return Dishes.remove({});
    })
    .then(()=>{
        return mongoose.connection.close();
    })
    .catch((err)=>{
        console.log(err);
    })
})