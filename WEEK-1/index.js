const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const {dishRouter}= require('./routs/dishRouter')
const promoRouter = require('./routs/promoRouter')
const leaderRouter = require('./routs/leaderRouter')


const hostname='localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json())


app.use('/dishes',dishRouter)
app.use('/promotions',promoRouter)
app.use('/leaders',leaderRouter)
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