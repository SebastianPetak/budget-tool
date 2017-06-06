$(document).ready(function() {
	$.ajax({
		dataType: 'json',
		url: 'sample-budget.json',
	}).done(function(result) {
	});
});
