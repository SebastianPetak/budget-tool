$(document).ready(function() {
	/* Retrieve user data
		Currently using a fake JSON file from the public folder
		Needs to be replaced with actual api route which will use
		the user_id to find the correct document
	*/
	// TODO Create object to contain state of the budget

	// var budgetData = {
	// 	fixedCosts = [],
	// 	investments = [],
	// 	savings = [],
	// 	spendingMoney = [],
	// 	monthlyIncome = 0
	// }

	// TODO create function to update monthlyIncome
	// var updateMonthlyIncome = () => {
	// 	// Post to a api route to change the monthly income
	// }

	// MonthlyIncome =========================================================
	// $.ajax({
	// 	dataType: 'json',
	// 	url: '/monthlyIncome'
	// 	type: 'post'
	// }).done(function(response) {
	//
	// })

	// COSTS =================================================================
	$.ajax({
		dataType: 'json',
		url: 'sample-budget.json',
	}).done(function(response) {
		/* CENTER PANE ========================================================= */
		/* assign object containing a category of cost to a variable */
		var fixedCosts = response.fixedCosts;
		var investments = response.investments;
		var savings = response.savings;
		var spendingMoney = response.spendingMoney;

		/* assign a string containing the name of an id.This id is assigned to
			the <tbody> element to which we will add rows */
		var fixedItemsId = '#fixed-cost-items';
		var investmentItemsId = '#investment-items';
		var savingsItemsId = '#savings-items';
		var spendingMoneyItemsId = '#spending-money-items';

		/* take in the object containing our budget items and the id to assign
			rows to and populate the table with our users budget items */
		var appendBudgetRows = (category, id) => {
			$.each(category, function(i, item) {
				$(id + '> tbody').append(
					'<tr>',
					$('<td>').text(item.name),
					$('<td>').text('$' + item.amount.toFixed(2)),
					$('<td>').text((item.amount / response.monthlyIncome * 100).toFixed(1) + '%'),
					'</tr>'
				);
			});
		};

		/* call our function to populate all tables with the appropriate data */
		appendBudgetRows(fixedCosts, fixedItemsId);
		appendBudgetRows(investments, investmentItemsId);
		appendBudgetRows(savings, savingsItemsId);
		appendBudgetRows(spendingMoney, spendingMoneyItemsId);

		/* LEFT PANE =========================================================== */
		/* display total monthly income */
		$('#monthlyIncome').html('Monthly Income: $' + response.monthlyIncome);
		/* calculate and display how much of the monthly income is used by each
			category */
		var calculateProgressBar = (category, id) => {
			var categoryCost;
			// If category has no costs, bar progress width to 0
			if (category.length === 0) {
				categoryCost = 0;
			}
			//  If category only has one cost, use it's amount
			else if (category.length === 1) {
				categoryCost = category[0].amount;
				// If category has more than one cost, add the costs together.
			} else {
				categoryCost = category.reduce((a, b) => {
					return a.amount + b.amount;
				});
			}
			// Find the percentage of the monthly income that the category uses,
			// and set the width of the progress bar to that percent.
			$(id).css('width', (categoryCost / response.monthlyIncome * 100).toFixed(1) + '%');
		};
		// Call our function to advance the progress bars
		calculateProgressBar(fixedCosts, '#fixed-costs-overview .bar-progress');
		calculateProgressBar(investments, '#investment-overview .bar-progress');
		calculateProgressBar(savings, '#savings-overview .bar-progress');
		calculateProgressBar(spendingMoney, '#spending-money-overview .bar-progress');
	});
});
