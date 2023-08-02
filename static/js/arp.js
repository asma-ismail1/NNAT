$(function(){
	$('button').click(function(){
		var user = $('#ip').val();
		var pass = $('#erange').val();
		$('h2').text('scanning..');

		$.ajax({
			url: '/arpScan',
			data: $('form').serialize(),
			type: 'POST',
			
			success: function(response){
				a=jQuery.parseJSON(response);
				console.log(a);
				$('#result').text('hi'+a.arp_scan_content);
				$('h2').text('Enter The required Data to start scanning.');

				console.log(response);
			},
			error: function(error){
				console.log('someting')
				console.log(error);
			}
		});
	});
});

