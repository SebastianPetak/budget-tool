$(document).ready(function() {
	/* Retrieve user data
		Currently using a fake JSON file from the public folder
		Needs to be replaced with actual api route which will use
		the user_id to find the correct document
	*/
	$.ajax({
		dataType: 'json',
		url: 'sample-budget.json',
	}).done(function(response) {
		/* assign object containing a type of cost to a variable */
		var fixedCosts = response.fixedCosts;
		var investments = response.investments;
		var savings = response.savings;
		var spendingMoney = response.spendingMoney;

		/* assign a string containing the name of an id.This id is assigned to
			the <tbody> element to which we will add rows */
		var fixedItemsId = '#fixed-cost-items';
		var investmentItemsId = '#investment-items';
		var savingsItemsId = '#savings-items';
		var spendingMoneyItemsId = '#spending-money-items'

		/* take in the object containing our budget items and the id to assign
			rows to and populate the table with our users budget items */
		var appendBudgetRows = (type, id) => {
			$.each(type, function(i, item) {
				$(id + '> tbody').append(
					'<tr>',
					$('<td>').text(item.name),
					$('<td>').text('$' + item.amount.toFixed(2)),
					$('<td>').text((item.amount / response.monthlyIncome * 100).toFixed(1) + '%'),
					'</tr>'
				);
			});
		};

		/* call our method to populate all tables with the appropriate data */
		appendBudgetRows(fixedCosts, fixedItemsId);
		appendBudgetRows(investments, investmentItemsId);
		appendBudgetRows(savings, savingsItemsId);
		appendBudgetRows(spendingMoney, spendingMoneyItemsId);
	});
});
