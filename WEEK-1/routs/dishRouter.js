const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();


dishRouter.use(bodyParser.json());


//routing for dishes
dishRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain')
    next();
}).get((req,res,next)=>{
    res.end('Will send all the dishes to you')
}).post((req,res,next)=>{
    res.end("Will add the dish:"+req.body.name+'with details:'+req.body.description);
}).put((req,res,next)=>{
    res.setTimeout=403;
    res.end('PUT operation not suported on /dishes');
}).delete((req,res,next)=>{
    res.end('Deleting all the dishes!')
});


// ROUTING FOR DISH ID
dishRouter.route('/:dishId')
.get((req,res,next)=>{
    console.log(req.params);
    res.end('Will send details of dishes:'+req.params.dishId +'to you')
})
.post((req,res,next)=>{
    res.setTimeout=403;
    res.end('POST operation not suported on /dishes/'+req.params.dishId);
})
.put((req,res,next)=>{
    
    res.write('Updating the dish'+ req.params.dishId +'\n');
    res.end('will update the dish:' + req.body.name + ' with details:' + req.body.description)
})
.delete((req,res,next)=>{
    res.end('Deleting dish'+req.params.dishId)
});


module.exports = {
    dishRouter}
