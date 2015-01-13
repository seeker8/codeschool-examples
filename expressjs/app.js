var express = require('express'),
    app = express(),
    logger = require('./logger'),
    blocks = require('./routes/blocks');

app.use(logger);

app.use(express.static('expressjs/public'));

app.use('/blocks', blocks);
app.listen(3000, function(){
	console.log('Server running on port 3000');
});