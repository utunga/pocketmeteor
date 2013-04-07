Meteor.methods( {

	getBalances: function() {
		Accounts.aggregate(
			 [ { $group: {_id:"$account_id", balance: { $sum: "$amt"}}}]);
	},

});

