module.exports = function(request, response, next){
	var start = +new Date(),
	    url = request.url,
	    method = request.method,
	    stream = process.stdout;
    
    response.on('finish', function(){
        var duration = +new Date() - start;
    	stream.write(method + ' to ' + url + '\nTook ' + duration + 'ms \n\n');
    });
    

	next();
};