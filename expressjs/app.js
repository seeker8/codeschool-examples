var express = require('express'),
    app = express(),
    logger = require('./logger');

app.use(logger);

app.use(express.static('public'));

app.get('/blocks', function(request, response){
	var blocks = ['Fixed', 'Movible', 'Rotable'];
	response.json(blocks);
});

app.listen(3000, function(){
	console.log('Server running on port 3000');
});