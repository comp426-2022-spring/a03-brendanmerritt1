//require dependencies
import * as coin from "../a02-brendanmerritt1/modules/coin.mjs"
import express from 'express';
import Yargs from 'yargs';

const app = express();
const argv = Yargs(process.argv.slice(2)).argv;

//define port as default or from cli
const port = (argv.port == undefined) ? 5000 : argv.port;

//start app server  
const server = app.listen(port, () => {
    console.log(`App is running on port ${port}`);
    //or console.log('App is running on port %PORT%').replace('%PORT')
});

//default endpoint
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND');
    res.type('text/plain');
});

//define check endpoint
app.get('/app/', (req, res) => {
    //respond with status 200
    res.statusCode = 200;

    //respond with status message "OK"
    res.statusMessage = 'OK';
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
    res.end(res.statusCode+ ' ' +res.statusMessage);
});

//random coin flip endpoint
app.get('app/flip', (req, res) => {
    res.json({ 'flip': coin.coinFlip() })
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.writeHead(res.statusCode, { 'Content-Type' : 'text/plain' });
    res.end(res.statusCode + ' ' + resizeTo.statusMessage);
});



//multiple flips endpoint
app.get('/app/flips/:number', (req, res) => {
	const flips = manyflips(req.params.number);

});