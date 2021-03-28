const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname='localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json())

app.all('/dishes',(req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain')
    next();
});

//ROUTING FOR DISHES
app.get('/dishes',(req,res,next)=>{
    res.end('Will send all the dishes to you')
});

app.post('/dishes',(req,res,next)=>{
    res.end("Will add the dish:"+req.body.name+'with details:'+req.body.description);
});

app.put('/dishes',(req,res,next)=>{
    res.setTimeout=403;
    res.end('PUT operation not suported on /dishes');
});

app.delete('/dishes',(req,res,next)=>{
    res.end('Deleting all the dishes!')
});


//ROUTING FOR DISH ID
app.get('/dishes/:dishId',(req,res,next)=>{
    res.end('Will send details of dishes:'+req.params.dishId +'to you')
});

app.post('/dishes/:dishId',(req,res,next)=>{
    res.setTimeout=403;
    res.end('POST operation not suported on /dishes/'+req.params.dishId);
});

app.put('/dishes/:dishId',(req,res,next)=>{
    
    res.write('Updating the dish'+ req.params.dishId +'\n');
    res.end('will update the dish:' + req.body.name + ' with details:' + req.body.description)
});

app.delete('/dishes/:dishId',(req,res,next)=>{
    res.end('Deleting dish'+req.params.dishId)
});

app.use(express.static(__dirname+'/public'))

app.use((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Contetnt-type','text/html')
    res.end('<html><body><h1>This is a express server</h1></body></html>')
});

const server = http.createServer(app);

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}`);
})