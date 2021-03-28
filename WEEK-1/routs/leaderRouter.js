const express = require('express')
const bodyParser = require('body-parser')

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json())

leaderRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain')
    next();
}).get((req,res,next)=>{
    res.end('Will send all the leaders to you')
}).post((req,res,next)=>{
    res.end("Will add the leader name:"+req.body.name+'with details:'+req.body.description);
}).put((req,res,next)=>{
    res.setTimeout=403;
    res.end('PUT operation not suported on /leader');
}).delete((req,res,next)=>{
    res.end('Deleting all the leaders!')
});

//ROUTING FOR LEADER ID
leaderRouter.route('/:leaderId')
.get((req,res,next)=>{
    res.end('Will send you details of leader'+req.params.leaderId+'to you')
}).post((req,res,next)=>{
    res.setTimeout=403;
    res.end('POST operation not suported on /leaders/'+req.params.leaderId);
})
.put((req,res,next)=>{
    
    res.write('Updating the leader'+ req.params.leaderId +'\n');
    res.end('will update the leader:' + req.body.name + ' with details:' + req.body.description)
})
.delete((req,res,next)=>{
    res.end('Deleting leader'+req.params.leaderId)
});

module.exports=leaderRouter