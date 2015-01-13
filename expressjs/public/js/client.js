$(function(){
    $.get('/blocks', appendToList);
    
	function appendToList(blocks){
		var list = [], block, content, closespan;
		$('.block-list').addClass('list-group');
        
		for(var i in blocks){
            block = blocks[i];
            content = '<a href="/blocks/' + block + '">' + block + '</a>';
            closespan = '<span class="glyphicon glyphicon-remove-circle" data-block="' + block + '"></span>';
            var li = $('<li>');
            li.addClass('list-group-item');
            li.append(closespan);
            li.append(content);
			list.push(li);
		}
		$('.block-list').append(list);
        $('.block-list').trigger('create');
	}
    
    //Body Parser
    $('form').on('submit', function(event){
        event.preventDefault();
        var form = $(this),
            blockData = form.serialize();
        
        $.ajax({
            url: '/blocks',
            method: 'POST',
            data: blockData
        }).done(function(blockName){
            appendToList([blockName]);
            form.trigger('reset');
        });
        
    });
    
    //DELETE requests
    $('.block-list').on('click', 'span[data-block]', function(){
        var $this = $(this);
        
        if(!confirm('Are you sure?')){
            return false;
        }
        
        $.ajax({
            type: 'DELETE',
            url: '/blocks/' + $this.attr('data-block')
        }).done(function(){
            $this.parent('li').remove();
        });
    });
});