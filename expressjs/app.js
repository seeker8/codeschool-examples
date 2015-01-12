var express = require('express'),
    app = express(),
    logger = require('./logger'),
    blocks = {
    	'Fixed': 'Fastened securely in position',
    	'Movable': 'Capable of being moved',
    	'Rotating': 'Moving in a circle around its center'
    };

app.use(logger);

app.use(express.static('expressjs/public'));

app.get('/blocks', function(request, response){
	var limit = request.query.limit;

	//User Params
	if(limit >= 0){
        response.json(blocks.slice(0, limit));
	} else {
	    response.json(Object.keys(blocks));
    }
});

app.get('/blocks/:name', function(request, response){
    var name = request.params.name,
        block = name[0].toUpperCase() + name.slice(1).toLowerCase();
        description = blocks[block];
    if(!description){
    	response.status(404).json("No description found for " + block);
    }
    response.json(description);
});

app.listen(3000, function(){
	console.log('Server running on port 3000');
});