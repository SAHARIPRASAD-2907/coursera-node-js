const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Promotions = require('../model/promotion')

const promoRouter = express.Router();
promoRouter.use(bodyParser.json())

//routing for promotions
promoRouter.route('/')
.get((req,res,next)=>{
    Promotions.find({})
    .then((promotions)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json')
        res.json(promotions)
    },(err)=>next(err))
    .catch((err)=>next(err))
}).put((req,res,next)=>{
    res.setTimeout=403;
    res.end('PUT operation not suported on /promotions');
}).post((req,res,next)=>{
    Promotions.create(req.body)
    .then((promotion)=>{
        console.log('Promotion created',promotion);
        res.statusCode=200;
        res.setHeader('Content-type','application/json')
        res.json(promotion)

    },(err)=>next(err))
    .catch((err)=>next(err))
}).delete((req,res,next)=>{
    Promotions.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json')
        res.json(resp)

    },(err)=>next(err))
    .catch((err)=>next(err))
});

//ROUTING FOR PROMOTION ID
promoRouter.route('/:promoId')
.get((req,res,next)=>{
    console.log(req.params);
    Promotions.findById(req.params.promoId)
    .then((promotion)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json')
        res.json(promotion)

    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post((req,res,next)=>{
    res.setTimeout=403;
    res.end('POST operation not suported on /promotions/'+req.params.promoId);
})
.put((req,res,next)=>{
    
    Promotions.findByIdAndUpdate(req.params.promoId,{
        $set:req.body
    },{new:true})
    .then((promotion)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json')
        res.json(promotion)

    },(err)=>next(err))
    .catch((err)=>next(err))
})
.delete((req,res,next)=>{
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json')
        res.json(resp)

    },(err)=>next(err))
    .catch((err)=>next(err))
});

module.exports=promoRouter