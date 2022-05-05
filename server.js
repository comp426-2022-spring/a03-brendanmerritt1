//require dependencies
import * as coin from './coin.mjs'
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

//define check endpoint
app.get('/app/', (req, res) => {
    //respond with status 200
    res.statusCode = 200;

    //respond with status message "OK"
    res.statusMessage = 'OK';
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
    res.end(res.statusCode + ' ' + res.statusMessage);
});

//random coin flip endpoint
app.get('/app/flip', (req, res) => {
    res.contentType('text/json');
    res.status(200).json({ 'flip' : coin.coinFlip()});
});

//multiple flips endpoint
app.get('/app/flips/:number', (req, res) => {
    res.contentType('text/json');
	const flips = coin.coinFlips(req.params.number);
    const count = coin.countFlips(flips);
    res.status(200).json({ 'raw' : flips, 'summary' : count})
});

//flip match against heads endpoint
app.get('/app/flip/call/heads', (req, res) => {
    res.contentType('text/json');
    res.status(200).json(coin.flipACoin('heads'));
});


//flip match against tails endpoint
app.get('/app/flip/call/tails', (req, res) => {
    res.contentType('text/json');
    res.status(200).json(coin.flipACoin('tails'));
});

//default endpoint
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND');
});