$(function(){
	$.get('/blocks', appendToList);

	function appendToList(blocks){
		var list = [];
		for(var i in blocks){
			list.push($('<li>',{text:blocks[i]}).addClass('list-group-item'));
		}
		$('.block-list').append(list);
		$('.block-list').addClass('list-group');
	}
});