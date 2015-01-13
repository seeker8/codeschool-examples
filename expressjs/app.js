var express = require('express'),
    app = express(),
    logger = require('./logger'),
    bodyParser = require('body-parser'),
    parseUrlEncoded = bodyParser.urlencoded({extended: false}),
    blocks = {
        'Fixed': 'Fastened securely in position',
        'Movable': 'Capable of being moved',
        'Rotating': 'Moving in a circle around its center'
    };

app.use(logger);

app.use(express.static('expressjs/public'));

app.param('name', function(request, response, next ){
    var name = request.params.name;
    request.blockName = name[0].toUpperCase() + name.slice(1).toLowerCase();
	next();
});

app.get('/blocks', function (request, response){
	var limit = request.query.limit;

	//User Params
	if(limit >= 0){
        response.json(blocks.slice(0, limit));
	} else {
	    response.json(Object.keys(blocks));
    }
});

app.get('/blocks/:name', function(request, response){
    var description = blocks[request.blockName];
    if(!description){
    	response.status(404).json("No description found for " + request.blockName);
    }
    response.json(description);
});

app.post('/blocks', parseUrlEncoded, function(request, response){
    var newBlock = request.body;
    blocks[newBlock.name] = newBlock.description;
    
    response.status(201).json(newBlock.name);
});

app.delete('/blocks/:name', function(request, response){
   delete blocks[request.blockName];
    response.sendStatus(200);
});

app.listen(3000, function(){
	console.log('Server running on port 3000');
});