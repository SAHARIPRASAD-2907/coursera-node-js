const express = require('express')
const bodyParser = require('body-parser')

const promoRouter = express.Router();
promoRouter.use(bodyParser.json())

//routing for promotions
promoRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain')
    next();
}).get((req,res,next)=>{
    res.end('Will send all promotions to you')
}).put((req,res,next)=>{
    res.setTimeout=403;
    res.end('PUT operation not suported on /promotions');
}).post((req,res,next)=>{
    res.end("Will add the promotions:"+req.body.name+'with details:'+req.body.description);
}).delete((req,res,next)=>{
    res.end('Deleting all the promotions!')
});

//ROUTING FOR PROMOTION ID
promoRouter.route('/:promoId')
.get((req,res,next)=>{
    console.log(req.params);
    res.end('Will send details of promotion:'+req.params.promoId +'to you')
})
.post((req,res,next)=>{
    res.setTimeout=403;
    res.end('POST operation not suported on /promotions/'+req.params.promoId);
})
.put((req,res,next)=>{
    
    res.write('Updating the promotion'+ req.params.promoId +'\n');
    res.end('will update the promotion:' + req.body.name + ' with details:' + req.body.description)
})
.delete((req,res,next)=>{
    res.end('Deleting promo'+req.params.dishId)
});

module.exports=promoRouter