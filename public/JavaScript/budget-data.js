$(document).ready(function() {
	/* Retrieve user data
		Currently using a fake JSON file from the public folder
		Needs to be replaced with actual api route which will use
		the user_id to find the correct document
	*/

	// State of the budget
	var budgetData = {
		'fixedCosts': [],
		'investments': [],
		'savings': [],
		'spendingMoney': [],
		'monthlyIncome': 0
	};

	// TODO create function to update monthlyIncome
	var updateDomBudget = () => {
		// Clear the DOM of budget related data
		$('#monthlyIncome').empty();
		$('#fixed-cost-items').empty();
		$('#investment-items').empty();
		$('#savings-items').empty();
		$('#spending-money-items').empty();
		$('#monthlyIncome').empty();

		// Populate the monthly income
		$('#monthlyIncome').html('Monthly Income: $' + budgetData.monthlyIncome);

		/* CENTER PANE ========================================================= */
		/* assign object containing a category of cost to a state */
		/* take in the object containing our budget items and the id to assign
			rows to and populate the table with our users budget items */
		var appendBudgetRows = (category, id) => {
			// First create the table and it's headers
			$(id).append(
				'<thead>',
					'<tr>',
						'<th class="name-th">Name</th>',
						'<th class="cost-th">Cost</th>',
						'<th class="POB-th">Percent of Budget</th>',
					'</tr>',
				'</thead>',
				'<tbody>',
				'</tbody>'
			);
			// Then append each item to it's appropriate table (category)
			$.each(category, function(i, item) {
				$(id + '> tbody').append(
					'<tr>',
					$('<td>').text(item.name),
					$('<td>').text('$' + item.amount.toFixed(2)),
					$('<td>').text((item.amount / budgetData.monthlyIncome * 100).toFixed(1) + '%'),
					'</tr>'
				);
			});
		};

		/* call our function to populate all tables with the appropriate data */
		appendBudgetRows(budgetData.fixedCosts, '#fixed-cost-items');
		appendBudgetRows(budgetData.investments, '#investment-items');
		appendBudgetRows(budgetData.savings, '#savings-items');
		appendBudgetRows(budgetData.spendingMoney,'#spending-money-items');

		/* LEFT PANE =========================================================== */
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
			$(id).css('width', (categoryCost / budgetData.monthlyIncome * 100).toFixed(1) + '%');
		};
		// Call our function to advance the progress bars
		calculateProgressBar(budgetData.fixedCosts, '#fixed-costs-overview .bar-progress');
		calculateProgressBar(budgetData.investments, '#investment-overview .bar-progress');
		calculateProgressBar(budgetData.savings, '#savings-overview .bar-progress');
		calculateProgressBar(budgetData.spendingMoney, '#spending-money-overview .bar-progress');
	};

	// MonthlyIncome =========================================================
	$.ajax({
		dataType: 'json',
		url: '/monthlyIncome',
		type: 'GET'
	}).done(function(response) {
		budgetData.monthlyIncome = response.monthlyIncome;
	}).then(function() {
		updateDomBudget();
	}).catch(function(err) {
		console.log(err);
	});

	// COSTS =================================================================
	$.ajax({
		dataType: 'json',
		url: 'sample-budget.json',
	}).done(function(response) {
		budgetData.fixedCosts = response.fixedCosts;
		budgetData.investments = response.investments;
		budgetData.savings = response.savings;
		budgetData.spendingMoney = response.spendingMoney;
	}).then(function() {
		updateDomBudget();
	}).catch(function(err) {
		console.log(err);
	});


	// // Old budget ajax call
	// $.ajax({
	// 	dataType: 'json',
	// 	url: 'sample-budget.json',
	// }).done(function(response) {
	// 	/* CENTER PANE ========================================================= */
	// 	/* assign object containing a category of cost to a variable */
	// 	var fixedCosts = response.fixedCosts;
	// 	var investments = response.investments;
	// 	var savings = response.savings;
	// 	var spendingMoney = response.spendingMoney;
	//
	// 	/* assign a string containing the name of an id.This id is assigned to
	// 		the <tbody> element to which we will add rows */
	// 	var fixedItemsId = '#fixed-cost-items';
	// 	var investmentItemsId = '#investment-items';
	// 	var savingsItemsId = '#savings-items';
	// 	var spendingMoneyItemsId = '#spending-money-items';
	//
	// 	/* take in the object containing our budget items and the id to assign
	// 		rows to and populate the table with our users budget items */
	// 	var appendBudgetRows = (category, id) => {
	// 		$.each(category, function(i, item) {
	// 			$(id + '> tbody').append(
	// 				'<tr>',
	// 				$('<td>').text(item.name),
	// 				$('<td>').text('$' + item.amount.toFixed(2)),
	// 				$('<td>').text((item.amount / response.monthlyIncome * 100).toFixed(1) + '%'),
	// 				'</tr>'
	// 			);
	// 		});
	// 	};
	//
	// 	/* call our function to populate all tables with the appropriate data */
	// 	appendBudgetRows(fixedCosts, fixedItemsId);
	// 	appendBudgetRows(investments, investmentItemsId);
	// 	appendBudgetRows(savings, savingsItemsId);
	// 	appendBudgetRows(spendingMoney, spendingMoneyItemsId);
	//
	// 	/* LEFT PANE =========================================================== */
	// 	/* display total monthly income */
	// 	// $('#monthlyIncome').html('Monthly Income: $' + response.monthlyIncome);
	// 	/* calculate and display how much of the monthly income is used by each
	// 		category */
	// 	var calculateProgressBar = (category, id) => {
	// 		var categoryCost;
	// 		// If category has no costs, bar progress width to 0
	// 		if (category.length === 0) {
	// 			categoryCost = 0;
	// 		}
	// 		//  If category only has one cost, use it's amount
	// 		else if (category.length === 1) {
	// 			categoryCost = category[0].amount;
	// 			// If category has more than one cost, add the costs together.
	// 		} else {
	// 			categoryCost = category.reduce((a, b) => {
	// 				return a.amount + b.amount;
	// 			});
	// 		}
	// 		// Find the percentage of the monthly income that the category uses,
	// 		// and set the width of the progress bar to that percent.
	// 		$(id).css('width', (categoryCost / response.monthlyIncome * 100).toFixed(1) + '%');
	// 	};
	// 	// Call our function to advance the progress bars
	// 	calculateProgressBar(fixedCosts, '#fixed-costs-overview .bar-progress');
	// 	calculateProgressBar(investments, '#investment-overview .bar-progress');
	// 	calculateProgressBar(savings, '#savings-overview .bar-progress');
	// 	calculateProgressBar(spendingMoney, '#spending-money-overview .bar-progress');
	// });
});
