var express = require('express'),
    bodyParser = require('body-parser'),
    router = express.Router(),
    parseUrlEncoded = bodyParser.urlencoded({extended: false}),
    blocks = {
        'Fixed': 'Fastened securely in position',
        'Movable': 'Capable of being moved',
        'Rotating': 'Moving in a circle around its center'
    };

router.route('/')

.get(function (request, response){
	var limit = request.query.limit;

	//User Params
	if(limit >= 0){
        response.json(blocks.slice(0, limit));
	} else {
	    response.json(Object.keys(blocks));
    }
})

.post(parseUrlEncoded, function(request, response){
    var newBlock = request.body;
    blocks[newBlock.name] = newBlock.description;
    
    response.status(201).json(newBlock.name);
});


router.route('/:name')

.all(function(request, response, next ){
    var name = request.params.name;
    request.blockName = name[0].toUpperCase() + name.slice(1).toLowerCase();
	next();
})

.get(function(request, response){
    var description = blocks[request.blockName];
    if(!description){
    	response.status(404).json("No description found for " + request.blockName);
    }
    response.json(description);
})

.delete(function(request, response){
   delete blocks[request.blockName];
    response.sendStatus(200);
});


module.exports = router;