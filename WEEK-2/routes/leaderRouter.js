const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Leader = require('../model/leaders')

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json())

leaderRouter.route('/')
.get((req,res,next)=>{
    Leader.find({})
    .then((promotions)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json')
        res.json(promotions)
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post((req,res,next)=>{
    Leader.create(req.body)
    .then((leader)=>{
        console.log('Leader created',leader);
        res.statusCode=200;
        res.setHeader('Content-type','application/json')
        res.json(leader)

    },(err)=>next(err))
    .catch((err)=>next(err))}).put((req,res,next)=>{
    res.setTimeout=403;
    res.end('PUT operation not suported on /leader');
}).delete((req,res,next)=>{
    Leader.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json')
        res.json(resp)

    },(err)=>next(err))
    .catch((err)=>next(err))});

//ROUTING FOR LEADER ID
leaderRouter.route('/:leaderId')
.get((req,res,next)=>{
    console.log(req.params);
    Leader.findById(req.params.leaderId)
    .then((leader)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json')
        res.json(leader)

    },(err)=>next(err))
    .catch((err)=>next(err))})
.put((req,res,next)=>{
    Leader.findByIdAndUpdate(req.params.leaderId,{
        $set:req.body
    },{new:true})
    .then((promotion)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json')
        res.json(promotion)

    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post((req,res,next)=>{
    res.setTimeout=403;
    res.end('POST operation not suported on /leaders/'+req.params.leaderId);
})
.delete((req,res,next)=>{
    Leader.findByIdAndRemove(req.params.leaderId)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json')
        res.json(resp)

    },(err)=>next(err))
    .catch((err)=>next(err))});

module.exports=leaderRouter