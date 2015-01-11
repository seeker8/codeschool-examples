var express = require('express'),
    app = express(),
    logger = require('./logger'),
    jsonBlocks = {
    	'Fixed': 'Fastened securely in position',
    	'Movable': 'Capable of being moved',
    	'Rotating': 'Moving in a circle around its center'
    };

app.use(logger);

app.use(express.static('public'));

app.get('/blocks', function(request, response){
	var blocks = ['Fixed', 'Movable', 'Rotating'],
	    limit = request.query.limit;

	//User Params
	if(limit >= 0){
        response.json(blocks.slice(0, limit));
	} else {
	    response.json(blocks);
    }
});

app.get('/blocks/:name', function(request, response){
    var name = request.params.name,
        description = jsonBlocks[name];
    if(!description){
    	response.status(404).json("No description found for " + name);
    }
    response.json(description);
});

app.listen(3000, function(){
	console.log('Server running on port 3000');
});